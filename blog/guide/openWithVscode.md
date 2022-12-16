#  使用vscode打开所在目录(待完善)

::: tip

HBuilderX左侧目录，右击文件夹后菜单会多出一项使用vscode打开所在目录

需要安装vscode，vscode会全局安装一个code命令，基于这个code命令打开文件夹

:::

基于以下代码实现，个人电脑为windows10，测试没有问题，如存在兼容性问题，欢迎反馈或完善该代码

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

