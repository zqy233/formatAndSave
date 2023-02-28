const hx = require('hbuilderx');
const prettier = require('prettier');
const diff = require('fast-diff');
const fs = require('fs/promises');
const path = require('path');
const to = require('await-to-js').default;

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
    let [resolveConfigFileErr, configFilePath] = await to(
      prettier.resolveConfigFile(workspaceFolder.uri.fsPath)
    );
    if (resolveConfigFileErr) {
      return hx.window.showErrorMessage(
        'formatAndSave查找prettier配置文件出错：' + resolveConfigFileErr + '\n'
      );
    }
    // 未找到配置文件则返回null，使用插件的prettier配置文件进行创建
    if (!configFilePath) {
      const [readFileErr, defaultConfig] = await to(
        fs.readFile(
          path.resolve(
            hx.env.appRoot,
            'plugins',
            'zqy-formatAndSave',
            '.prettierrc.js'
          ),
          {
            encoding: 'utf-8',
          }
        )
      );
      if (readFileErr) {
        return hx.window.showErrorMessage(
          'formatAndSave查找默认prettier配置文件出错 ' + readFileErr + '\n'
        );
      }
      const writeConfigFilePath = path.resolve(workspaceFolder.uri.fsPath, '.prettierrc.js')
      const [writeFileErr] = await to(
        fs.writeFile(
          writeConfigFilePath,
          defaultConfig
        )
      );
      if (writeFileErr) {
        return hx.window.showErrorMessage(
          'formatAndSave创建prettier配置文件出错' + writeFileErr + '\n'
        );
      }
      configFilePath = writeConfigFilePath;
      hx.window.showInformationMessage(
        'formatAndSave创建prettier配置文件成功，文件路径：' +
        configFilePath +
        '\n'
      );
    }
    // 解析配置文件信息为js对象
    prettier.clearConfigCache();
    const [resolveConfigErr, options] = await to(
      prettier.resolveConfig(configFilePath)
    );
    if (resolveConfigErr) {
      return hx.window.showErrorMessage(
        'prettier解析配置文件出错：' + resolveConfigErr + '\n'
      );
    }
    const text = document.getText();
    let formatted = '';
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
