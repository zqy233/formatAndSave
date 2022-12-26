# 使用 vscode 打开所在目录(待完善)

::: tip

HBuilderX 左侧目录，右击文件夹后菜单会多出一项使用 vscode 打开所在目录

需要安装 vscode，vscode 会全局安装一个 code 命令，基于这个 code 命令打开文件夹

:::

基于以下代码实现，个人电脑为 windows10，测试没有问题，如存在兼容性问题，欢迎反馈或完善该代码

```js
const process = require("child_process")
// code+文件路径 如C:\\Users
const path = "C:\\Users"
process.exec("code " + path, error => {
  // 失败
  if (error) {
    console.log(error)
  }
})
```
