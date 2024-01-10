const hx = require("hbuilderx");

// hx.commands.executeCommand('workbench.action.foldAllExpand');
// 展开所有行

// hx.commands.executeCommand('workbench.action.foldAllContract')
// 折叠所有行

// hx.commands.executeCommand('workbench.action.foldLineExpand')
// 展开单行

// hx.commands.executeCommand('workbench.action.copyEditor');
// 复制分栏，会复制左侧光标位置

// hx.commands.executeCommand('cursorRight');
// 光标向右移动，可以触发编辑器的滚动效果，保证在用户视图内

// hx.commands.executeCommand("workbench.action.prevpane");
// 聚焦上一分栏

/** 无折叠模式 */
const foldAllExpandAndCopyEditor = hx.commands.registerCommand(
  "extension.foldAllExpandAndCopyEditor",
  async () => {
    let activeEditor = await hx.window.getActiveTextEditor();
    if (activeEditor.document.languageId !== "vue") {
      return hx.commands.executeCommand("workbench.action.copyEditor");
    }
    const { selections } = activeEditor;
    await hx.commands.executeCommand("workbench.action.foldAllExpand");
    await hx.commands.executeCommand("workbench.action.copyEditor");
    await hx.commands.executeCommand("cursorRight");
    await hx.commands.executeCommand("workbench.action.prevpane");
    setSelections(activeEditor, selections);
  }
);

/** 复制分栏并折叠的通用函数 */
async function copyEditorAndContract(activeEditor, index, tag) {
  if (index !== -1) {
    // 选中标签所在行
    await activeEditor.setSelection(index, index);
    await hx.commands.executeCommand("workbench.action.copyEditor");
    await hx.commands.executeCommand("workbench.action.foldAllContract");
    await hx.commands.executeCommand("workbench.action.foldLineExpand");
    await hx.commands.executeCommand("cursorRight");
    await hx.commands.executeCommand("workbench.action.prevpane");
  } else {
    hx.window.setStatusBarMessage(`未找到${tag}标签`, 10000);
    return new Promise((resolve) => {
      resolve();
    });
  }
}

/** 左分栏不折叠，右分栏则创建三次，分别显示template、script、style标签 */
const copyEditorAll = hx.commands.registerCommand(
  "extension.copyEditorAll",
  async () => {
    let activeEditor = await hx.window.getActiveTextEditor();
    if (activeEditor.document.languageId !== "vue") {
      return hx.commands.executeCommand("workbench.action.copyEditor");
    }
    const { selections } = activeEditor;
    const word = activeEditor.document.getText();
    const templateIndex = word.indexOf("<template");
    const scriptIndex = word.indexOf("<script");
    const styleIndex = word.indexOf("<style");
    await hx.commands.executeCommand("workbench.action.foldAllExpand");
    await copyEditorAndContract(activeEditor, templateIndex, "template");
    await copyEditorAndContract(activeEditor, scriptIndex, "script");
    await copyEditorAndContract(activeEditor, styleIndex, "style");
    setSelections(activeEditor, selections);
  }
);

/** 左侧显示两个标签，右侧显示单个标签的通用函数 */
async function leftTwoTagsAndRightOneTag(tagName) {
  let activeEditor = await hx.window.getActiveTextEditor();
  if (activeEditor.document.languageId !== "vue") {
    return hx.commands.executeCommand("workbench.action.copyEditor");
  }
  const { selections } = activeEditor;
  const word = activeEditor.document.getText();
  const index = word.indexOf("<" + tagName);
  await hx.commands.executeCommand("workbench.action.foldAllExpand");
  if (index === -1)
    return hx.window.setStatusBarMessage(`未找到${tagName}标签`, 10000);
  await activeEditor.setSelection(index, index);
  await hx.commands.executeCommand("workbench.action.foldLineContract");
  await hx.commands.executeCommand("workbench.action.copyEditor");
  await hx.commands.executeCommand("workbench.action.foldAllContract");
  await hx.commands.executeCommand("workbench.action.foldLineExpand");
  await hx.commands.executeCommand("cursorRight");
  await hx.commands.executeCommand("workbench.action.prevpane");
}

/** 左侧分栏显示template、style标签，右侧分栏显示script标签 */
const contractScriptTag = hx.commands.registerCommand(
  "extension.contractScriptTag",
  () => {
    leftTwoTagsAndRightOneTag("script");
  }
);

/** 左侧分栏显示template、script标签，右测分栏显示style标签 */
const contractStyleTag = hx.commands.registerCommand(
  "extension.contractStyleTag",
  () => {
    leftTwoTagsAndRightOneTag("style");
  }
);

/** 左侧分栏显示script,右侧分栏显示template、style标签 */
const contractNoScriptTag = hx.commands.registerCommand(
  "extension.contractNoScriptTag",
  async () => {
    let activeEditor = await hx.window.getActiveTextEditor();
    if (activeEditor.document.languageId !== "vue") {
      return hx.commands.executeCommand("workbench.action.copyEditor");
    }
    const word = activeEditor.document.getText();
    const scriptIndex = word.indexOf("<script");
    const templateIndex = word.indexOf("<template");
    const styleIndex = word.indexOf("<style");
    await hx.commands.executeCommand("workbench.action.foldAllExpand");
    if (templateIndex !== -1) {
      await activeEditor.setSelection(templateIndex, templateIndex);
      await hx.commands.executeCommand("workbench.action.foldLineContract");
    }
    if (styleIndex !== -1) {
      await activeEditor.setSelection(styleIndex, styleIndex);
      await hx.commands.executeCommand("workbench.action.foldLineContract");
    }
    if (scriptIndex !== -1) {
      await activeEditor.setSelection(scriptIndex, scriptIndex);
    }
    await hx.commands.executeCommand("workbench.action.copyEditor");
    if (scriptIndex !== -1) {
      await hx.commands.executeCommand("workbench.action.foldLineContract");
    }
    await hx.commands.executeCommand("cursorRight");
    await hx.commands.executeCommand("workbench.action.prevpane");
  }
);

const setSelections = async (activeEditor, selections) => {
  for (let i = 0; i < selections.length; i++) {
    activeEditor.setSelection(selections[i].start, selections[i].end);
  }
};
module.exports = {
  foldAllExpandAndCopyEditor,
  copyEditorAll,
  contractScriptTag,
  contractNoScriptTag,
  contractStyleTag,
};
