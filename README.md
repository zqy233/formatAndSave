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

实现了类似的分栏效果，本插件供一个`copy editor and auto fold`命令，默认快捷键`ctrl+j`,`ctrl+j`后会打开分栏，再次`ctrl+j`则会关闭分栏，如果跟你的快捷键冲突，你也可以在工具-自定义快捷键中更改该快捷键

```json
 {"key":"ctrl+k","command":"extension.copyEditorAutoFold","override":true }
```

### 🔖 分栏模式

工具>配置>插件配置中可以勾选本插件分栏的模式

默认勾选,左侧折叠script标签，显示template和style标签，右侧分栏则折叠template和style标签，显示script标签

取消勾选后分栏效果跟默认的相反，建议自行尝试一下，来决定喜欢的分栏模式

### 🚨 注意，`copy editor and auto fold`有关闭当前页面的效果

关闭分栏的功能是通过关闭当前页面实现的，所以当前页面没有分栏则会直接关闭当前页面

当然，这一般也不会有什么问题，关闭当前页面前HBuilderX都会提醒你进行保存的

