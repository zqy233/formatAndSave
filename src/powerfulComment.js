const hx = require("hbuilderx")
const powerfulComment = hx.commands.registerCommand("extension.powerfulComment", async () => {
  const activeEditor = await hx.window.getActiveTextEditor() // 获取当前编辑器
  const {
    selections,
    document
  } = activeEditor

  selections.forEach(async selection => {
    await comment(selection, document, activeEditor)
  })
  console.log("selections", selections);
})

module.exports = powerfulComment

function comment(selection, document, activeEditor) {
  return new Promise(async resolve => {
    let {
      start,
      end
    } = selection
    // 获取开始行结束行的信息，计算上\t\n符号的位置，获取正确的注释位置
    const startAndEndLine = await Promise.all([document.lineFromPosition(start), document.lineFromPosition(end)])
    const matchReg1 = startAndEndLine[0].text.match(/^\s*/g)
    const matchReg2 = startAndEndLine[1].text.match(/\s*$/g)
    // 开始位置=加上行开始位置+\t\n
    start = startAndEndLine[0].start + matchReg1[0].length
    // 结束位置=行结束位置-\t\n
    end = startAndEndLine[1].end - matchReg2[0].length

    // 获取选中文本内容
    let word = document.getText({
      start,
      end,
    })

    // 获取选择文本中所有`<!--`和`-->`的位置
    const commentPositions = getCommentPositions(word, start, "<!--", "-->")

    // 获取选择文本中所有`/*`和`*/`的位置
    const styleCommentPositions = getCommentPositions(word, start, "/*", "*/")
    console.log("sssss", commentPositions, styleCommentPositions);

    // 没有<!--和-->注释的情况
    if (!commentPositions.length && !styleCommentPositions.length) {
      return noCommentPositionsDeal(activeEditor, start, end)
    }

    // 注释是`<!--`和`-->`
    if (commentPositions.length) {
      // 有<!--和-->注释的情况，获取非注释区域的位置
      const betweenCommentPositions = getBetweenCommentPositions(commentPositions, start, end, word)

      // 如果存在非注释区域，就注释这些区域，如果不存在，那就取消所有注释
      commentPositionsDeal(betweenCommentPositions, commentPositions, activeEditor, start, end)
    }

    // 注释是`/*`和`*/`
    if (styleCommentPositions.length) {
      // 有/*和*/注释的情况，获取非注释区域的位置
      const betweenCommentPositions = getBetweenCommentPositions(styleCommentPositions, start, end, word)
      // 如果存在非注释区域，就注释这些区域，如果不存在，那就取消所有注释
      commentPositionsDeal(betweenCommentPositions, styleCommentPositions, activeEditor, start, end)
    }
    resolve()
  })
}

/** 获取选择文本中所有`<!--`和`-->`的位置 */
function getCommentPositions(word, start, startComment, endComment) {
  const commentPositions = []
  let startPosition = word.indexOf(startComment)
  let endPosition = word.indexOf(endComment)
  while (startPosition > -1 || endPosition > -1) {
    commentPositions.push({
      start: startPosition !== -1 ? start + startPosition : null,
      end: endPosition !== -1 ? start + endPosition + endComment.length : null,
    })
    startPosition = word.indexOf(startComment, startPosition + startComment.length)
    endPosition = word.indexOf(endComment, endPosition + endComment.length)
  }
  return commentPositions
}

/** 没有<!--和-->注释的情况 */
async function noCommentPositionsDeal(activeEditor, start, end) {
  activeEditor.setSelection(start, end)
  hx.commands.executeCommand("editor.action.commentLine")
}

/** 有<!--和-->注释的情况，获取非注释区域的位置 */
function getBetweenCommentPositions(commentPositions, start, end, word) {
  const betweenCommentPositions = []
  for (let i = 0; i < commentPositions.length; i++) {
    const vaild = commentPositions[i].start && commentPositions[i].end
    // 选中起始位置到第一个<!--的位置
    if (i === 0 && vaild && commentPositions[i].start > start) {
      const matchReg = word.slice(0, commentPositions[i].start - start).match(/^\s*|\s*$/g)
      if (matchReg.length === 1) continue
      const newStart = start + matchReg[0].length // 选中文本起始位置+算上\t\n后的位置
      const newEnd = commentPositions[i].start - matchReg[1].length // 首个<!--+去掉\t\n后的位置
      if (newStart !== newEnd) {
        betweenCommentPositions.push({
          start: newStart,
          end: newEnd,
        })
      }
    }
    // 中间非注释区域
    if (i + 1 < commentPositions.length && vaild) {
      const matchReg = word.slice(commentPositions[i].end - start, commentPositions[i + 1].start - start).match(
        /^\s*|\s*$/g)
      if (matchReg.length === 1) continue
      console.log(matchReg)
      const newStart = commentPositions[i].end + matchReg[0].length
      const newEnd = commentPositions[i + 1].start - matchReg[1].length
      if (newStart !== newEnd) {
        betweenCommentPositions.push({
          start: newStart,
          end: newEnd,
        })
      }
    }
    //  选中结束位置到最后一个-->的位置
    if (i === commentPositions.length - 1 && vaild && commentPositions[i].end !== end) {
      const matchReg = word.slice(commentPositions[i].end - start, end - start).match(/^\s*|\s*$/g)
      if (matchReg.length === 1) continue
      const newStart = commentPositions[i].end + matchReg[0].length
      const newEnd = end - matchReg[1].length
      if (newStart !== newEnd) {
        betweenCommentPositions.push({
          start: newStart,
          end: newEnd,
        })
      }
    }
  }
  return betweenCommentPositions
}

/** 如果存在非注释区域，就注释这些区域，如果不存在，那就取消所有注释 */
async function commentPositionsDeal(betweenCommentPositions, commentPositions, activeEditor, start, end) {
  // 存在非注释区域，选中所有非注释区域
  if (betweenCommentPositions.length) {
    activeEditor.setSelection(betweenCommentPositions[0].start, betweenCommentPositions[0].end) // 设置初始光标位置
    for (let i = 1; i < betweenCommentPositions.length; i++) {
      activeEditor.addSelection(betweenCommentPositions[i].start, betweenCommentPositions[i].end) // 设置其余光标位置
    }
  }
  // 不存在非注释区域，选中所有注释区域
  else {
    activeEditor.setSelection(commentPositions[0].start, commentPositions[0].end) // 设置初始光标位置
    for (let i = 1; i < commentPositions.length; i++) {
      activeEditor.addSelection(commentPositions[i].start, commentPositions[i].end) // 设置其余光标位置
    }
  }
  await hx.commands.executeCommand("editor.action.commentLine") // 调用注释命令
  activeEditor.setSelection(start, end) // 恢复光标位置
}
