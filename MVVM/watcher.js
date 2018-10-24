// 给需要变化的元素v-xxx,{{}}添加观察者，当数据变化时
class Watcher{
    constructor(vm, expr, cb) {
        this.vm = vm
        this.expr = expr
        this.cb = cb

        this.value = this.get()
    }

    getVal(vm, expr) {
        // 获取实例上对应的数据 比如message.msg的值
        expr = expr.split('.')
        return expr.reduce((prev, next) => {
            return prev[next]
        }, vm.$data)
    }

    get() {
        Dep.target = this
        let value = this.getVal(this.vm, this.expr)
        Dep.target = null
        return value
    }

    update() {
        let newValue = this.getVal(this.vm, this.expr)
        let oldValue = this.value
        if (newValue !== oldValue) {
            // 对应watch的callback
            this.cb(newValue)
        }
    }
}