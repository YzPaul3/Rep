var fs = require('fs')

fs.readFile(__filename, () => {
  setTimeout(() => {
    console.log('timeout')
  }, 0)
  setImmediate(() => {
    console.log('immediate')
  })
})

// 如果两者都在主模块中调用，那么执行先后取决于进程性能，也就是随机。
// 如果两者都不在主模块调用（被一个异步操作包裹），那么setImmediate的回调永远先执行。