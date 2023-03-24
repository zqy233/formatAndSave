const hx = require('hbuilderx');

// 获取所有"符号的位置
const getAllIndex = (str, char) => {
  const positions = [];
  let index = str.indexOf(char);
  while (index > -1) {
    positions.push(index);
    index = str.indexOf(char, index + 1);
  }
  return positions;
};

let index = 0;

/**
 *  跳转至上一个""处
 */
const jumpLastQuote = hx.commands.registerCommand(
  'extension.jumpLastQuote',
  async () => {
    let activeEditor = await hx.window.getActiveTextEditor(); 
    const word = activeEditor.document.getText(); 
    const positions = getAllIndex(word, '"');
    const cursorPosition = activeEditor.selection.active; 
    for (let i = 0; i < positions.length; i++) {
      if (positions[i] < cursorPosition && positions[i + 1] > cursorPosition) {
        // 偶数说明在内侧，奇数说明在外侧
        if (i % 2 == 0) {
          index = i;
        } else {
          index = i + 1;
        }
        break;
      }
    }
    if (index == 0) return;
    index = index - 2;
    activeEditor.setSelection(positions[index] + 1, positions[index + 1]);
    // 用于触发滚动效果
    await hx.commands.executeCommand('cursorRight');
    activeEditor.setSelection(positions[index] + 1, positions[index + 1]);
  }
);

/**
 *  跳转至下一个""处
 */
const jumpNextQuote = hx.commands.registerCommand(
  'extension.jumpNextQuote',
  async () => {
    let activeEditor = await hx.window.getActiveTextEditor(); 
    const word = activeEditor.document.getText(); 
    const positions = getAllIndex(word, '"');
    const cursorPosition = activeEditor.selection.active;
    for (let i = 0; i < positions.length; i++) {
      if (positions[i] < cursorPosition && positions[i + 1] > cursorPosition) {
        // 偶数说明在内侧，奇数说明在外侧
        if (i % 2 == 0) {
          index = i;
        } else {
          index = i - 1;
        }
        break;
      }
    }
    if (index == positions.length - 2) return;
    index = index + 2;
    activeEditor.setSelection(positions[index] + 1, positions[index + 1]);
    // 用于触发滚动效果
    await hx.commands.executeCommand('cursorRight');
    activeEditor.setSelection(positions[index] + 1, positions[index + 1]);
  }
);
module.exports = {
  jumpLastQuote,
  jumpNextQuote,
};
