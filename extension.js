const copyEditorAutoFold = require("./copyEditorAutoFold.js")
const jumpQuote = require("./jumpQuote.js")
const formatAndSave = require("./formatAndSave.js")
//该方法将在插件激活的时候调用
function activate(context) {
  //订阅销毁钩子，插件禁用的时候，自动注销该command
  context.subscriptions.push(formatAndSave)
  context.subscriptions.push(copyEditorAutoFold)
  context.subscriptions.push(jumpQuote.jumpLastQuote)
  context.subscriptions.push(jumpQuote.jumpNextQuote)
}
//该方法将在插件禁用的时候调用（目前是在插件卸载的时候触发）
function deactivate() {}
module.exports = {
  activate,
  deactivate
}
