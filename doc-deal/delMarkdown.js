const fs = require("fs")
const findMarkdown = require("./findMarkdown")
const rootDir = "./blog"

findMarkdown(rootDir, delComponents)

function delComponents(dir) {
  fs.readFile(dir, "utf-8", (err, content) => {
    if (err) throw err

    fs.writeFile(dir, content.replace(/\n \n <git-talk\/> \n /g, ""), err => {
      if (err) throw err
      console.log(`del components from ${dir}`)
    })
  })
}
