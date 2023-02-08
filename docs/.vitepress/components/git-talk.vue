<template>
  <div class="gitalk-container">
    <div id="gitalk-container"></div>
  </div>
</template>
<script>
import md5 from 'md5'
import Gitalk from 'gitalk'
import 'gitalk/dist/gitalk.css'
export default {
  name: 'git-talk',
  data() {
    return {}
  },
  mounted() {
    const commentConfig = {
      clientID: '78686285d8658a54cb56',
      clientSecret: 'f043ca435bfd63ce0b5a204fe56c008acd6c06f3',
      repo: 'formatAndSave',
      owner: 'zqy233',
      admin: ['zqy233'],
      id: md5(location.pathname),
      distractionFreeMode: false,
    }
    const gitalk = new Gitalk(commentConfig)
    gitalk.render('gitalk-container')
  },
}
</script>
<style>
.gt-container .gt-header-textarea {
  color: #000;
}
.dark .gt-container .gt-header-textarea {
  background-color: #1a1a1a;
}
.dark .gt-container .gt-header-preview {
  background-color: #1a1a1a;
  color: #fff;
}
.dark .gt-container .gt-header-textarea {
  color: #fff;
}
.dark .gt-container .gt-comment-admin .gt-comment-content {
  background-color: #1a1a1a;
}
.dark .gt-container .gt-comment-body {
  color: #fff !important;
}
</style>
