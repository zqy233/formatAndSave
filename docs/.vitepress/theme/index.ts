import Theme from "vitepress/theme"

import "../style/vars.css"
// @ts-ignore
import comment from "../components/git-talk.vue"
export default {
  ...Theme,
  enhanceApp(ctx) {
    Theme.enhanceApp(ctx)
    ctx.app.component("git-talk", comment)
  },
}
