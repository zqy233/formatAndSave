# 嵌套注释

## 用法

::: info

- 二次封装注释命令，支持 html 和 css 以及 vue 嵌套注释下进行注释
- 会自动判断所有注释区域，然后分段进行相应注释，解开注释也会进行判断，无需一个个选择解开，选中多个注释区域，一键后会进行分段解开注释
- 快捷键为`ctrl+/`

:::

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

::: tip

顺带修复了，HBuilderX 注释命令开始行和结束行如果不选择完全，注释的位置会出现错误的问题

:::

## 自行设置快捷键

HBuilderX 上方菜单>工具>自定义快捷键>更改插件快捷键

```json
{"key":"Ctrl+/","command":"extension.powerfulComment","override":true }
```


 <git-talk/> 