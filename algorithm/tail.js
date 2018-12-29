function fib(n) {
    let a = 1, b = 1
    for (let i = 2; i<= n; i++) {
        [b, a] = [a+b, b]
        // temp = b
        // b = a + b
        // a = temp
    }
    return b
}

function fibT(n, a=1, b=1) {
    if (n <= 1) return b
    return fibT(n-1, b, a+b)
}

console.log(fibT(4))

// 1, 1, 2, 3, 5, 8