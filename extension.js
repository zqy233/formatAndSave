// const formatAndSave = require('./src/formatAndSave.js');
const copyEditorAutoFold = require("./src/copyEditorAutoFold.js");
const jumpQuote = require("./src/jumpQuote.js");
const openWithVscode = require("./src/openWithVscode.js");
const blockComment = require("./src/blockComment.js");
const powerfulComment = require("./src/powerfulComment.js");
const extensionPrettier = require("./src/prettier.js");
//该方法将在插件激活的时候调用
function activate(context) {
  // context.subscriptions.push(formatAndSave);
  context.subscriptions.push(copyEditorAutoFold.foldAllExpandAndCopyEditor);
  context.subscriptions.push(copyEditorAutoFold.copyEditorAll);
  context.subscriptions.push(copyEditorAutoFold.contractScriptTag);
  context.subscriptions.push(copyEditorAutoFold.contractNoScriptTag);
  context.subscriptions.push(copyEditorAutoFold.contractStyleTag);
  context.subscriptions.push(jumpQuote.jumpLastQuote);
  context.subscriptions.push(jumpQuote.jumpNextQuote);
  context.subscriptions.push(openWithVscode);
  context.subscriptions.push(blockComment);
  context.subscriptions.push(powerfulComment);
  context.subscriptions.push(extensionPrettier);
}
//该方法将在插件禁用的时候调用（目前是在插件卸载的时候触发）
function deactivate() {}
module.exports = {
  activate,
  deactivate,
};
