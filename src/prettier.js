const hx = require("hbuilderx");
const prettier = require("prettier");
const diff = require("fast-diff");
const fs = require("fs/promises");
const path = require("path");
const to = require("await-to-js").default;

// 匹配 lang="uts" 或 lang='uts'
const UTS_REGEX = /lang=(['"]?)uts\1/gim;

// 匹配 <script ...> 标签，但不包含 lang 属性 (用于匹配带其他属性的无lang标签)
const NO_LANG_SCRIPT_ATTR_REGEX = /<script\s+(?!.*lang\s*=)([^>]*?)>/gim;

// 匹配只有 <script> 或 <script></script> 且无属性的情况
const SIMPLE_SCRIPT_REGEX = /<script\s*>/gim;

/**
 * 获取格式化后的文本
 * @param {string} filepath 需要格式化的文件路径
 * @param {string} text 需要格式化的文本内容
 * @param {Object} options 原始的配置信息
 * @param {Object} formatOptions 处理后的配置信息
 * @returns {string} 格式化后的文本内容，如果出错则返回空字符串。
 */
function getFormattedText(filepath, text, options, formatOptions) {
  let tempText = text;
  let formattedText = "";

  const isUvueFile = filepath.endsWith('.uvue');
  const MARKER_ATTR = 'data-p-lang';
  const ORIGINAL_LANG_VALUE = 'uts';
  const NO_LANG_VALUE = 'no-lang';

  // ----------------------------------------------------
  // I. 预处理 (Pre-processing) - 标记并替换为 lang="ts"
  // ----------------------------------------------------
  if (isUvueFile) {

    // --- A. 替换 lang="uts" -> lang="ts" 并标记 ---
    tempText = tempText.replace(UTS_REGEX, (match, quote) => {
      // 替换成 lang="ts" 并添加标记属性
      return `lang=${quote}ts${quote} ${MARKER_ATTR}="${ORIGINAL_LANG_VALUE}"`;
    });

    // --- B. 处理无 lang 属性的 <script> 块 (添加 lang="ts" 和标记) ---

    // 1. 匹配带其他属性的无 lang 标签
    tempText = tempText.replace(NO_LANG_SCRIPT_ATTR_REGEX, (match) => {
      const insertion = `lang="ts" ${MARKER_ATTR}="${NO_LANG_VALUE}" `;
      // 确保在 <script 后面添加 lang="ts"
      return match.replace(/<script\s+/, `<script ${insertion}`);
    });

    // 2. 匹配简单 <script> 标签
    tempText = tempText.replace(SIMPLE_SCRIPT_REGEX, `<script lang="ts" ${MARKER_ATTR}="${NO_LANG_VALUE}">`);
  }

  // ----------------------------------------------------
  // II. 文件类型判断与 Parser 指定
  // ----------------------------------------------------
  const pathParse = path.parse(filepath);
  const extname = pathParse.ext || pathParse.name;

  if (extname === ".nvue" || extname === ".uvue") {
    formatOptions["parser"] = "vue";
  }
  else if (extname === ".uts") {
    formatOptions["parser"] = "typescript";
  }
  else if (options.parsers && options.parsers[extname]) {
    formatOptions["parser"] = options.parsers[extname];
  }

  // ----------------------------------------------------
  // III. 格式化 (Formatting)
  // ----------------------------------------------------
  try {
    formattedText = prettier.format(tempText, formatOptions);
  } catch (err) {
    // 如果是常见错误:不识别的文件类型，用状态栏显示报错
    const errMsg = JSON.stringify(err, Object.getOwnPropertyNames(err), 2);
    if (errMsg.includes("No parser could be inferred for file")) {
      hx.window.setStatusBarMessage(
        "prettier不支持该当前文件格式化",
        5000,
        "info"
      );
      return "";
    }
    hx.window.showErrorMessage("prettier格式化出错：" + err + "\n");
    return "";
  }

  // ----------------------------------------------------
  // IV. 后处理 (Post-processing) - 还原标记
  // ----------------------------------------------------
  if (isUvueFile) {

    // 构建匹配 lang="ts" 和标记属性的正则表达式
    // 关键改变：在前面添加 (\s*) 捕获组，用于匹配 lang="ts" 前面的所有空格
    const markerFullRegex = new RegExp(`(\\s*)(lang=(['"]?)ts\\3)\\s*${MARKER_ATTR}="([^"]*)"`, 'gim');

    formattedText = formattedText.replace(markerFullRegex, (match, leadingSpaces, fullLangAttr, quote, originalValue) => {

      // A. 还原 lang="uts"
      if (originalValue === ORIGINAL_LANG_VALUE) {
        // 替换回 lang="uts"
        // 返回 leadingSpaces (保留原有的空格) + 还原后的 uts 属性
        return `${leadingSpaces}lang=${quote}uts${quote}`;
      }

      // B. 还原无 lang 属性的脚本块
      if (originalValue === NO_LANG_VALUE) {
        // 如果是无 lang 标记，直接移除 lang="ts" 和标记属性。
        // 我们的正则捕获了前面的空格 (leadingSpaces)，所以只需返回空字符串即可。
        return '';
      }

      return match;
    });

    // 额外的最终清理：处理 <script setup> 还原后可能留下的双空格
    // 匹配 <script + 2个或更多空格> (如果有 setup 属性则不会匹配)
    // 这一步是为了防止 <script  setup> 中间出现多个空格
    formattedText = formattedText.replace(/<script\s{2,}/gim, '<script ');

    // 清理 <script   > 标签的尾部空格（如果有，则移除多余的）
    formattedText = formattedText.replace(/<script\s+>/gim, '<script>');
  }

  return formattedText;
}

/**
 * 根据格式化字符串的diff列表进行编辑器内容修改
 * @param {*} text 格式化前文本
 * @param {*} formattedText 格式化后文本
 * @param {*} activeEditor 激活的编辑器
 * @returns
 */
function diffEdit(text, formattedText, activeEditor) {
  if (!formattedText) return;
  const diffText = [];
  let index = 0;
  const diffs = diff(text, formattedText);
  for (let i = 0; i < diffs.length; i++) {
    if (i + 1 < diffs.length) {
      // 规律：如果-1的下一个不是1，说明是删除
      if (diffs[i][0] === -1 && diffs[i + 1][0] !== 1) {
        diffText.push({
          start: index,
          end: index + diffs[i][1].length,
          value: "",
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
        value: "",
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
  setTimeout(() => {
    hx.commands.executeCommand("workbench.action.files.save");
  }, 0);
}

/**
 * 加载配置文件并格式化代码
 * @param {*} filepath 需要格式化的文件路径
 * @param {*} configFilePath prettier配置文件路径
 * @param {*} text 需要格式化的文本内容
 * @param {*} activeEditor 激活的编辑器
 * @returns
 */
async function formattWithOptions(
  filepath,
  configFilePath,
  text,
  activeEditor
) {
  // 解析配置文件信息
  // useCache为false，相当于prettier.clearConfigCache()
  const [resolveConfigErr, options] = await to(
    prettier.resolveConfig(configFilePath, {
      editorconfig: true,
      useCache: false,
    })
  );
  if (resolveConfigErr) {
    return hx.window.showErrorMessage(
      "prettier解析配置文件出错：" + resolveConfigErr + "\n"
    );
  }
  const formatOptions = {
    filepath,
    ...options,
  };
  const formattedText = getFormattedText(
    filepath,
    text,
    options,
    formatOptions
  );
  diffEdit(text, formattedText, activeEditor);
}

const extensionPrettier = hx.commands.registerCommand(
  "extension.prettier",
  async () => {
    await hx.commands.executeCommand("workbench.action.files.save");
    let activeEditor = await hx.window.getActiveTextEditor();
    if (!activeEditor)
      return hx.window.setStatusBarMessage("当前没有打开的文件", 5000, "info");
    const { document } = activeEditor;
    // 当前编辑器打开的文件的路径
    const { fileName: filepath } = document;
    const text = document.getText();
    // 根据当前文件路径获取所在项目目录信息
    const workspaceFolder = await hx.workspace.getWorkspaceFolder(filepath);

    // 当用户在插件设置中点击默认配置文件链接后，才会在appData中生成相应文件目录，该目录中的默认配置文件可以在插件设置中跳转与编辑，所以有该配置文件的话应使用该文件
    // 目录：C:\Users\用户\AppData\Roaming\HBuilder X\extensions\extensions\zqy-formatAndSave\.prettierrc.js
    let prettierrcJsAppDataPath = path.resolve(
      hx.env.appData,
      "extensions",
      "zqy-formatAndSave",
      ".prettierrc.js"
    );
    // appData中没有则使用appRoot目录下的默认插件配置文件
    const [noPrettierrcJsAppData] = await to(
      fs.access(prettierrcJsAppDataPath, fs.constants.F_OK)
    );
    if (noPrettierrcJsAppData) {
      prettierrcJsAppDataPath = path.resolve(
        hx.env.appRoot,
        "plugins",
        "zqy-formatAndSave",
        ".prettierrc.js"
      );
    }

    // 如果是string，说明当前文件不在项目中，使用插件默认配置文件格式化
    if (typeof workspaceFolder.uri === "string") {
      hx.window.setStatusBarMessage(
        "当前文件不在左侧目录项目中，使用插件默认配置文件.prettierrc.js格式化",
        5000,
        "info"
      );
      // 有可能插件默认配置文件.prettierrc.js被删除，这时需要提示用户
      const [noPrettierrcJs] = await to(
        fs.access(prettierrcJsAppDataPath, fs.constants.F_OK)
      );
      if (noPrettierrcJs) {
        // 不传选项值，prettier则会使用默认值格式化，但这仍是预料之外的情况，属于需要修复的bug
        hx.window.showErrorMessage(
          "加载插件默认配置文件.prettierrc.js出错，请将以下报错信息告知开发者：" +
          noPrettierrcJs +
          "\n"
        );
        const formattedText = getFormattedText(
          filepath,
          text,
          {},
          {
            filepath,
          }
        );
        return diffEdit(text, formattedText, activeEditor);
      }
      // 一般来说，插件默认配置文件.prettierrc.js不会被删除，正常格式化
      return formattWithOptions(
        filepath,
        prettierrcJsAppDataPath,
        text,
        activeEditor
      );
    }
    // 否则是对象，说明当前文件在项目中，使用项目根目录配置格式化
    const workspaceFolderPath = workspaceFolder.uri.fsPath;
    // prettier查询当前项目根目录是否存在配置文件
    let [resolveConfigFileErr, configFilePath] = await to(
      prettier.resolveConfigFile(workspaceFolderPath)
    );
    if (resolveConfigFileErr) {
      return hx.window.showErrorMessage(
        "prettier查找配置文件出错：" + resolveConfigFileErr + "\n"
      );
    }
    // 未找到配置文件则返回null，使用插件的prettier配置文件进行创建
    if (!configFilePath) {
      const [readFileErr, defaultConfig] = await to(
        fs.readFile(prettierrcJsAppDataPath, {
          encoding: "utf-8",
        })
      );
      if (readFileErr) {
        return hx.window.showErrorMessage(
          "查找默认prettier配置文件出错 " + readFileErr + "\n"
        );
      }
      const writeConfigFilePath = path.resolve(
        workspaceFolderPath,
        ".prettierrc.js"
      );
      const [writeFileErr] = await to(
        fs.writeFile(writeConfigFilePath, defaultConfig)
      );
      if (writeFileErr) {
        return hx.window.showErrorMessage(
          "创建prettier配置文件出错" + writeFileErr + "\n"
        );
      }
      configFilePath = writeConfigFilePath;
      hx.window.showInformationMessage(
        "创建prettier配置文件成功，文件路径：" + configFilePath + "\n"
      );
    }
    // .prettierignore文件中设置文件不进行格式化
    const ignorePath = path.resolve(workspaceFolderPath, ".prettierignore");
    const [noIgnoreFile] = await to(fs.access(ignorePath, fs.constants.F_OK));
    let fileInfoOptions = {
      ignorePath,
    };
    // 没有.prettierignore就创建.prettierignore文件，默认值uni_modules
    if (noIgnoreFile) {
      const [writeFileErr] = await to(fs.writeFile(ignorePath, `uni_modules`));
      if (writeFileErr) {
        hx.window.showErrorMessage(
          "创建.prettierignore文件出错" + writeFileErr + "\n"
        );
        fileInfoOptions = {};
      } else {
        hx.window.showInformationMessage(
          "创建.prettierignore文件成功，文件路径：" + ignorePath + "\n"
        );
      }
    }
    const info = await prettier.getFileInfo(filepath, fileInfoOptions);
    if (info.ignored) {
      return hx.window.setStatusBarMessage(
        "当前文件已在.prettierignore中忽视",
        5000,
        "info"
      );
    }
    formattWithOptions(filepath, configFilePath, text, activeEditor);
  }
);

module.exports = extensionPrettier;
