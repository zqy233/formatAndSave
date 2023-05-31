## [官方文档](https://zqy233.github.io/formatAndSave/)(更详细)

> 如果更新插件版本后出现命令重复的情况，重启下 HBuilderX 应该就可解决
>
> 插件完全开源，如果觉得插件对您有所帮助，可以在[github](https://github.com/zqy233/formatAndSave)上点上一颗星（star），感谢[笑]

## ✨ 功能 1 prettier 格式化(测试中)

基于 prettier 最新版本@2.8.8 实现，感谢`DCloud-HX-WKP`在开发过程中提供了所遇问题的解决方案

支持读取项目根目录配置文件进行 prettier 格式化，如果没有配置文件，则会自动在项目根目录创建`.prettierrc.js`和`.prettierignore`（具体用法请查看下方）

### 用法

1. 避免与官方格式化冲突：工具>设置>编辑器设置>取消勾选保存时自动格式化
2. 插件提供一个`ctrl+s`命令，名为`prettier格式化代码`，与 HBuilderX 默认保存命令重复，在任意文件中按下`ctrl+s`会出现选择菜单，设置`以后只选一个`为`prettier格式化代码`
3. 接下来就在文件中使用`ctrl+s`就可以了，会使用 prettier 格式化代码并在格式化后保存

### 插件如何工作（没有自动生成配置文件请看此处）

1. 在 HBuilderX 左侧目录的任意项目的任意文件中`ctrl+s`，插件会获取该文件所在项目目录，判断所在项目根目录下是否存在 prettier 配置文件、是否存在 prettier 忽略文件`.prettierignore`，如果不存在，则会在项目根目录创建默认的`.prettierrc.js`和`.prettierignore`，插件会基于这两个文件进行格式化
1. `注意！！！`如果所要格式化的文件`不在 HBuilderX 左侧目录的项目列表中`，则`不会创建配置文件与忽略文件`，而是使用插件的默认配置，在 HBuilderX `工具>设置>插件配置`中可以设置默认配置文件，如想使用根目录配置文件，需要先导入项目到 HBuilderX 左侧目录中，另外，默认配置文件权重小于项目根目录配置文件，这一点同 vscode 一致
1. 因为是基于配置文件格式化，所以允许 HBuilderX 不同项目之间配置文件配置不同，进行不同配置的格式化，互不影响
1. 如果不想使用插件创建的配置文件，比如之前已有统一团队风格的 prettier 配置文件，可以复制该文件到项目根目录下，插件则不会新建，而是直接使用该配置文件，配置文件无固定后缀名要求，属于 prettier 配置文件即可（别忘了，该项目需要在 HBuilderX 左侧目录中）

### 与官方 prettier 插件的区别：

官方的 prettier 不支持使用根目录 prettier 配置文件，不方便团队统一风格

### 配置默认不支持的文件类型的格式化

prettier 默认支持 `JavaScript`、 `Flow`、 `JSX`、`TypeScript`、 `TSX`、 `JSON.stringify`、`JSON`、`JSON with Comments`、`JSON5`、`CSS`、`PostCSS`、`ess`、`SCSS`、`Handlebars`、`GraphQL`、`Markdown`、`MDX`、`Angular`、`HTML`、`Lightning Web Components`、`Vue`、`YAML`

对于不默认支持的文件类型，如`java`、`sql`，`xml`等，需要安装 prettier 插件，具体步骤请查看[官方文档](https://zqy233.github.io/formatAndSave/guide/prettier.html#%E9%85%8D%E7%BD%AE%E9%BB%98%E8%AE%A4%E4%B8%8D%E6%94%AF%E6%8C%81%E7%9A%84%E6%96%87%E4%BB%B6%E7%B1%BB%E5%9E%8B%E7%9A%84%E6%A0%BC%E5%BC%8F%E5%8C%96)

### `.prettierrc.js`配置文件

在 HBuilderX 左侧目录的任意项目的任意文件中`ctrl+s`，如果项目根目录没有配置文件，会自动生成`.prettierrc.js`，包含最新版 prettier 所有支持的格式化配置，并添加了非常详细的注释，建议查看一遍，并自行调整为团队喜欢的格式化风格

### `.prettierignore`忽略文件

在 HBuilderX 左侧目录的任意项目的任意文件中`ctrl+s`，如果项目根目录没有忽略文件，会自动生成`.prettierignore`，用于指定哪些文件或文件目录忽略 prettier 的格式化

插件默认生成的`.prettierignore`内容是`uni_modules`，表示该目录下的所有文件 prettier 会忽略，在这些文件中`ctrl+s`不会进行格式化

## ✨ 功能 2 vue 文件双分栏模式且自动折叠

> 很多时候滚动是不方便的，尤其是 vue 文件需要对照 template 和 script 标签或者对照 template 和 style 标签的时候，这时候就需要分栏，比较常用的还是双分栏，左右对照
>
> 本插件提供右键菜单和快捷键的方式，快速进行左右双分栏，并按折叠模式自动折叠 `script` ，`template` 和 `style`标签
>
> 当前 vue 文件需要拥有 `script` ，`template` 和 `style` 标签才能体现出效果
>
> (0.0.22 版本做了兼容性处理)可以在非 vue 文件中使用该命令，会直接调用 HBuilderX 的`复制标签卡到分栏`命令

### 用法

vue 文件中右键菜单选择`向右复制分栏并自动折叠`，选择二级菜单的折叠模式即可

目前现有的折叠模式:

- 无折叠模式（跟 HBuilderX 的`复制标签卡到分栏`命令的区别是：会全部展开当前标签卡后再进行分栏）
- （`强烈推荐`）左分栏不折叠，右分栏则复制三次标签卡，并分别显示 template、script、style 标签
- 左分栏显示 template、style 标签，右分栏显示 script 标签
- 左分栏显示 script 标签，右分栏显示 template、style 标签
- 左分栏显示 template、script 标签，右分栏显示 style 标签

### 快捷键

目前只有第二种折叠方式有快捷键，即左分栏不折叠，右分栏则复制三次标签卡，并分别显示 template、script、style 标签

默认快捷键`ctrl+j`，`ctrl+j`后会在当前 vue 文件右侧打开分栏

### 使用技巧

- 只在左侧分栏中使用分栏命令，右侧分栏中使用分栏命令会在右侧创建新的分栏
- 保存当前标签卡，则所有相同的标签卡都会保存，这时聚焦到右侧分栏，使用 HBuilderX 的命令`关闭所有已保存标签卡`，即可快速关闭分栏（如果右侧分栏的标签卡都保存了）

## ✨ 功能 3 html 和 css 中嵌套注释

> 二次封装注释命令，快捷键为`ctrl+/`，与 HBuilderX 默认注释命令重复，在任意文件中按下`ctrl+/`会出现选择菜单，设置`以后只选一个`为`嵌套注释`

支持 html 和 css（包括 vue）嵌套注释下进行注释，它会自动判断所有注释区域，然后分段进行相应注释，解开注释也会进行判断，不用一个个选择解开，直接全选多个注释，一键后会进行分段解开注释

例如，选择如下内容

```html
<scroll-view scroll-x="true">
  <view class="scroll-inner">
    <!-- <image v-for="item in imgList" :key="item.id" :src="item.imageUrl" mode="aspectFill"></image> -->
  </view>
</scroll-view>
```

这时直接注释会出现错误，会变成这样，只能依次选中没有注释的地方，依次注释

```html
<!-- <scroll-view scroll-x="true">
            <view class="scroll-inner">
                <!-- <image v-for="item in imgList" :key="item.id" :src="item.imageUrl" mode="aspectFill"></image> -->
  </view>
</scroll-view> -->
```

而封装后的注释命令，会自动进行分段注释，如果想解开这三个注释，直接选中整个区域，一键后即可全部解开

```html
<!-- <scroll-view scroll-x="true">
            <view class="scroll-inner"> -->
<!-- <image v-for="item in imgList" :key="item.id" :src="item.imageUrl" mode="aspectFill"></image> -->
<!-- </view>
</scroll-view> -->
```

fix：顺带修复了，HBuilderX 注释命令开始行和结束行如果不选择完全，注释的位置会出现错误的问题

## ✨ 功能 4 快速选中双引号区域 

> vue 代码开发很多时候都需要在`双引号""`区域内写代码，这种时候一般只能用鼠标来移动光标，不是很快捷

提供两个命令，选中上一个`双引号""`区域和下一个`双引号""`区域命令，快捷键分别为`alt+上方向键`，`alt+下方向键`

## ✨ 功能 5 生成块注释`/** */`

> 用于替换 HBuilderX 默认的块注释命令，快捷键为`ctrl+shift+/`，与 HBuilderX 默认块注释命令重复，在任意文件中按下`ctrl+shift+/`会出现选择菜单，设置`以后只选一个`为`块注释/** */`
>
> 默认块注释命令生成`/* */`，替换后生成`/** */`，区别是多了一个`*`

为什么要这样做？因为 `/** */`的块注释写法才能使变量在悬浮或者代码补全时，提供注释说明

## ✨ 功能 6 使用 vscode 打开所在目录(测试中)

> HBuilderX 左侧目录，右击`文件夹`后菜单会多出一项`使用vscode打开所在目录`

需要安装 vscode，vscode 会全局安装一个`code`命令，基于这个`code`命令打开文件夹

如存在运行上的问题，欢迎 pr 完善该代码

可以使用 nodejs 运行下方代码，进行调试与完善

```js
const process = require("child_process");
// code+文件路径 如C:\\Users
const path = "C:\\Users";
process.exec("code " + path, (error) => {
  // 失败
  if (error) {
    console.log(error);
  }
});
```
