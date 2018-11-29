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

setTimeout(() => {
    console.log(9)
    process.nextTick(() => {
        console.log(10)
    })
    new Promise(resolve => {
        console.log(11)
        resolve()
    }).then(() => {
        console.log(12)
    })
})

// 1 7 6 8 2 4 9 11 3 10 5 12

// 由于两个setTimeout延时相同，被合并入了同一个expired timers queue，而一起执行了。
// 所以，只要将第二个setTimeout的延时改成超过2ms（1ms无效），就可以保证这两个setTimeout不会同时过期，也能够保证输出结果的一致性。