class Observer {
    constructor(data) {
        this.observe(data)
    }

    observe(data) {
        if (!data || typeof data !== 'object') {
            return
        }

        // 劫持data对象属性
        Object.keys(data).forEach(key => {
            this.defineReactive(data, key, data[key])
            this.observe(data[key])
        })
    }

    defineReactive(obj, key, value) {
        let _this = this
        let dep = new Dep() // 每个变化的数据，都会有一个订阅数组，存放所有观察这个数据的元素
        Object.defineProperty(obj, key, {
            enumerable: true,
            configurable: true,
            get () {
                Dep.target && dep.addSub(Dep.target)
                return value
            },
            set (newValue) {
                if (newValue !== value) {
                    _this.observe(newValue)
                    value = newValue
                    dep.notify()
                }
            }
        })
    }
}

class Dep {
    constructor() {
        // 订阅数组
        this.subs = []
    }

    addSub(watcher) {
        this.subs.push(watcher)
    }

    notify() {
        this.subs.forEach(watcher => watcher.update())
    }
}