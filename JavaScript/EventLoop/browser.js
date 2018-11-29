console.log(1)

setTimeout(() => {
    console.log(2)
    new Promise(resolve => {
        console.log(4)
        resolve()
    }).then(() => {
        console.log(5)
    })
})

new Promise(resolve => {
    console.log(7)
    resolve()
}).then(() => {
    console.log(8)
})

setTimeout(() => {
    console.log(9)
    new Promise(resolve => {
        console.log(11)
        resolve()
    }).then(() => {
        console.log(12)
    })
})

// 浏览器中 1 7 8 2 4 5 9 11 12
// 同步运行的代码首先输出：1、7
// 接着，清空microtask队列：8
// 第一个task执行：2、4
// 接着，清空microtask队列：5
// 第二个task执行：9、11
// 接着，清空microtask队列：12
