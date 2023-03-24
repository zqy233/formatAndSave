const hx = require('hbuilderx');

/**
 * 块注释
 */
const blockComment = hx.commands.registerCommand(
  'extension.blockComment',
  async () => {
    let activeEditor = await hx.window.getActiveTextEditor();
    let active = activeEditor.selection.active;
    activeEditor.edit(async (editBuilder) => {
      editBuilder.replace(active, '/**  */');
      // 插入队列，确保操作执行完成
      setTimeout(async () => {
        activeEditor = await hx.window.getActiveTextEditor();
        activeEditor.setSelection(
          activeEditor.selection.active + 4,
          activeEditor.selection.active + 4
        );
      }, 0);
    });
  }
);
module.exports = blockComment;
