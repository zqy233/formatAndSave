const hx = require("hbuilderx")
// 双分栏且自动折叠
const copyEditorAutoFold = hx.commands.registerCommand("extension.copyEditorAutoFold", async () => {
  // 获取分栏模式的配置
  let config = hx.workspace.getConfiguration("formatAndSave")
  const mode = config.get("mode")
  // 获取当前编辑器
  let activeEditor = await hx.window.getActiveTextEditor()
  // 当前编辑器的所有文本
  const word = activeEditor.document.getText()
  const scriptIndex = word.indexOf("<script")
  const templateIndex = word.indexOf("<template")
  const styleIndex = word.indexOf("<style")
  if (mode) {
    // 左侧折叠script，折叠script所在行
    activeEditor.setSelection(scriptIndex, scriptIndex)
    await hx.commands.executeCommand("workbench.action.foldLineContract")
    //  复制分栏，会复制左侧光标位置
    await hx.commands.executeCommand("workbench.action.copyEditor")
    if (scriptIndex == -1) return
    // 右侧折叠非script,即展开script所在行
    await hx.commands.executeCommand("workbench.action.foldAllContract")
    await hx.commands.executeCommand("workbench.action.foldLineExpand")
  } else {
    // 左侧折叠非script
    activeEditor.setSelection(templateIndex, templateIndex)
    await hx.commands.executeCommand("workbench.action.foldLineContract")
    activeEditor.setSelection(styleIndex, styleIndex)
    await hx.commands.executeCommand("workbench.action.foldLineContract")
    activeEditor.setSelection(scriptIndex, scriptIndex)
    // 复制分栏，会复制左侧光标位置
    await hx.commands.executeCommand("workbench.action.copyEditor")
    if (scriptIndex == -1) return
    // 右侧折叠script
    await hx.commands.executeCommand("workbench.action.foldLineContract")
  }
})
module.exports = copyEditorAutoFold
