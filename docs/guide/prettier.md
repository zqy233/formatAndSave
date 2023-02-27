# prettier 格式化

::: tip

基于 prettier 最新版本@2.8.4，支持 prettier 最新配置

:::

## 旧版本(0.0.14 之前)`formatAndSave`命令迁移

1. 如果使用的是旧版本的`formatAndSave`命令，HBuilderX 上方菜单>工具>自定义快捷键>删除以下代码

   ```json
   {"key":"ctrl+s","command":"extension.formatAndSave","override":true }
   ```

2. 任意文件中按下`ctrl+s`设置`以后只选一个`为`prettier格式化代码`，工具>自定义快捷键>将会自动生成下方代码

   ```json
   {"key":"ctrl+s","command":"extension.prettier","override":true }
   ```

## 用法

1. 避免与官方格式化冲突：工具>设置>编辑器设置>取消勾选保存时自动格式化
2. 插件提供一个`ctrl+s`命令，名为`prettier格式化代码`，与 HBuilderX 默认保存命令重复，此时按下`ctrl+s`会出现选择菜单，设置`以后只选一个`为`prettier格式化代码`即可
3. 在任意文件中`ctrl+s`，插件会获取该文件所在项目目录，判断项目根目录下是否存在 prettier 配置文件，如果不存在，则会创建默认 prettier 配置文件（js 配置文件）
4. 如果不想使用插件创建的配置文件，比如之前已有统一团队风格的 prettier 配置文件，可以复制该文件到项目根目录下，插件则不会新建，而是直接使用该配置文件（配置文件无固定后缀名要求，属于 prettier 配置文件即可）

## 与官方 prettier 插件的区别：

官方的 prettier 不支持使用根目录 prettier 配置文件，不方便团队统一风格

## 为什么不使用[onWillSaveTextDocument](https://hx.dcloud.net.cn/ExtensionDocs/Api/workspace/onWillSaveTextDocument?id=onwillsavetextdocument)

HBuilderX 插件开发提供了保存事件`onWillSaveTextDocument`，为什么不使用该事件触发格式化，而是创建一个`ctrl+s`命令来替换 HBuilderX 默认保存命令？

因为该事件只有编辑后保存才会触发，文件未发生更改情况下不会触发

## 自行设置快捷键

HBuilderX 上方菜单>工具>自定义快捷键>更改插件快捷键

```json
{"key":"Ctrl+S","command":"extension.prettier","override":true }
```

 <git-talk/>
