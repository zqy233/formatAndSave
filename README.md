# 🎉formatAndSave

## ✨功能1

> 一键格式化和保存

### 🔖 开发背景

HbuilderX中格式化命令和保存命令是分开的,个人用起来不太习惯，想一键既格式化又保存

本插件提供一个`format and save`命令，用这个命令来调用格式化命令和保存命令，达成一键触发的效果

### 🔖 使用

`format and save`默认快捷键`ctrl+s`，会跟默认的`保存`命令重复，这时会出现选择菜单，设置`以后只选一个`为`format and save`命令，请放心，`format and save`命令本质上就是调用格式化命令和保存命令

## ✨功能2

> vue文件分栏，类似vscode中volar插件分栏的效果

### 🔖 开发背景

volar分栏写代码的效果真的很爽，会自动拆分script标签，template标签和style标签，并自动折叠

### 🔖 使用

实现了类似的分栏效果，本插件供一个`copy editor and auto fold`命令，默认快捷键`ctrl+j`,`ctrl+j`后会在当前vue文件右侧打开分栏

默认左侧折叠script标签，显示template和style标签，右侧分栏则折叠template和style标签，显示script标签（即当前vue文件需要script标，template和style标签才有效果）

工具>配置>插件配置中可以勾选本插件分栏的模式

取消勾选后分栏效果跟默认的相反，即左侧显示script标签，折叠template和style标签，右侧分栏则显示template和style标签，折叠script标签

建议自行尝试一下，来决定喜欢的分栏模式

### 🔖 关闭分栏

本插件不提供关闭分栏的快捷键，如想关闭分栏，可以鼠标点击叉号或使用`关闭当前标签`，`关闭当前所有标签`等等HBuilderX内置快捷键

### 🔖 更改该快捷键

如果跟你的快捷键冲突，你也可以在工具-自定义快捷键中更改该快捷键

```json
 {"key":"ctrl+k","command":"extension.copyEditorAutoFold","override":true }
```

### 🚨 遗憾

原本想实现`ctrl+j`打开分栏，再次`ctrl+j`则会关闭分栏这样一个效果

分别尝试了HBuilderX内置的命令`关闭当前标签`，`单栏`命令来实现这一功能

使用`关闭当前标签`命令，因为没有监听关闭标签的HBuilderX的api，很容易在使用过程中产生各类问题

使用`单栏`命令，可以实现再次`ctrl+j`则会关闭分栏这样一个效果，但是HBuilderX使用`单栏`命令关闭多栏，相同的标签会重复出现，比如双栏情况左分栏有index.vue,main.js,右分栏也有相同的index.vue,main.js，使用`单栏`命令后，会出现index.vue,main.js,index.vue,main.js总共四个标签。所以如果左右分栏有很多相同的标签，变成单栏后会有很多重复的标签，最终的体验会很差，我认为，相同的标签应当在变成单栏后自动合并

所以最终放弃再次`ctrl+j`则会关闭分栏这个功能，期待HBuilderX未来提供更多功能的api吧

