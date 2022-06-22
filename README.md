# 🎉formatAndSave

> 插件市场:https://ext.dcloud.net.cn/plugin?id=7695

## ✨功能1

> 一键触发格式化和保存

HBuilderX现已默认支持同时格式化与保存，可以在工具>设置>编辑器设置>勾选保存时自动格式化

但文件未发生更改的情况下，`ctrl+s`不会触发格式化

本插件提供一个`format and save`命令，用这个命令来一键调用格式化命令和保存命令

`format and save`命令默认快捷键`ctrl+s`，会跟默认的`保存`命令重复，这时会出现选择菜单，设置`以后只选一个`为`format and save`命令，请放心，`format and save`命令本质上就是调用格式化命令和保存命令

## ✨功能2

> vue 文件分栏，类似 vscode 中 volar 插件分栏的效果

### 🔖 开发背景

volar 分栏写代码的效果真的很爽，会自动拆分 script 标签，template 标签和 style 标签，并自动折叠

### 🔖 使用

实现了类似的分栏效果，本插件提供一个`copy editor and auto fold`命令，默认快捷键`ctrl+j`,`ctrl+j`后会在当前 vue 文件右侧打开分栏

默认左侧折叠 script 标签，显示 template 和 style 标签，右侧分栏则折叠 template 和 style 标签，显示 script 标签（当前 vue 文件需要拥有 `script` ，`template` 和 `style` 标签才能体现效果）

工具>配置>插件配置中可以勾选本插件分栏的模式

取消勾选后分栏效果跟默认的相反，即左侧显示 script 标签，折叠 template 和 style 标签，右侧分栏则显示 template 和 style 标签，折叠 script 标签

建议自行尝试一下，来决定喜欢的分栏模式

### 🔖 关闭分栏

本插件不提供关闭分栏的快捷键，如想关闭分栏，可以鼠标点击叉号或使用`关闭当前标签`，`关闭所有标签`等等 HBuilderX 内置快捷键

### 🚨 遗憾

原本想实现`ctrl+j`打开分栏，再次`ctrl+j`则会关闭分栏这样一个效果

分别尝试了 HBuilderX 内置的命令`关闭当前标签`，`单栏`命令来实现这一功能

使用`关闭当前标签`命令，因为没有监听关闭标签的 HBuilderX 的 api，很容易在使用过程中产生各类问题

使用`单栏`命令，可以实现再次`ctrl+j`则会关闭分栏这样一个效果，但是 HBuilderX 使用`单栏`命令关闭多栏，相同的标签会重复出现，比如双栏情况左分栏有 index.vue,main.js,右分栏也有相同的 index.vue,main.js，使用`单栏`命令后，会出现 index.vue,main.js,index.vue,main.js 总共四个标签。所以如果左右分栏有很多相同的标签，变成单栏后会有很多重复的标签，最终的体验会很差，我认为，相同的标签应当在变成单栏后自动合并

所以最终放弃再次`ctrl+j`则会关闭分栏这个功能，期待 HBuilderX 未来提供更多功能的 api 吧

## ✨ 功能3

> 前往上一个或下一个`双引号""`所在区域

### 🔖 开发背景

vue代码开发，很多时候都需要在`双引号""`区域内写代码，这种时候一般只能用鼠标来移动光标，不是很快捷

### 🔖 使用

本插件提供`jumpLastQuote`和`jumpNextQuote`命令，快捷键分别为`alt+上方向键`，`alt+下方向键`,分别选中上一个`双引号""`区域和下一个`双引号""`区域

