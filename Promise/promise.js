/* Promise是一个状态机的机制
 * 初始状态为 pending
 * 成功状态为 resolved
 * 失败状态为 rejected
 * 只能从 pending -> resolved pending -> rejected
 * 且状态一旦转变，就永远不会再变了
 * */


/**
 * new Promise()时接收一个executor函数作为参数，该函数会立即执行
 * 函数中有两个参数，它们也是函数，分别是resolve和reject
 * 函数同步执行一定要放在try...catch中，否则无法进行错误捕获
 * */

function MyPromise(executor) {
    // 构造初始状态
    let self = this
    self.status = 'pending'
    self.value = undefined
    self.reason = undefined

    // 回调函数数组onFulfilledCallbacks和onRejectedCallbacks，用来存储then()方法中传入的成功和失败回调。
    self.onFulfilledCallbacks = []
    self.onRejectedCallbacks = []

    // resolve()接收Promise成功值value
    // 当用户调用resolve()，修改status状态，并从相应的回调数组中依次取出回调函数执行。
    function resolve(value) {
        if (self.status === 'pending') {
            self.status = 'resolved'
            self.value = value
            self.onFulfilledCallbacks.forEach(fn => {
                fn()
            })
        }
    }

    // reject接收Promise失败原因reason
    // 当用户调用reject()，修改status状态，并从相应的回调数组中依次取出回调函数执行。
    function reject(reason) {
        if (self.status === 'pending') {
            self.status = 'rejected'
            self.reason = reason
            self.onRejectedCallbacks.forEach(fn => {
                fn()
            })
        }
    }

    try {
        executor(resolve, reject)
    } catch (reason) {
        reject(reason)
    }
}

function resolvePromise(promise2, x, resolve, reject) {
    // 规范 2.3.1
    // 如果 promise 和 x 指向同一对象，以 TypeError 为据因拒绝执行 promise
    if (promise2 === x) {
        return reject(new TypeError('循环引用！'))
    }

    let called = false

    // 规范 2.3.3
    // x 为对象或函数 如果 x 为对象或者函数
    if (x !== null && (typeof x === 'object' || typeof x === 'function')) {
        try {
            let then = x.then
            if (typeof then === 'function') {
                then.call(x, y => {
                        if (called) return
                        called = true
                        resolvePromise(promise2, y, resolve, reject)
                    }, e => {
                        if (called) return
                        called = true
                        reject(e)
                    })
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

MyPromise.prototype.then = function(onFulfilled, onRejected) {
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => {return value}
    onRejected = typeof onRejected === 'function' ? onRejected : reason => {throw reason}

    let self = this

    let promise2 = new MyPromise((resolve, reject) => {
        if (self.status === 'pending') {

            // 传入成功的回调
            self.onFulfilledCallbacks.push(() => {
                setTimeout(() => {
                    try {
                        // 拿到then()方法回调函数的返回值
                        let x = onFulfilled(self.value)
                        resolvePromise(promise2, x, resolve, reject)
                    } catch(reason) {
                        reject(reason)
                    }
                }, 0)
            })
    
            // 传入失败的回调
            self.onRejectedCallbacks.push(() => {
                setTimeout(() => {
                    try {
                        // 拿到then()方法回调函数的返回值
                        let x = onRejected(self.reason)
                        resolvePromise(promise2, x, resolve, reject)
                    } catch(reason) {
                        reject(reason)
                    }
                }, 0)
            })
        } else if (self.status === 'resolved') {
            // 规范 2.2.4，保证 onFulfilled，onRjected 异步执行
            // 所以用了 setTimeout 包裹下
            setTimeout(() => {
                try {
                    let x = onFulfilled(self.value)
                    resolvePromise(promise2, x, resolve, reject)
                } catch(reason) {
                    reject(reason)
                }
            }, 0)
        } else if (self.status === 'rejected') {
            // 规范 2.2.4，保证 onFulfilled，onRjected 异步执行
            // 所以用了 setTimeout 包裹下
            setTimeout(() => {
                try {
                    let x = onRejected(self.reason)
                    resolvePromise(promise2, x, resolve, reject)
                } catch(reason) {
                    reject(reason)
                }
            }, 0)
        }
    })

    return promise2
}

// catch方法是.then(null, rejection)的别名，用于指定发生错误时的回调函数
MyPromise.prototype.catch = function(onRejected) {
    return this.then(null, onRejected);
};

// 无论是resolve还是reject，都会走finally方法
MyPromise.prototype.finally = function(cb) {
    return this.then(value => {
        setTimeout(cb, 0)
        return value
    }, reason => {
        setTimeout(cb, 0)
        throw reason
    })
}

MyPromise.prototype.done = function() {
    this.catch((reason) => {
        throw reason;
    });
};

MyPromise.all = function(promiseArr) {
    // Promise.all方法用于将多个 Promise 实例，包装成一个新的 Promise 实例
    return new MyPromise((resolve, reject) => {
        // 结果数组
        let results = []
        promiseArr.forEach((promise, index) => {
            promise.then(value => {
                results[index] = value
                if (results.length === promiseArr.length) {
                    // 返回结果数组
                    resolve(results)
                }
            }, reject)
        })
    })
}

MyPromise.race = function(promiseArr) {
    return new MyPromise((resolve, reject) => {
        promiseArr.forEach((promise, index) => {
            promise.then(value => {
                resolve(value)
            }, reject)
        })
    })
}

// Promise.resolve用来生成一个fulfilled的Promise
MyPromise.resolve = function(value) {
    let promise
    promise = new MyPromise((resolve, reject) => {
        // value有可能是普通值，可能是thenable，可能是另一个Promise，调用resolvePromise进行解析
        resolvePromise(promise, value, resolve, reject)
    })
    return promise
}

// Promise.reject用来生成一个rejected失败态的Promise
MyPromise.reject = function(reason) {
    return new MyPromise((resolve, reject) => {
        reject(reason)
    })
}

MyPromise.defer = MyPromise.deferred = function() {
    let dfd = {};
    dfd.promies = new MyPromise((resolve, reject) => {
      dfd.resolve = resolve;
      dfd.rfeject = reject;
    });
    return dfd;
};

module.exports = MyPromise
