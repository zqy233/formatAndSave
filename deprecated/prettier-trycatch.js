const hx = require('hbuilderx');
const prettier = require('prettier');
const diff = require('fast-diff');
const fs = require('fs/promises');
const path = require('path');

const extensionPrettier = hx.commands.registerCommand(
  'extension.prettier',
  async () => {
    await hx.commands.executeCommand('workbench.action.files.save');
    let activeEditor = await hx.window.getActiveTextEditor();
    if (!activeEditor) return;
    const { document } = activeEditor;
    // 当前编辑器打开的文件的路径
    const { fileName } = document;
    // 根据当前文件路径获取所在项目目录信息
    const workspaceFolder = await hx.workspace.getWorkspaceFolder(fileName);
    // prettier查询当前项目根目录是否存在配置文件
    let configFilePath = '';
    try {
      configFilePath = await prettier.resolveConfigFile(
        workspaceFolder.uri.fsPath
      );
    } catch (err) {
      return hx.window.showErrorMessage(
        'formatAndSave查找prettier配置文件出错：' + err + '\n'
      );
    }
    // 未找到配置文件则返回null，使用插件的prettier配置文件进行创建
    if (!configFilePath) {
      try {
        const defaultConfig = await fs.readFile(
          path.resolve(
            hx.env.appRoot,
            'plugins',
            'zqy-formatAndSave',
            '.prettierrc.js'
          ),
          {
            encoding: 'utf-8',
          }
        );
        try {
          await fs.writeFile(
            path.resolve(workspaceFolder.uri.fsPath, '.prettierrc.js'),
            defaultConfig
          );
          hx.window.showInformationMessage(
            'formatAndSave创建prettier配置文件成功，文件路径： ' +
            path.resolve(workspaceFolder.uri.fsPath, '.prettierrc.js') + '\n'
          );
        } catch (err) {
          return hx.window.showErrorMessage(
            'formatAndSave创建prettier配置文件出错 ' + err + '\n'
          );
        }
        configFilePath = path.resolve(__dirname, '.prettierrc.js');
      } catch (error) {
        return hx.window.showErrorMessage(
          'formatAndSave查找默认prettier配置文件出错 ' + error + '\n'
        );
      }
    }
    // 解析配置文件信息为js对象
    prettier.clearConfigCache();
    let options = {};
    let formatted = '';
    try {
      options = await prettier.resolveConfig(configFilePath);
    } catch (err) {
      return hx.window.showErrorMessage('prettier解析配置文件出错：' + err + '\n');
    }
    const text = document.getText();
    try {
      formatted = await prettier.format(text, {
        filepath: fileName,
        ...options,
      });
    } catch (err) {
      return hx.window.showErrorMessage('prettier格式化出错：' + err + '\n');
    }
    if (!formatted) return
    const diffText = [];
    let index = 0;
    const diffs = diff(text, formatted);
    for (let i = 0; i < diffs.length; i++) {
      if (i + 1 < diffs.length) {
        // 规律：如果-1的下一个不是1，说明是删除
        if (diffs[i][0] === -1 && diffs[i + 1][0] !== 1) {
          diffText.push({
            start: index,
            end: index + diffs[i][1].length,
            value: '',
          });
        }
        // 规律：如果-1的下一个是1，说明是替换（下一个替换了上一个）
        if (diffs[i][0] === -1 && diffs[i + 1][0] === 1) {
          diffText.push({
            start: index,
            end: index + diffs[i][1].length,
            value: diffs[i + 1][1],
          });
        }
      }
      // 最后一行是1，上一行时-1，说明是替换，上方代码处理
      // 最后一行是1，上一行不是-1，说明是新增，下方代码处理
      // 最后一行是0，无需处理
      // 只需要处理最后一行是-1
      if (i + 1 === diffs.length && diffs[i][0] === -1) {
        diffText.push({
          start: index,
          end: index + diffs[i][1].length,
          value: '',
        });
      }
      // 规律：如果1的上一个不是-1，说明是新增
      if (i > 0 && diffs[i][0] === 1 && diffs[i - 1][0] !== -1) {
        diffText.push({
          start: index,
          end: index,
          value: diffs[i][1],
        });
      }
      // 第一行是0无需处理，是-1上方代码处理，只需要处理是1的情况
      if (i === 0 && diffs[i][0] === 1) {
        diffText.push({
          start: index,
          end: index,
          value: diffs[i][1],
        });
      }
      // 只有-1和0需要计算index
      if (diffs[i][0] === -1 || diffs[i][0] === 0) {
        index += diffs[i][1].length;
      }
    }
    activeEditor.edit((editBuilder) => {
      diffText.forEach((item) => {
        editBuilder.replace(
          {
            start: item.start,
            end: item.end,
          },
          item.value
        );
      });
    });
    // 插入队列，确保所有格式化操作执行完成
    setTimeout(async () => {
      await hx.commands.executeCommand('workbench.action.files.save');
    }, 0);
  }
);
module.exports = extensionPrettier;
