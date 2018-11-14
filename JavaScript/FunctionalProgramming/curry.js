// 柯里化是把一个 多参数函数 转换为 一个嵌套的 一元函数 的过程

const curryAdd = x => y => x + y

const curry2 = fn => x => y => fn(x, y)
const add = (x, y) => x + y

// console.log(curryAdd(3)(4))
// console.log(curry2(add)(3)(4))


const multiply = (x, y, z, a, b) => x * y * z * a * b

// curry 函数
const curry = fn => {
    if (typeof fn !== 'function') {
        throw Error('no function provided')
    }
    return curriedFn = (...args) => {
        // fn.length 函数的参数列表的长度 5
        if (args.length < fn.length) {
            return function () {
                console.log(args, [].slice.call(arguments))
                // [ 1 ] [ 2 ]
                // [ 1, 2 ] [ 3 ]
                // [ 1, 2, 3 ] [ 4 ]
                // [ 1, 2, 3, 4 ] [ 5 ]
                return curriedFn.apply(null, args.concat([].slice.call(arguments)))
            }
        }
        // [1, 2, 3, 4, 5]
        return fn.apply(null, args)
    }
}

console.log(curry(multiply)(1)(2)(3)(4)(5))

const myCurry = (fn) => {
    if (typeof fn !== 'function') {
        throw Error('No function provided')
    }
    return curriedFn = (...args) => {
        if (args.length < fn.length) {
            return function () {
                return curriedFn.apply(null, args.concat([].slice.call(arguments)))
            }
        }
        return fn.apply(null, args)
    }
}

console.log(myCurry(multiply)(1)(2)(3)(4)(5))
