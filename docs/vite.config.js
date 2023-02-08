import { SearchPlugin } from 'vitepress-plugin-search'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    SearchPlugin({
      encode: false,
      tokenize: 'full',
      placeholder: '搜索内容',
      buttonLabel: '搜索',
      previewLength: 10,
    }),
  ],
})
