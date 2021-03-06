class MVVM {
    constructor(options) {
        this.$el = options.el
        this.$data = options.data

        if (this.$el) {

            // 数据劫持
            new Observer(this.$data)

            // 代理vm.$data的数据到vm上
            this.proxyData(this.$data)

            // 编译模板
            new Compile(this.$el, this)
        }
    }
    proxyData(data) {
        Object.keys(data).forEach(key => {
            Object.defineProperty(this, key, {
                get() {
                    return data[key]
                },
                set(newValue) {
                    data[key] = newValue
                }
            })
        })
    }
}