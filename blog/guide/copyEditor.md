# vue 文件双分栏

::: info

- 很多时候滚动是不方便的，尤其是 vue 文件需要对照 template 和 script 标签或者对照 template 和 style 标签的时候，这时候就需要分栏，比较常用的还是双分栏，左右对照
- 插件提供右键菜单和快捷键的方式，快速进行双分栏，并按折叠模式自动折叠 `script` ，`template` 和 `style`标签
- 当前 vue 文件需要拥有 `script` ，`template` 和 `style` 标签才能体现出效果

:::

## 设计

取消旧版的配置文件中配置折叠模式，改为文件中右键菜单选择`向右复制分栏并自动折叠`，选择二级菜单的折叠模式即可

建议各个折叠模式都尝试一下，应该很容易明白其效果

目前现有的折叠模式:

- 无折叠模式（跟 HBuilderX 的`复制标签卡到分栏`命令的区别是：会全部展开当前标签卡后再进行分栏）
- （`强烈推荐`）左分栏不折叠，右分栏则复制三次标签卡，并分别显示 template、script、style 标签
- 左分栏显示 template、style 标签，右分栏显示 script 标签
- 左分栏显示 script 标签，右分栏显示 template、style 标签
- 左分栏显示 template、script 标签，右分栏显示 style 标签

## 快捷键

目前只有第二种折叠方式有快捷键，即左分栏不折叠，右分栏则复制三次标签卡，并分别显示 template、script、style 标签

默认快捷键`ctrl+j`，`ctrl+j`后会在当前 vue 文件右侧打开分栏

## 使用技巧

- 只在左侧分栏中使用分栏命令，右侧分栏中使用分栏命令会在右侧创建新的分栏
- 保存当前标签卡，则所有相同的标签卡都会保存，这时聚焦到右侧分栏，使用 HBuilderX 的命令`关闭所有已保存标签卡`，即可快速关闭分栏（如果右侧分栏的标签卡都保存了）

## 自行设置快捷键

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

 
 <comment/> 
 
 
 <comment/> 
 