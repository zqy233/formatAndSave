const hx = require("hbuilderx")

// 无折叠模式
const foldAllExpandAndCopyEditor = hx.commands.registerCommand("extension.foldAllExpandAndCopyEditor", async () => {
  let activeEditor = await hx.window.getActiveTextEditor() // 获取当前编辑器
  activeEditor.setSelection(0, 0) // 光标选中顶部
  await hx.commands.executeCommand("workbench.action.foldAllExpand") // 展开所有行，会复制左侧光标位置
  await hx.commands.executeCommand("workbench.action.copyEditor") //  复制分栏
  await hx.commands.executeCommand("cursorRight") // 用于触发滚动效果
})

// 复制分栏并折叠
async function copyEditorAndContract(activeEditor, index, tag) {
  if (index !== -1) {
    activeEditor.setSelection(index, index) // 选中标签所在行
    await hx.commands.executeCommand("workbench.action.copyEditor") //  复制分栏，会复制左侧光标位置
    await hx.commands.executeCommand("workbench.action.foldAllContract") // 折叠所有行
    await hx.commands.executeCommand("workbench.action.foldLineExpand") // 展开单行
    await hx.commands.executeCommand("cursorRight") // 用于触发滚动效果
    if (tag !== "style") {
      await hx.commands.executeCommand("workbench.action.prevpane") // 置焦到上一个分栏
    }
  } else {
    hx.window.setStatusBarMessage(`未找到${tag}标签`, 10000)
    return new Promise(resolve => {
      resolve()
    })
  }
}

// 左分栏不折叠，右分栏则创建三次，分别显示template、script、style标签
const copyEditorAll = hx.commands.registerCommand("extension.copyEditorAll", async () => {
  let activeEditor = await hx.window.getActiveTextEditor() // 获取当前编辑器
  const word = activeEditor.document.getText() // 当前编辑器的所有文本
  const templateIndex = word.indexOf("<template")
  const scriptIndex = word.indexOf("<script")
  const styleIndex = word.indexOf("<style")
  await hx.commands.executeCommand("workbench.action.foldAllExpand") // 展开所有行
  await copyEditorAndContract(activeEditor, templateIndex, "template")
  await copyEditorAndContract(activeEditor, scriptIndex, "script")
  copyEditorAndContract(activeEditor, styleIndex, "style")
})

// 左侧显示两个标签，右侧显示单个标签
async function leftTwoTagsAndRightOneTag(tagName) {
  let activeEditor = await hx.window.getActiveTextEditor() // 获取当前编辑器
  const word = activeEditor.document.getText() // 当前编辑器的所有文本
  const index = word.indexOf("<" + tagName)
  await hx.commands.executeCommand("workbench.action.foldAllExpand") // 展开所有行
  if (index === -1) return hx.window.setStatusBarMessage(`未找到${tagName}标签`, 10000)
  activeEditor.setSelection(index, index)
  await hx.commands.executeCommand("workbench.action.foldLineContract") // 折叠单行
  await hx.commands.executeCommand("workbench.action.copyEditor") // 复制分栏，会复制左侧光标位置
  await hx.commands.executeCommand("workbench.action.foldAllContract") // 折叠所有行
  await hx.commands.executeCommand("workbench.action.foldLineExpand") // 展开单行
  await hx.commands.executeCommand("cursorRight") // 用于触发滚动效果
}

// 左侧分栏显示template、style标签，右侧分栏显示script标签
const contractScriptTag = hx.commands.registerCommand("extension.contractScriptTag", () => {
  leftTwoTagsAndRightOneTag("script")
})

// 左侧分栏显示template、script标签，右测分栏显示style标签
const contractStyleTag = hx.commands.registerCommand("extension.contractStyleTag", () => {
  leftTwoTagsAndRightOneTag("style")
})

// 左侧分栏显示script,右侧分栏显示template、style标签
const contractNoScriptTag = hx.commands.registerCommand("extension.contractNoScriptTag", async () => {
  let activeEditor = await hx.window.getActiveTextEditor() // 获取当前编辑器
  const word = activeEditor.document.getText() // 当前编辑器的所有文本
  const scriptIndex = word.indexOf("<script")
  const templateIndex = word.indexOf("<template")
  const styleIndex = word.indexOf("<style")
  await hx.commands.executeCommand("workbench.action.foldAllExpand") // 展开所有行
  if (templateIndex !== -1) {
    activeEditor.setSelection(templateIndex, templateIndex)
    await hx.commands.executeCommand("workbench.action.foldLineContract")
  }
  if (styleIndex !== -1) {
    activeEditor.setSelection(styleIndex, styleIndex)
    await hx.commands.executeCommand("workbench.action.foldLineContract")
  }
  if (scriptIndex !== -1) {
    activeEditor.setSelection(scriptIndex, scriptIndex)
  }
  await hx.commands.executeCommand("workbench.action.copyEditor") // 复制分栏，会复制左侧光标位置
  if (scriptIndex !== -1) {
    await hx.commands.executeCommand("workbench.action.foldLineContract")
  }
  hx.commands.executeCommand("cursorRight") // 用于触发滚动效果
})

module.exports = {
  foldAllExpandAndCopyEditor,
  copyEditorAll,
  contractScriptTag,
  contractNoScriptTag,
  contractStyleTag
}
