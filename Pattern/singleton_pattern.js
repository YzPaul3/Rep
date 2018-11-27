// Singleton(单例) 是一个只能实例化一次的对象。
// 如果不存在，则单例模式会创建类的新实例。 
// 如果存在实例，则它只返回对该对象的引用。 
// 对构造函数的任何重复调用总是会获取相同的对象。

// JavaScript 一直支持单例模式。 我们只是不称他们为单例，我们称之为 对象字面量。

// 通过构造函数实现
let instance = null
function User () {
    if (instance) {
        return instance
    }
    instance = this
    this.name = 'insname'

    console.log(instance)
    return instance
}

const user1 = new User()
const user2 = new User()
 
// true
console.log(user1 === user2)

// 模块实现

const singleton = (function () {
    let instance

    function init() {
        return {
            name: 'insname'
        }
    }

    return {
        getInstance: function() {
            if (!instance) {
                instance = init()
            }

            return instance
        }
    }

})()

const instanceA = singleton.getInstance()
const instanceB = singleton.getInstance()
 
// true
console.log(instanceA === instanceB)


