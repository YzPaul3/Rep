class EventEmitter {
    constructor() {
        this.cbs = {}
    }

    on (eventName, func) {
        if (this.cbs[eventName]) {
            this.cbs[eventName].push(func) 
        } else {
            this.cbs[eventName] = [func]
        }
    }

    emit (eventName, ...args) {
        let fns = this.cbs[eventName] || []
        fns.forEach(fn => {
            fn.apply(this, args)
        })
    }

    off (eventName, func) {
        if (this.cbs[eventName]) {
            this.cbs[eventName].splice(this.cbs[eventName].indexOf(func), 1)
        }
    }
}

const emitter = new EventEmitter()
const sayHi = (name) => console.log(`Hello ${name}`)
const sayHi2 = (name) => console.log(`Good night, ${name}`)

emitter.on('hi', sayHi)
emitter.on('hi', sayHi2)
emitter.emit('hi', 'ScriptOJ')
// => Hello ScriptOJ
// => Good night, ScriptOJ

emitter.off('hi', sayHi)
emitter.emit('hi', 'ScriptOJ')
// => Good night, ScriptOJ
