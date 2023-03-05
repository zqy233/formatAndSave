# prettier 格式化

::: tip

基于 prettier 最新版本@2.8.4，支持 prettier 最新配置

感谢 DCloud-HX-WKP 在开发过程中提供了所遇问题的解决方案

:::

## 用法

1. 避免与官方格式化冲突：工具>设置>编辑器设置>取消勾选保存时自动格式化
2. 插件提供一个`ctrl+s`命令，名为`prettier格式化代码`，与 HBuilderX 默认保存命令重复，在任意文件中按下`ctrl+s`会出现选择菜单，设置`以后只选一个`为`prettier格式化代码`
3. 接下来就直接使用`ctrl+s`就可以了，会使用 prettier 格式化代码并在格式化后保存

## 插件如何工作

1. 在任意文件中`ctrl+s`，插件会获取该文件所在项目目录，判断项目根目录下是否存在 prettier 配置文件、是否存在 prettier 格式化的忽略文件`.prettierignore`，如果不存在，则会在根目录创建默认的`.prettierrc.js`和`.prettierignore`，插件会基于这两个文件进行格式化
2. 因为是基于配置文件格式化，所以允许不同项目之间配置文件配置不同，进行不同配置的格式化，互不影响
3. 如果不想使用插件创建的配置文件，比如之前已有统一团队风格的 prettier 配置文件，可以复制该文件到项目根目录下，插件则不会新建，而是直接使用该配置文件（配置文件无固定后缀名要求，属于 prettier 配置文件即可）
4. 如果所要格式化的文件不在 HBuilderX 左侧目录的项目中，会使用 prettier 默认配置进行格式化

## 与官方 prettier 插件的区别：

官方的 prettier 不支持使用根目录 prettier 配置文件，不方便团队统一风格

## `.prettierignore`忽略文件

`.prettierignore`指定哪些文件或文件目录忽略 prettier 的格式化

插件默认生成的`.prettierignore`内容是`uni_modules`，表示该目录下的所有文件 prettier 会忽略，在这些文件中`ctrl+s`不会进行格式化

## prettier 转换.editorconfig 配置

> 插件支持.editorconfig 转换：prettier 会转换.editorconfig 的一些配置属性为 prettier 相应的配置属性

目前 prettier 支持转换的.editorconfig 配置属性

```json
[*]
indent_style = space
indent_size = 4
max_line_length = 80
end_of_line = lf
```

对应转换成的 prettier 配置属性

```js
{ useTabs: false, tabWidth: 4, printWidth: 80, endOfLine: 'lf' }
```

## 配置默认不支持的文件类型的格式化

prettier 默认支持 `JavaScript`、 `Flow`、 `JSX`、`TypeScript`、 `TSX`、 `JSON.stringify`、`JSON`、`JSON with Comments`、`JSON5`、`CSS`、`PostCSS`、`ess`、`SCSS`、`Handlebars`、`GraphQL`、`Markdown`、`MDX`、`Angular`、`HTML`、`Lightning Web Components`、`Vue`、`YAML`

### 安装插件

对于不默认支持格式化的文件类型，需要安装 prettier 插件，并在配置文件中配置`plugins`属性

比如想要格式化 java 和 xml 文件，使用 node 安装 prettier 插件（对应语言插件请查看下方插件列表）

```js
npm i -D prettier-plugin-java prettier-plugin-xml
```

### plugins 支持绝对路径

可以使用绝对路径让 prettier 找到它的插件（可以单独使用一个文件夹存放所有插件，避免重复安装）

.prettierrc.js 设置如下

```js
  plugins: [
        'D:/uniapp-projects/示例项目/node_modules/prettier-plugin-java',
        'D:/uniapp-projects/示例项目/node_modules/prettier-plugin-xml',
    ],
```

### 相对路径

.prettierrc.js 设置如下

```js
  plugins: [
        './node_modules/prettier-plugin-java',
        './node_modules/prettier-plugin-xml',
    ],
```

现在 prettier 可以正常格式化 java、xml 文件了

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
