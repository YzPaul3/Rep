console.log(1)

setTimeout(() => {
    console.log(2)
    new Promise(resolve => {
        console.log(4)
        resolve()
    }).then(() => {
        console.log(5)
    })
    process.nextTick(() => {
        console.log(3)
    })
})

new Promise(resolve => {
    console.log(7)
    resolve()
}).then(() => {
    console.log(8)
})

process.nextTick(() => {
    console.log(6)
})

// 在node环境中 1 7 6 8 2 4 3 5

// macrotask : setTimeout, setInterval, setImmediate, I/O, UI交互, XHR
// microtask : Promise, process.nextTick, MutationObserver