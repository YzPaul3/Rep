class Compile {
    constructor(el, vm) {
        this.el = this.isElementNode(el) ? el : document.querySelector(el)
        this.vm = vm

        // 如果元素存在，才开始编译
        if (this.el) {
            // 1.先把真实的DOM移入到内存中
            let fragment = this.node2fragment(this.el)

            // 2.提取带有指令的元素节点（如v-model）和 文本模板节点{{text}}
            this.compile(fragment)

            // 3.编译好的fragment填回页面
            this.el.appendChild(fragment)
        }
    }

    /* 辅助方法 */

    // 是否元素节点
    isElementNode(node) {
        return node.nodeType === 1
    }

    // 是否含v-指令
    isDirective(name) {
        let reg = /^(v-)+/g
        return reg.test(name)
    }

    /* 核心方法 */

    // 将el中的内容全部放到内存中
    node2fragment(el) {
        // 创建文档碎片(内存中的DOM节点)
        let fragment = document.createDocumentFragment()
        let firstChild
        while(firstChild = el.firstChild) {
            fragment.appendChild(firstChild)
        }
        return fragment // 内存中的节点
    }

    // 编译
    compile(fragment) {
        let childNodes = fragment.childNodes
        Array.from(childNodes).forEach(node => {
            if (this.isElementNode(node)) {
                // 元素节点,递归检查
                // 编译元素
                this.compileElement(node)
                this.compile(node)
            } else {
                // 文本节点
                this.compileText(node)
            }
        })
    }

    // 编译元素
    compileElement(node) {
        // 获取元素属性
        let attrs = node.attributes
        Array.from(attrs).forEach(attr => {
            // 判断属性是否包含v-
            let attrName = attr.name
            if (this.isDirective(attrName)) {
                // 取对应的值放入节点中
                let expr = attr.value   // message.msg
                let type = attr.name.slice(2) // model
                // node this.vm.$data expr
                // 执行编译
                CompileUtil[type](node, this.vm, expr)
            }
        })
    }

    // 编译文本
    compileText(node) {
        let text = node.textContent
        let reg = /\{\{([^}]+)\}\}/g
        if (reg.test(text)) {
            // node this.vm.$data text
            CompileUtil['text'](node, this.vm, text)
        }
    }
}

CompileUtil = {
    // 获取实例上对应的数据
    getVal(vm, expr) {
        // expr: 'message.msg'
        expr = expr.split('.')
        // array: ['message', 'msg']
        return expr.reduce((prev, next) => {
            return prev[next]
        }, vm.$data)
    },
    getTextVal(vm, expr) {
        return expr.replace(/\{\{([^}]+)\}\}/g, (...args) => {
            return this.getVal(vm, args[1])
        })
    },
    text(node, vm, expr) {
        let updateFn = this.updater['textUpdater']
        let value = this.getTextVal(vm, expr)
        // {{a}}{{b}}{{c}}
        // 给这个节点的每一个模板添加观察者  {{message.msg}}  {{message.msg1}}
        expr.replace(/\{\{([^}]+)\}\}/g, (...args) => {
            new Watcher(vm, args[1], (newValue) => {
                // 这里是watcher数据变化时的回调
                // 数据变化时,文本节点需要重新获取依赖的属性,更新text文本内容
                updateFn && updateFn(node, this.getTextVal(vm, expr))
            })
        })
        updateFn && updateFn(node, this.getTextVal(vm, expr))
    },
    setVal(vm, expr, value) {
        // 将vm.$data中的expr表达式的值修改为监听input事件中获取到的输入框的值
        // 即：vm.$data.message.msg = 正在input的值
        expr = expr.split('.')
        return expr.reduce((prev, next, currentIndex) => {
            if (currentIndex === expr.length -1) {
                return prev[next] = value
            }
            return prev[next]
        }, vm.$data)
    },
    model(node, vm, expr) {
        let updateFn = this.updater['modelUpdater']
        // 给当前v-model节点添加观察者
        new Watcher(vm, expr, (newValue) => {
            updateFn && updateFn(node, this.getVal(vm, expr))
        })
        node.addEventListener('input', (e) => {
            let newValue = e.target.value
            this.setVal(vm, expr, newValue)
        })
        updateFn && updateFn(node, this.getVal(vm, expr))
    },
    updater: {
        textUpdater(node, value) {
            node.textContent = value
        },
        modelUpdater(node, value) {
            node.value = value
        }
    }
}