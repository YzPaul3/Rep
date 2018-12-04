// compose 可以把类似于 f(g(h(x))) 这种写法简化成 compose(f, g, h)(x)

const compose = (...args) => init => args.reduceRight((prev, curr) => curr(prev), init)

const add1 = (x) => x + 1
const mul3 = (x) => x * 3
const div2 = (x) => x / 2

const operate = compose(div2, mul3, add1, add1)