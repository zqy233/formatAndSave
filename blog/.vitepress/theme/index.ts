import Theme from "vitepress/theme"

import "../style/vars.css"
// @ts-ignore
import comment from "../components/comment/comment.vue"
export default {
  ...Theme,
  enhanceApp(ctx) {
    ctx.app.component("comment", comment)
  },
}
