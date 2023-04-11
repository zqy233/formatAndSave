# 嵌套注释

## 用法

::: info

- 二次封装注释命令，使注释更强大，支持 html 和 css 以及 vue 嵌套注释下进行注释
- 会自动判断所有注释区域，然后分段进行相应注释，解开注释也会进行判断，无需一个个选择解开，全选多个注释区域，一键后会进行分段解开注释
- 快捷键为`ctrl+/`，在任意文件中按下`ctrl+/`会出现选择菜单，设置`以后只选一个`为`嵌套注释`

:::

## 什么是嵌套注释

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

## 不需要完整选择

HBuilderX 注释命令开始行和结束行如果不选择完全，注释的位置会出现错误

而嵌套注释不需要完整选中，只需选中开始行和结束行的非空白字符，即可完成开始行到结束行的注释

解开注释同样不需要完整选择

```html
<!-- <scroll-view scroll-x="true">
  <view class="scroll-inner"> -->
<!-- <image v-for="item in imgList" :key="item.id" :src="item.imageUrl" mode="aspectFill"></image> -->
<!-- </view>
</scroll-view> -->
```

比如上方这段代码，选择第三行末尾和第四行开始位置，不需要完整选择也可解开这两段的注释

```html
image> -->
<!-- </view
```

```html
<!-- <scroll-view scroll-x="true">
  <view class="scroll-inner"> -->
 <image v-for="item in imgList" :key="item.id" :src="item.imageUrl" mode="aspectFill"></image> 
 </view>
</scroll-view> 
```

## 支持多光标情况

HBuilderX支持多光标，`按住ctrl+鼠标左键`可以添加新光标，嵌套注释同样支持多光标情况下正确处理

## 自行设置快捷键

HBuilderX 上方菜单>工具>自定义快捷键>更改插件快捷键

```json
{ "key": "Ctrl+/", "command": "extension.powerfulComment", "override": true }
```

 <git-talk/>
