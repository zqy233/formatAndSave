# 快速选中双引号区域

> vue 代码开发很多时候都需要在`双引号""`区域内写代码，这种时候一般只能用鼠标来移动光标，不是很快捷

## 用法

提供两个命令，选中上一个`双引号""`区域和下一个`双引号""`区域命令，快捷键分别为`alt+上方向键`，`alt+下方向键`

## 自行设置快捷键

HBuilderX 上方菜单>工具>自定义快捷键>更改插件快捷键

```json
{"key":"Alt+Up","command":"extension.jumpLastQuote","override":true },
{"key":"Alt+Down","command":"extension.jumpNextQuote","override":true }
```

 <git-talk/> 