# 🎉formatAndSave

> 说明文档:<https://zqy233.github.io/formatAndSave/>
>
> 如果更新本插件的版本后出现命令重复的情况，重启下 HBuilderX 应该就可解决

## ✨ 功能 1 一键格式化与保存(不推荐使用)

> 新版 HBuilderX 现支持保存时自动格式化，可以在工具>设置>编辑器设置>勾选保存时自动格式化，但这个配置是先保存后格式化，文件未发生更改的情况下，`ctrl+s`不会触发格式化

- 本插件提供一个`重排代码格式并保存`命令，先格式化再保存，快捷键`ctrl+s`，本质上就是先后调用格式化命令和保存命令
- 目前该命令已不推荐使用，但保留，以便不影响一些仍在使用的用户
- 不推荐的原因在于相较于 HBhuilderX 的保存后格式化，插件直接调用格式化命令会卡顿一些
- 该快捷键会与默认的`保存`快捷键重复，这时会出现选择菜单，设置`以后只选一个`为 HBuilderX 默认的`保存`命令即可

## ✨ 功能 2 html 和 css 中嵌套注释

> 二次封装注释命令，快捷键仍为`ctrl+/`

支持 html 和 css（包括 vue）嵌套注释下进行注释，它会自动判断所有注释区域，然后分段进行相应注释，解开注释也会进行判断，再也不用一个个选择解开，直接全选多个注释，一键后会进行分段解开注释

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

## ✨ 功能 3 快速选中双引号区域

> vue 代码开发很多时候都需要在`双引号""`区域内写代码，这种时候一般只能用鼠标来移动光标，不是很快捷

提供两个命令，选中上一个`双引号""`区域和下一个`双引号""`区域命令，快捷键分别为`alt+上方向键`，`alt+下方向键`

## ✨ 功能 4 生成块注释`/** */`

> 替换默认的块注释命令，快捷键仍为`ctrl+shift+/`，默认块注释命令生成`/* */`，替换后生成`/** */`，区别是多了一个`*`

为什么要这样做？因为 `/** */`的块注释写法才能使变量在悬浮或者代码补全时，提供注释说明

## ✨ 功能 5 使用 vscode 打开所在目录(待完善)

> HBuilderX 左侧目录，右击`文件夹`后菜单会多出一项`使用vscode打开所在目录`

需要安装 vscode，vscode 会全局安装一个`code`命令，基于这个`code`命令打开文件夹

基于以下 js，代码很简陋，个人电脑为 windows10，测试没有问题，不知是否存在兼容性问题，欢迎完善该代码

可以使用 nodejs 运行下方代码，进行调试与完善

```js
const process = require('child_process')
// code+文件路径 如C:\\Users
const path = 'C:\\Users'
process.exec('code ' + path, error => {
  // 失败
  if (error) {
    console.log(error)
  }
})
```

## ✨ 功能 6 vue 文件双分栏模式且自动折叠

> 很多时候滚动是不方便的，尤其是 vue 文件需要对照 template 和 script 标签或者对照 template 和 style 标签的时候，这时候就需要分栏，比较常用的还是双分栏，左右对照
>
> 本插件提供右键菜单和快捷键的方式，快速进行双分栏，并按折叠模式自动折叠 `script` ，`template` 和 `style`标签
>
> 当前 vue 文件需要拥有 `script` ，`template` 和 `style` 标签才能体现出效果

### 设计

取消旧版的配置文件中配置折叠模式，改为文件中右键菜单选择`向右复制分栏并自动折叠`，选择二级菜单的折叠模式即可

建议各个折叠模式都尝试一下，应该很容易明白其效果

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

### 自行设置快捷键

HBuilderX 上方菜单>工具>自定义快捷键>右侧加入下方代码并自行配置快捷键即可

对应的 command 名称：

- `foldAllExpandAndCopyEditor` 无折叠模式
- `copyEditorAll` 左分栏不折叠，右分栏则复制三次标签卡，并分别显示 template、script、style 标签
- `contractScriptTag` 左分栏显示 template、style 标签，右分栏显示 script 标签
- `contractNoScriptTag` 左分栏显示 script 标签，右分栏显示 template、style 标签
- `contractStyleTag` 左分栏显示 template、script 标签，右分栏显示 style 标签

```json
{
		"key": "",
		"command": "extension.foldAllExpandAndCopyEditor",
		"override": true
	},
{
		"key": "Ctrl+J",
		"command": "extension.copyEditorAll",
		"override": true
	},
{
		"key": "",
		"command": "extension.contractScriptTag",
		"override": true
	},
{
		"key": "",
		"command": "extension.contractNoScriptTag",
		"override": true
	},
{
		"key": "",
		"command": "extension.contractStyleTag",
		"override": true
	},
```
