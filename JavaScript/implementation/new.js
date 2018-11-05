function _new() {
    // 获取第一个参数，即构造函数
    var constructor = Array.prototype.shift.call(arguments)
    if(typeof constructor !== 'function') {
        throw new Error('the first param must be a function')
    }
    // 实现方式A
    var instance = {}
    instance.__proto__ = constructor.prototype

    // 实现方式B
    // var instance = Object.create(constructor.prototype)


    // 如果构造函数有返回值，且返回值是object，则直接返回执行构造函数的返回值，否则返回新生成的实例对象
    var temp = constructor.apply(instance, arguments)
    return (typeof temp === 'object' && temp !== null) ? temp : instance 
}


function ClassA(name, age) {
    this.name = name
    this.age = age
    return {
        a: 1
    }
}
ClassA.prototype.say = function() {
    console.log(this.name)
}
var a = _new(ClassA, 'tiny', '6')

console.log(a)
console.log(a.__proto__)
