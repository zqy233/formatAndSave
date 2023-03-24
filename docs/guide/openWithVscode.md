# 使用 vscode 打开所在目录

::: tip

HBuilderX 左侧目录，右击文件夹后菜单会多出一项使用 vscode 打开所在目录

:::

需要安装 vscode，vscode 会全局安装一个 code 命令，基于这个 code 命令打开文件夹

如存在运行上的问题，欢迎 pr 完善该代码

可以使用 nodejs 运行下方代码，进行调试与完善

```js
const process = require('child_process')
// code+文件路径 如C:\\Users
const path = 'C:\\Users'
process.exec('code ' + path, error => {
  // 失败
  if (error) {
    console.log(error)
  }
})
```

 <git-talk/>
