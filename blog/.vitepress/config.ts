import { defineConfig } from "vitepress"
import { version } from "../../package.json"

const currentVersion = `v${version}`

export default defineConfig({
  base: "/formatAndSave/",
  outDir: "../docs",
  title: "formatAndSave",
  description: "HBuilderX插件-主要功能：嵌套注释、vue文件双分栏并自动折叠",
  head: [["link", { rel: "icon", href: "/formatAndSave/favicon.ico" }]],
  lastUpdated: true,
  markdown: {
    lineNumbers: true,
    // https://github.com/shikijs/shiki/blob/main/docs/themes.md#all-themes
    theme: "one-dark-pro",
  },
  themeConfig: {
    logo: {
      light: "/logo-light.svg",
      dark: "/logo-dark.svg",
    },
    footer: {
      message: "Released under the MIT License.",
      copyright: `Copyright © 2022.4-${new Date().getFullYear()}.${new Date().getMonth() + 1}`,
    },
    editLink: {
      pattern: "https://github.com/zqy233/formatAndSave/edit/master/blog/:path",
      text: "Edit this page on GitHub",
    },
    socialLinks: [
      {
        icon: "github",
        link: "https://github.com/zqy233/formatAndSave",
      },
    ],
    nav: [
      {
        text: "安装",
        link: "/guide/start",
        activeMatch: "/guide/start",
      },
      {
        text: "指南",
        items: [
          {
            text: "一键格式化与保存",
            link: "/guide/formatAndSave",
            activeMatch: "/guide/formatAndSave",
          },
          {
            text: "嵌套注释",
            link: "/guide/powerfulComment",
            activeMatch: "/guide/powerfulComment",
          },
          {
            text: "快速选中双引号区域",
            link: "/guide/jumpQuote",
            activeMatch: "/guide/jumpQuote",
          },
          {
            text: "生成块注释/** */",
            link: "/guide/blockComment",
            activeMatch: "/guide/blockComment",
          },
          {
            text: "使用vscode打开所在目录(待完善)",
            link: "/guide/openWithVscode",
            activeMatch: "/guide/openWithVscode",
          },
          {
            text: "vue文件双分栏模式且自动折叠",
            link: "/guide/copyEditor",
            activeMatch: "/guide/copyEditor",
          },
        ],
      },
      {
        text: currentVersion,
        items: [
          {
            text: "Versions",
            items: [
              {
                text: `${currentVersion} (Current)`,
                activeMatch: "/update/versions",
                link: "/update/versions",
              },
            ],
          },
        ],
      },
    ],
    sidebar: {
      "/": [
        {
          text: "起步",
          items: [
            {
              text: "安装",
              link: "/guide/start",
            },
          ],
        },
        {
          text: "功能",
          items: [
            {
              text: "一键格式化与保存",
              link: "/guide/formatAndSave",
            },
            {
              text: "嵌套注释",
              link: "/guide/powerfulComment",
            },
            {
              text: "快速选中双引号区域",
              link: "/guide/jumpQuote",
            },
            {
              text: "生成块注释/** */",
              link: "/guide/blockComment",
            },
            {
              text: "使用vscode打开所在目录(待完善)",
              link: "/guide/openWithVscode",
            },
            {
              text: "vue文件双分栏模式且自动折叠",
              link: "/guide/copyEditor",
            },
          ],
        },
        {
          text: "更新",
          items: [
            {
              text: "版本说明",
              link: "/update/versions",
            },
          ],
        },
      ],
    },
  },
})
