const hx = require("hbuilderx")
// 一键格式化和保存
let formatAndSave = hx.commands.registerCommand("extension.formatAndSave", async () => {
  hx.window.showInformationMessage('HELL')
  await hx.commands.executeCommand("editor.action.format")
  hx.commands.executeCommand("workbench.action.files.save")
})
module.exports = formatAndSave