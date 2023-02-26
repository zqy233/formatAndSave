const hx = require('hbuilderx')
const prettier = require('prettier')
const diff = require("fast-diff");
const fs = require("fs/promises")
const path = require("path")

const prettier = hx.commands.registerCommand('extension.prettier', async () => {
  let activeEditor = await hx.window.getActiveTextEditor()
  if (!activeEditor) return
  const {
    document,
  } = activeEditor
  // 当前编辑器打开的文件的路径
  const {
    fileName
  } = document
  // 根据当前文件路径获取所在项目目录信息
  const workspaceFolder = await hx.workspace.getWorkspaceFolder(fileName)
  // prettier查询当前项目根目录是否存在配置文件
  let configFilePath = await prettier.resolveConfigFile(workspaceFolder.uri.fsPath)
  // 未找到返回null，则创建配置文件
  if (!configFilePath) {
    const defaultConfig = await fs.readFile(path.resolve(hx.env.appRoot, 'plugins', 'zqy-',
      '.prettierrc.js'), {
      encoding: 'utf-8'
    })
    hx.window.showInformationMessage(path.resolve(hx.env.appRoot, 'plugins', 'zqy-formatAndSave',
      '.prettierrc.js'))
    await fs.writeFile(path.resolve(workspaceFolder.uri.fsPath, '.prettierrc.js'), defaultConfig)
    configFilePath = path.resolve(__dirname, '.prettierrc.js')
  }
  // 解析配置文件信息为js对象
  const options = await prettier.resolveConfig(configFilePath)
  const text = document.getText()
  const
    formatted =
    await prettier.format(text, {
      filepath: fileName,
      ...options
    })
  const diffText = [];
  let index = 0;
  const diffs = diff(text, formatted);
  // console.log(diffs);
  for (let i = 0; i < diffs.length; i++) {
    // -1 0 1
    // 最后一行是1，上一行时-1。处理了
    // 最后一行是1，上一行不是-1，说明是新增，处理了
    // 最后一行是-1，还没处理
    // 最后一行是0，不做处理

    if (i + 1 < diffs.length) {
      // 规律：如果-1的下一个不是1，说明是删除
      if (diffs[i][0] === -1 && diffs[i + 1][0] !== 1) {
        diffText.push({
          start: index,
          end: index + diffs[i][1].length,
          value: "",
        });
      }
      // 规律：如果-1的下一个是1，说明是下一个替换了上一个
      if (diffs[i][0] === -1 && diffs[i + 1][0] === 1) {
        diffText.push({
          start: index,
          end: index + diffs[i][1].length,
          value: diffs[i + 1][1],
        });
      }
    }
    // 第一行不会是1
    if (i > 0) {
      // 规律：如果1的上一个不是-1，说明是新增
      if (diffs[i][0] === 1 && diffs[i - 1][0] !== -1) {
        diffText.push({
          start: index,
          end: index,
          value: diffs[i][1],
        });
      }
    }
    if (diffs[i][0] === -1 || diffs[i][0] === 0) {
      index += diffs[i][1].length;
    }
  }
  activeEditor.edit(editBuilder => {
    diffText.forEach((item) => {
      editBuilder.replace({
        start: item.start,
        end: item.end,
      }, item.value)
    })
  })
  // 插入队列，确保所有格式化操作执行完成
  setTimeout(async () => {
    await hx.commands.executeCommand('workbench.action.files.save')
  }, 0)
})
module.exports = prettier
