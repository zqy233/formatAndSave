# prettier 格式化

::: tip

基于 prettier 最新版本@2.8.4，支持 prettier 最新配置

感谢 DCloud-HX-WKP 在开发过程中提供了所遇问题的解决方案

:::

## 用法

1. 避免与官方格式化冲突：工具>设置>编辑器设置>取消勾选保存时自动格式化
2. 插件提供一个`ctrl+s`命令，名为`prettier格式化代码`，与 HBuilderX 默认保存命令重复，此时按下`ctrl+s`会出现选择菜单，设置`以后只选一个`为`prettier格式化代码`即可
3. 在任意文件中`ctrl+s`，插件会获取该文件所在项目目录，判断项目根目录下是否存在 prettier 配置文件，如果不存在，则会创建默认 prettier 配置文件（js 配置文件）
4. 如果不想使用插件创建的配置文件，比如之前已有统一团队风格的 prettier 配置文件，可以复制该文件到项目根目录下，插件则不会新建，而是直接使用该配置文件（配置文件无固定后缀名要求，属于 prettier 配置文件即可）

## 与官方 prettier 插件的区别：

官方的 prettier 不支持使用根目录 prettier 配置文件，不方便团队统一风格

## 配置默认不支持的文件类型的格式化

prettier默认支持  `JavaScript`、 `Flow`、 `JSX`、`TypeScript`、 `TSX`、 `JSON.stringify`、`JSON`、`JSON with Comments`、`JSON5`、`CSS`、`PostCSS`、`ess`、`SCSS`、`Handlebars`、`GraphQL`、`Markdown`、`MDX`、`Angular`、`HTML`、`Lightning Web Components`、`Vue`、`YAML`

### 安装插件

对于不默认支持格式化的文件类型，需要安装prettier插件，并在配置文件中配置`plugins`属性

比如想要格式化java和xml文件，使用node安装prettier插件（对应语言插件请查看下方插件列表）

```js
npm i -D prettier-plugin-java prettier-plugin-xml
```

### plugins支持绝对路径

可以使用绝对路径让prettier找到它的插件（可以单独使用一个文件夹存放所有插件，避免重复安装）

.prettierrc.js设置如下

```js
  plugins: [
        'D:/uniapp-projects/示例项目/node_modules/prettier-plugin-java',
        'D:/uniapp-projects/示例项目/node_modules/prettier-plugin-xml',
    ],
```

### 相对路径

.prettierrc.js设置如下

```js
  plugins: [
        './node_modules/prettier-plugin-java',
        './node_modules/prettier-plugin-xml',
    ],
```

现在prettier可以正常格式化java、xml文件了

### 插件列表

#### 官方插件

- [`@prettier/plugin-php`](https://github.com/prettier/plugin-php)
- [`@prettier/plugin-pug`](https://github.com/prettier/plugin-pug) by [**@Shinigami92**](https://github.com/Shinigami92)
- [`@prettier/plugin-ruby`](https://github.com/prettier/plugin-ruby)
- [`@prettier/plugin-xml`](https://github.com/prettier/plugin-xml)

#### 社区插件

- [`prettier-plugin-apex`](https://github.com/dangmai/prettier-plugin-apex) by [**@dangmai**](https://github.com/dangmai)
- [`prettier-plugin-astro`](https://github.com/withastro/prettier-plugin-astro) by [**@withastro contributors**](https://github.com/withastro/prettier-plugin-astro/graphs/contributors)
- [`prettier-plugin-elm`](https://github.com/gicentre/prettier-plugin-elm) by [**@giCentre**](https://github.com/gicentre)
- [`prettier-plugin-erb`](https://github.com/adamzapasnik/prettier-plugin-erb) by [**@adamzapasnik**](https://github.com/adamzapasnik)
- [`prettier-plugin-glsl`](https://github.com/NaridaL/glsl-language-toolkit/tree/main/packages/prettier-plugin-glsl) by [**@NaridaL**](https://github.com/NaridaL)
- [`prettier-plugin-go-template`](https://github.com/NiklasPor/prettier-plugin-go-template) by [**@NiklasPor**](https://github.com/NiklasPor)
- [`prettier-plugin-java`](https://github.com/jhipster/prettier-java) by [**@JHipster**](https://github.com/jhipster)
- [`prettier-plugin-jsonata`](https://github.com/Stedi/prettier-plugin-jsonata) by [**@Stedi**](https://github.com/Stedi)
- [`prettier-plugin-kotlin`](https://github.com/Angry-Potato/prettier-plugin-kotlin) by [**@Angry-Potato**](https://github.com/Angry-Potato)
- [`prettier-plugin-motoko`](https://github.com/dfinity/prettier-plugin-motoko) by [**@dfinity**](https://github.com/dfinity)
- [`prettier-plugin-nginx`](https://github.com/joedeandev/prettier-plugin-nginx) by [**@joedeandev**](https://github.com/joedeandev)
- [`prettier-plugin-prisma`](https://github.com/umidbekk/prettier-plugin-prisma) by [**@umidbekk**](https://github.com/umidbekk)
- [`prettier-plugin-properties`](https://github.com/eemeli/prettier-plugin-properties) by [**@eemeli**](https://github.com/eemeli)
- [`prettier-plugin-sh`](https://github.com/un-ts/prettier/tree/master/packages/sh) by [**@JounQin**](https://github.com/JounQin)
- [`prettier-plugin-sql`](https://github.com/un-ts/prettier/tree/master/packages/sql) by [**@JounQin**](https://github.com/JounQin)
- [`prettier-plugin-sql-cst`](https://github.com/nene/prettier-plugin-sql-cst) by [**@nene**](https://github.com/nene)
- [`prettier-plugin-solidity`](https://github.com/prettier-solidity/prettier-plugin-solidity) by [**@mattiaerre**](https://github.com/mattiaerre)
- [`prettier-plugin-svelte`](https://github.com/UnwrittenFun/prettier-plugin-svelte) by [**@UnwrittenFun**](https://github.com/UnwrittenFun)
- [`prettier-plugin-toml`](https://github.com/bd82/toml-tools/tree/master/packages/prettier-plugin-toml) by [**@bd82**](https://github.com/bd82)

## 自行设置快捷键

HBuilderX 上方菜单>工具>自定义快捷键>更改插件快捷键

```json
{ "key": "Ctrl+S", "command": "extension.prettier", "override": true }
```

## 旧版本(0.0.14 之前)`formatAndSave`命令迁移

1. 如果使用的是旧版本的`formatAndSave`命令，HBuilderX 上方菜单>工具>自定义快捷键>删除以下代码

   ```json
   { "key": "ctrl+s", "command": "extension.formatAndSave", "override": true }
   ```

2. 任意文件中按下`ctrl+s`设置`以后只选一个`为`prettier格式化代码`，工具>自定义快捷键>将会自动生成下方代码

   ```json
   { "key": "ctrl+s", "command": "extension.prettier", "override": true }
   ```

## 为什么不使用[onWillSaveTextDocument](https://hx.dcloud.net.cn/ExtensionDocs/Api/workspace/onWillSaveTextDocument?id=onwillsavetextdocument)

HBuilderX 插件开发提供了保存事件`onWillSaveTextDocument`，为什么不使用该事件触发格式化，而是创建一个`ctrl+s`命令来替换 HBuilderX 默认保存命令？

因为该事件只有编辑后保存才会触发，文件未发生更改情况下不会触发 

<git-talk/>
