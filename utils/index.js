// 整理个人代码，不用于实际应用

export function () {
  // 每行去除注释符
  return item.replace("<!--", "").replace("-->", "")

  // 替换编辑器文本
  activeEditor.edit(editBuilder => {
    editBuilder.replace(activeEditor.selection, newStr.join("\r"));
  });

  // 光标选中区域
  activeEditor.setSelection(positions[index] + 1, positions[index + 1])

  // 如果选中文本包含注释,分为两种情况：完整包含注释，不完整包含注释，分别用1，2表示
  // let commetStart = 0
  // selectionArr.forEach((item,index)=>{
  //   if(item.includes("<!--")){
  //     commetStart = 1
  //   }
  //   if(item.includes("-->")){
  //     commetStart = 2
  //   }
  // })
  // let newStr = selectionArr.map(item => {
  //   console.log(item, item.includes("<!--") >= 0);

  //   // 每行都加上注释符
  //   else {
  //     const start = item.lastIndexOf("\t")
  //     if (start < 0) {
  //       return "<!-- " + item + " -->"
  //     }
  //     return item.slice(0, start + 1) + "<!-- " + item.slice(start + 1) + " -->"
  //   }
  // })
}
