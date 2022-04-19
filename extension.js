const hx = require("hbuilderx")

//该方法将在插件激活的时候调用
function activate(context) {
  let formatAndSave = hx.commands.registerCommand("extension.formatAndSave", async () => {
    await hx.commands.executeCommand("editor.action.format")
    hx.commands.executeCommand("workbench.action.files.save")
  })
  let num = 0
  let copyEditorAutoFold = hx.commands.registerCommand("extension.copyEditorAutoFold", async () => {
    num++
    // 偶数次数表示已打开分栏，进行关闭
    if (num % 2 == 0) {
      await hx.commands.executeCommand("workbench.action.closeActiveEditor")
      return hx.commands.executeCommand("workbench.action.foldAllExpand")
    }
    // 奇数次数表示打开分栏
    let config = hx.workspace.getConfiguration("formatAndSave")
    const mode = config.get("mode")
    let activeEditor = await hx.window.getActiveTextEditor()
    const word = activeEditor.document.getText()
    const scriptIndex = word.indexOf("<script")
    const templateIndex = word.indexOf("<template")
    const styleIndex = word.indexOf("<style")
    if (mode) {
      // 折叠script
      activeEditor.setSelection(scriptIndex, scriptIndex)
      await hx.commands.executeCommand("workbench.action.foldChildrenContract")
      //  复制分栏，会复制左侧光标位置
      await hx.commands.executeCommand("workbench.action.copyEditor")
      if (scriptIndex == -1) return
      await hx.commands.executeCommand("workbench.action.foldAllContract")
      await hx.commands.executeCommand("workbench.action.foldChildrenExpand")
    } else {
      activeEditor.setSelection(templateIndex, templateIndex)
      await hx.commands.executeCommand("workbench.action.foldChildrenContract")
      activeEditor.setSelection(styleIndex, styleIndex)
      await hx.commands.executeCommand("workbench.action.foldChildrenContract")
      activeEditor.setSelection(scriptIndex, scriptIndex)
      // 复制分栏，会复制左侧光标位置
      await hx.commands.executeCommand("workbench.action.copyEditor")
      if (scriptIndex == -1) return
      await hx.commands.executeCommand("workbench.action.foldChildrenContract")
    }
  })
  //订阅销毁钩子，插件禁用的时候，自动注销该command
  context.subscriptions.push(formatAndSave)
  context.subscriptions.push(copyEditorAutoFold)
}
//该方法将在插件禁用的时候调用（目前是在插件卸载的时候触发）
function deactivate() {}
module.exports = {
  activate,
  deactivate
}
