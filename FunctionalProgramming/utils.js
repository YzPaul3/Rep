// 一元运算
// 接受一个给定的多参数函数，转换为只接受一个参数的函数

const unary = fn => fn.length === 1 ? fn() : (arg) => fn(arg)

let arr = ['1', '2', '3']
let ans = arr.map(unary(parseInt))
console.log(ans)

// once函数
// 只运行一次给定的函数

const once = (fn) => {
    let done = false
    return () => done ? undefined : (done = true, fn.apply(this, arguments))
}

let doPay = once(() => {
    console.log('do pay')
})
doPay()
doPay()


// 记录函数的计算结果
const memoized = (fn) => {
    const hashTable = {}
    return arg => hashTable[arg] || (hashTable[arg] = fn(arg))
}

let factorial = memoized(n => {
    if (n === 0) {
        return 1
    }
    return n * factorial(n - 1)
})

let a = factorial(5)
let b = factorial(6)
console.log(a)
console.log(b)



