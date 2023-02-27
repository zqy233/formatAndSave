# prettier格式化

::: tip

基于prettier最新版本@2.8.4，支持prettier最新配置

:::

### 用法

1. 避免与官方格式化冲突：工具>设置>编辑器设置>取消勾选保存时自动格式化
2. 插件提供一个`ctrl+s`命令，名为`prettier格式化代码`，与HBuilderX默认保存命令重复，此时按下`ctrl+s`会出现选择菜单，设置`以后只选一个`为`prettier格式化代码`即可
3. 在任意文件中`ctrl+s`，插件会获取该文件所在项目目录，判断项目根目录下是否存在prettier配置文件，如果不存在，则会创建默认prettier配置文件（js配置文件）
4. 如果不想使用插件创建的配置文件，比如之前已有统一团队风格的prettier配置文件，可以复制该文件到项目根目录下，插件则不会新建，而是直接使用该配置文件（配置文件无固定后缀名要求，属于prettier配置文件即可）

### 与官方prettier插件的区别：

官方的prettier不支持使用根目录prettier配置文件，不方便团队统一风格

### 为什么不使用[onWillSaveTextDocument](https://hx.dcloud.net.cn/ExtensionDocs/Api/workspace/onWillSaveTextDocument?id=onwillsavetextdocument)

HBuilderX插件开发提供了保存事件`onWillSaveTextDocument`，为什么不使用该事件触发格式化，而是创建一个`ctrl+s`命令来替换HBuilderX默认保存命令？

因为该事件只有编辑后保存才会触发，文件未发生更改情况下不会触发

 <git-talk/> 