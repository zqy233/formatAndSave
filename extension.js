const formatAndSave = require("./formatAndSave.js")
const copyEditorAutoFold = require("./copyEditorAutoFold.js")
const jumpQuote = require("./jumpQuote.js")
//该方法将在插件激活的时候调用
function activate(context) {
  context.subscriptions.push(formatAndSave)
  context.subscriptions.push(copyEditorAutoFold.foldAllExpandAndCopyEditor)
  context.subscriptions.push(copyEditorAutoFold.copyEditorAll)
  context.subscriptions.push(copyEditorAutoFold.contractScriptTag)
  context.subscriptions.push(copyEditorAutoFold.contractNoScriptTag)
  context.subscriptions.push(copyEditorAutoFold.contractStyleTag)
  context.subscriptions.push(jumpQuote.jumpLastQuote)
  context.subscriptions.push(jumpQuote.jumpNextQuote)
}
//该方法将在插件禁用的时候调用（目前是在插件卸载的时候触发）
function deactivate() {}
module.exports = {
  activate,
  deactivate
}
