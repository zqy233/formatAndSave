import{_ as e,c as t,o,a}from"./app.e229c15a.js";const h=JSON.parse('{"title":"一键格式化与保存","description":"","frontmatter":{},"headers":[],"relativePath":"guide/formatAndSave.md","lastUpdated":1671255719000}'),c={name:"guide/formatAndSave.md"},d=a('<h1 id="一键格式化与保存" tabindex="-1">一键格式化与保存 <a class="header-anchor" href="#一键格式化与保存" aria-hidden="true">#</a></h1><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>新版 HBuilderX 现支持保存时自动格式化，可以在工具&gt;设置&gt;编辑器设置&gt;勾选保存时自动格式化</p><p>但这个配置是先保存后格式化，文件未发生更改的情况下，ctrl+s 不会触发格式化</p></div><ol><li>插件提供一个<code>重排代码格式并保存</code>命令，先格式化再保存，快捷键为<code>ctrl+s</code></li><li>该快捷键会与默认的保存快捷键重复，这时会出现选择菜单，可以设置<code>以后只选一个</code>为<code>重排代码格式并保存</code>命令</li><li>请放心，该命令本质上就是先后调用格式化命令和保存命令</li><li>如不想使用这个命令，设置<code>以后只选一个</code>为默认命令即可</li></ol>',3),s=[d];function i(r,l,_,n,p,m){return o(),t("div",null,s)}const u=e(c,[["render",i]]);export{h as __pageData,u as default};
