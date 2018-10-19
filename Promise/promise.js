/* Promise是一个状态机的机制
 * 初始状态为 pending
 * 成功状态为 fulfilled
 * 失败状态为 rejected
 * 只能从 pending -> fulfilled，或者从 pending -> rejected
 * 且状态一旦转变，就永远不会再变了
 * */

const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

/**
 * new Promise()时接收一个executor函数作为参数，该函数会立即执行
 * 函数中有两个参数，它们也是函数，分别是resolve和reject
 * 函数同步执行一定要放在try...catch中，否则无法进行错误捕获
 * */

function MyPromise(executor) {
    // 构造初始状态
    let self = this
    self.state = PENDING
    self.value = null
    self.reason = null

    // 回调函数数组onFulfilledCallbacks和onRejectedCallbacks，用来存储then()方法中传入的成功和失败回调。
    self.onFulfilledCallbacks = []
    self.onRejectedCallbacks = []

    // resolve()接收Promise成功值value
    // 当用户调用resolve()，修改state状态，并从相应的回调数组中依次取出回调函数执行。
    function resolve(value) {
        if (value instanceof MyPromise) {
            value.then(self.resolve, self.reject)
        }
        //异步执行成功回调
        setTimeout(() => {
            if (self.state === PENDING) {
                self.state = FULFILLED
                self.value = value
                self.onFulfilledCallbacks.forEach(fulfilledCallback => {
                    fulfilledCallback()
                })
            }
        })
    }

    // reject接收Promise失败原因reason
    // 当用户调用reject()，修改state状态，并从相应的回调数组中依次取出回调函数执行。
    function reject(reason) {
        //异步执行失败回调
        setTimeout(() => {
            if (self.state === PENDING) {
                self.state = REJECTED
                self.reason = reason
                self.onRejectedCallbacks.forEach(rejectedCallback => {
                    rejectedCallback()
                })
            }
        })
    }

    try {
        executor(resolve, reject)
    } catch (reason) {
        reject(reason)
    }
}

MyPromise.prototype.then = function(onFulfilled, onRejected) {
    let self = this
    let promise2 = null

    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => {return value}
    onRejected = typeof onRejected === 'function' ? onRejected : reason => {throw reason}

    promise2 = new MyPromise(function(resolve, reject) {
        if (self.state === PENDING) {

            // 传入成功的回调
            self.onFulfilledCallbacks.push(() => {
                try {
                    // 拿到then()方法回调函数的返回值
                    let x = onFulfilled(self.value)
                    self.resolvePromise(promise2, x, resolve, reject)
                } catch(reason) {
                    reject(reason)
                }
            })
    
            // 传入失败的回调
            self.onRejectedCallbacks.push(() => {
                try {
                    // 拿到then()方法回调函数的返回值
                    let x = onRejected(self.reason)
                    self.resolvePromise(promise2, x, resolve, reject)
                } catch(reason) {
                    reject(reason)
                }
            })
        }
    
        if (self.state === FULFILLED) {
            // 规范 2.2.4，保证 onFulfilled，onRjected 异步执行
            // 所以用了 setTimeout 包裹下
            setTimeout(() => {
                try {
                    let x = onFulfilled(self.value)
                    self.resolvePromise(promise2, x, resolve, reject)
                } catch(reason) {
                    reject(reason)
                }
            })
        }
    
        if (self.state === REJECTED) {
            // 规范 2.2.4，保证 onFulfilled，onRjected 异步执行
            // 所以用了 setTimeout 包裹下
            setTimeout(() => {
                try {
                    let x = onRejected(self.reason)
                    self.resolvePromise(promise2, x, resolve, reject)
                } catch(reason) {
                    reject(reason)
                }
            })
        }
    })

    return promise2
}

MyPromise.prototype.resolvePromise = function(promise2, x, resolve, reject) {
    let self = this
    let called = false

    // 规范 2.3.1
    // 如果 promise 和 x 指向同一对象，以 TypeError 为据因拒绝执行 promise
    if (promise2 === x) {
        return reject(new TypeError('循环引用！'))
    }

    // 规范 2.3.2
    // 如果 x 为 Promise，则使 promise 接受 x 的状态
    if (x instanceof MyPromise) {
        // 如果 x 处于等待态， promise 需保持为等待态直至 x 被执行或拒绝
        if (x.state === PENDING) {
            x.then(value => {
                self.resolvePromise(promise2, value, resolve, reject)
            }, reject)
        } else {
            x.then(resolve, reject)
        }
        return
    }

    // 规范 2.3.3
    // x 为对象或函数 如果 x 为对象或者函数
    if (x !== null && (Object.prototype.toString.call(x) === '[object Object]' || Object.prototype.toString.call(x) === '[object Function]')) {
        try {

            let then = x.then

            if (typeof then === 'function') {
                then.call(
                    x,
                    y => {
                        if (called) return
                        called = true
                        self.resolvePromise(promise2, y, resolve, reject)
                    },
                    e => {
                        if (called) return
                        called = true
                        reject(e)
                    }
                )
            } else {
                // x.then存在，且不是函数，则执行resolve
                if (called) return
                called = true
                resolve(x)
            }

        } catch(reason) {
            // 如果取 x.then 的值时抛出错误，则执行reject拒绝promise
            if (called) return
            called = true
            reject(reason)
        }

    } else {
        // 如果 x 不为对象或者函数，以 x 为参数执行 promise
        resolve(x)
    }

}

MyPromise.prototype.catch = function(onRejected) {
    return this.then(null, onRejected);
};

module.exports = MyPromise
