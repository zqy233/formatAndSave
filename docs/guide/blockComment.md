# 生成块注释`/** */`

## 用法

- 替换默认的块注释命令，快捷键仍为`ctrl+shift+/`
- 默认块注释命令生成`/* */`，替换后生成`/** */`，区别是多了一个`*`

为什么要这样做？因为 `/** */`的块注释写法才能使变量在悬浮或者代码补全时，提供注释说明

## 自行设置快捷键

HBuilderX 上方菜单>工具>自定义快捷键>更改插件快捷键

```json
{"key":"Ctrl+Shift+/","command":"extension.blockComment","override":true }
```


 <git-talk/> 