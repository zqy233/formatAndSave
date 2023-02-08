import { SearchPlugin } from 'vitepress-plugin-search'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    SearchPlugin({
      placeholder: '搜索内容',
      buttonLabel: '搜索',
      previewLength: 10,
    }),
  ],
})
