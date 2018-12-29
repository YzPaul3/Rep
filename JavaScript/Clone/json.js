let a = {
    age: undefined,
    sex: Symbol('male'),
    jobs: function() {},
    name: 'yck'
  }
let b = JSON.parse(JSON.stringify(a))
console.log(b) // {name: "yck"}

// 会忽略 undefined
// 会忽略 symbol
// 不能序列化函数
// 不能解决循环引用的对象