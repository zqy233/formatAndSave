const hx = require("hbuilderx")
const process = require("child_process");
// 使用vscode打开当前目录
const openWithVscode = hx.commands.registerCommand("extension.openWithVscode", async (path) => {
  process.exec('code ' + path.fsPath, (error) => {
    // 失败
    if (error) {
      hx.window.setStatusBarMessage(`失败` + error, 10000)
    }
  })
})
module.exports = openWithVscode
