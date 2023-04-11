const hx = require("hbuilderx");
const powerfulComment = hx.commands.registerCommand(
  "extension.powerfulComment",
  async () => {
    const activeEditor = await hx.window.getActiveTextEditor();
    const { selections, document } = activeEditor;
    // 支持多光标选中情况，依次处理
    for (let i = 0; i < selections.length; i++) {
      activeEditor.setSelection(selections[i].start, selections[i].end);
      await comment(selections[i], document, activeEditor);
    }
  }
);

module.exports = powerfulComment;

/** 二次封装注释函数 */
function comment(selection, document, activeEditor) {
  return new Promise(async (resolve) => {
    let { start: originStart, end: originEnd } = selection;

    // 单击，则直接调用注释命令
    if (originStart === originEnd) {
      await hx.commands.executeCommand("editor.action.commentLine");
      return resolve();
    }
    // 获取开始行结束行的信息，计算上\t\n符号的位置，获取正确的注释位置
    const startAndEndLine = await Promise.all([
      document.lineFromPosition(originStart),
      document.lineFromPosition(originEnd),
    ]);
    const matchReg1 = startAndEndLine[0].text.match(/^\s*/g);
    const matchReg2 = startAndEndLine[1].text.match(/\s*$/g);
    // 开始位置=行开始位置+\t\n
    const start = startAndEndLine[0].start + matchReg1[0].length;
    // 结束位置=行结束位置-\t\n
    const end = startAndEndLine[1].end - matchReg2[0].length;

    // 获取选中文本内容
    let word = document.getText({
      start,
      end,
    });

    // 获取选择文本中所有`<!--`和`-->`的位置
    const commentPositions = getCommentPositions(
      word,
      start,
      end,
      "<!--",
      "-->"
    );

    // 获取选择文本中所有`/*`和`*/`的位置
    const styleCommentPositions = getCommentPositions(
      word,
      start,
      end,
      "/*",
      "*/"
    );

    // 选中内容没有注释，直接调用注释命令
    if (!commentPositions.length && !styleCommentPositions.length) {
      noCommentPositionsDeal(activeEditor, start, end, originStart, originEnd);
      return resolve();
    }

    // 注释是`<!--`和`-->`
    if (commentPositions.length) {
      // 有<!--和-->注释的情况，获取非注释区域的位置
      const betweenCommentPositions = getBetweenCommentPositions(
        commentPositions,
        start,
        end,
        word
      );
      // 如果存在非注释区域，就注释这些区域，如果不存在，那就取消所有注释
      commentPositionsDeal(
        betweenCommentPositions,
        commentPositions,
        activeEditor,
        originStart,
        originEnd
      );
      return resolve();
    }

    // 注释是`/*`和`*/`
    if (styleCommentPositions.length) {
      // 有/*和*/注释的情况，获取非注释区域的位置
      const betweenCommentPositions = getBetweenCommentPositions(
        styleCommentPositions,
        start,
        end,
        word
      );
      // 如果存在非注释区域，就注释这些区域，如果不存在，那就取消所有注释
      commentPositionsDeal(
        betweenCommentPositions,
        styleCommentPositions,
        activeEditor,
        originStart,
        originEnd
      );
      return resolve();
    }
  });
}

/** 获取选择文本中所有指定注释的位置 */
function getCommentPositions(word, start, end, startComment, endComment) {
  const commentPositions = [];
  let startPosition = word.indexOf(startComment);
  let endPosition = word.indexOf(endComment);

  // 情景: 选择文本中起始部分注释不完整，只有-->部分，没有<!--部分，例如：
  // ></image> -->
  //     <image src="../../static/img/recommend1.jpeg" mode="heightFix" />
  if (startPosition === -1 && endPosition > -1) {
    commentPositions.push({
      start: start,
      end: start + endPosition + endComment.length,
    });
  }
  while (startPosition > -1 && endPosition > -1) {
    // 情景: 选择文本中注释有完整有残缺，例如：
    // ></image> -->
    // <!-- <image src="../../static/img/recommend1.jpeg" mode="heightFix" /> -->
    // <!-- <image src="../../static/img/recommend2.jpg" mode="heightFix" />
    // 残缺部分不用考虑，只需要完整的正确位置，如果startPosition大于endPosition，说明不是同一对，调整startPosition的位置
    if (startPosition > endPosition) {
      startPosition = endPosition + endComment.length;
      commentPositions.push({
        start: start,
        end: start + endPosition + endComment.length,
      });
    }
    // 情景:注释完整
    if (startPosition < endPosition) {
      commentPositions.push({
        start: start + startPosition,
        end: start + endPosition + endComment.length,
      });
    }
    startPosition = word.indexOf(
      startComment,
      startPosition + startComment.length
    );
    endPosition = word.indexOf(endComment, endPosition + endComment.length);
  }

  // 情景:  选择文本中末尾注释不完整，只有<!--部分，没有-->部分，例如：
  // <view class="scroll-inner">
  // <!-- <image
  if (startPosition > -1 && endPosition === -1) {
    commentPositions.push({
      start: start + startPosition,
      end: end,
    });
  }
  return commentPositions;
}

/** 选中内容没有注释，直接调用注释命令 */
async function noCommentPositionsDeal(
  activeEditor,
  start,
  end,
  originStart,
  originEnd
) {
  activeEditor.setSelection(start, end);
  await hx.commands.executeCommand("editor.action.commentLine");
  activeEditor.setSelection(originStart, originEnd);
}

/** 有注释的情况，获取非注释区域的位置 */
function getBetweenCommentPositions(commentPositions, start, end, word) {
  const betweenCommentPositions = [];
  for (let i = 0; i < commentPositions.length; i++) {
    // 选中起始位置到第一个<!--的位置
    if (i === 0 && commentPositions[i].start > start) {
      const matchReg = word
        .slice(0, commentPositions[i].start - start)
        .match(/^\s*|\s*$/g);
      const newStart = start + matchReg[0].length; // 选中文本起始位置+算上\t\n后的位置
      const newEnd = commentPositions[i].start - matchReg[1].length; // 首个<!--+去掉\t\n后的位置
      if (newStart !== newEnd) {
        betweenCommentPositions.push({
          start: newStart,
          end: newEnd,
        });
      }
    }
    // 中间非注释区域
    if (i + 1 < commentPositions.length) {
      const matchReg = word
        .slice(
          commentPositions[i].end - start,
          commentPositions[i + 1].start - start
        )
        .match(/^\s*|\s*$/g);
      if (matchReg.length === 1) continue;
      const newStart = commentPositions[i].end + matchReg[0].length;
      const newEnd = commentPositions[i + 1].start - matchReg[1].length;
      if (newStart !== newEnd) {
        betweenCommentPositions.push({
          start: newStart,
          end: newEnd,
        });
      }
    }
    //  选中结束位置到最后一个-->的位置
    if (i === commentPositions.length - 1 && commentPositions[i].end !== end) {
      const matchReg = word
        .slice(commentPositions[i].end - start, end - start)
        .match(/^\s*|\s*$/g);
      if (matchReg.length === 1) continue;
      const newStart = commentPositions[i].end + matchReg[0].length;
      const newEnd = end - matchReg[1].length;
      if (newStart !== newEnd) {
        betweenCommentPositions.push({
          start: newStart,
          end: newEnd,
        });
      }
    }
  }
  return betweenCommentPositions;
}

/** 如果存在非注释区域，就注释这些区域，如果不存在，那就取消所有注释 */
async function commentPositionsDeal(
  betweenCommentPositions,
  commentPositions,
  activeEditor,
  start,
  end
) {
  // 存在非注释区域，选中所有非注释区域
  if (betweenCommentPositions.length) {
    activeEditor.setSelection(
      betweenCommentPositions[0].start,
      betweenCommentPositions[0].end
    );
    for (let i = 1; i < betweenCommentPositions.length; i++) {
      activeEditor.addSelection(
        betweenCommentPositions[i].start,
        betweenCommentPositions[i].end
      );
    }
  }
  // 不存在非注释区域，选中所有注释区域
  else {
    activeEditor.setSelection(
      commentPositions[0].start,
      commentPositions[0].end
    );
    for (let i = 1; i < commentPositions.length; i++) {
      activeEditor.addSelection(
        commentPositions[i].start,
        commentPositions[i].end
      );
    }
  }
  await hx.commands.executeCommand("editor.action.commentLine");
  activeEditor.setSelection(start, end); // 恢复光标位置
}
