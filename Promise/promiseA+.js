function MyPromise(executor) {
    let self = this;
    self.status = 'pending';
    self.value = undefined;
    self.reason = undefined;
    self.onResolvedCallback = [];
    self.onRejectedCallback = [];
  
    function resolve(value) {
      if (self.status === 'pending') {
        self.status = 'resolved';
        self.value = value;
  
        self.onResolvedCallback.forEach((fn) => {
          fn();
        });
      }
    }
  
    function reject(reason) {
      if (self.status === 'pending') {
        self.status = 'rejected';
        self.reason = reason;
  
        self.onRejectedCallback.forEach((fn) => {
          fn();
        });
      }
    }
  
    try {
      // 所有回调函数的执行都要放到try..catch中，因为不是自己的代码有可能会出错
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }
  
  function resolveMyPromise(promise2, x, resolve, reject) {
    if (promise2 === x) {
      return reject(new TypeError('循环引用'));
    }
  
    let called = false;
  
    if (x !== null && (typeof x === 'object' || typeof x === 'function')) {
      try {
        let then = x.then;
        if (typeof then === 'function') {
          // 是thenable函数，符合MyPromise要求
          then.call(x, (y) => {
            // 返回值y有可能还是MyPromise，也有可能是普通值，所以这里继续递归进行resolveMyPromise
            // 直到最后x是非thenable值，然后resolve(x)
            if (called) return;
            called = true;
            resolveMyPromise(promise2, y, resolve, reject);
          }, (error) => {
            if (called) return;
            called = true;
            reject(error);
          });
        } else {
          if (called) return;
          called = true;
          // 是对象或者函数，但没有thenable，直接返回
          resolve(x);
        }
      } catch (error) {
        if (called) return;
        called = true;
        reject(error);
      }
    } else {
      // x是普通值
      resolve(x);
    }
  }
  
  MyPromise.prototype.then = function(onFuifilled, onRejected) {
    onFuifilled = typeof onFuifilled === 'function' ? onFuifilled : value => {
      return value;
    };
    onRejected = typeof onRejected === 'function' ? onRejected : reason => {
      throw reason;
    };
  
    let self = this;
  
    // then的返回值也是个promise
    let promise2 = new MyPromise((resolve, reject) => {
      if (self.status === 'pending') {
        self.onResolvedCallback.push(() => {
          setTimeout(() => {
            // 所有回调函数的执行都要放到try..catch中，因为不是自己的代码有可能会出错
            try {
              let x = onFuifilled(self.value);
              resolveMyPromise(promise2, x, resolve, reject);
            } catch (error) {
              reject(error);
            }
          }, 0);
        });
        self.onRejectedCallback.push(() => {
          setTimeout(() => {
            try {
              let x = onRejected(self.reason);
              resolveMyPromise(promise2, x, resolve, reject);
            } catch (error) {
              reject(error);
            }
          }, 0);
        });
      } else if (self.status === 'resolved') {
        setTimeout(() => {
          try {
            let x = onFuifilled(self.value);
            resolveMyPromise(promise2, x, resolve, reject);
          } catch (error) {
            reject(error);
          }
        }, 0);
      } else if (self.status === 'rejected') {
        setTimeout(() => {
          try {
            let x = onRejected(self.reason);
            resolveMyPromise(promise2, x, resolve, reject);
          } catch (error) {
            reject(error);
          }
        }, 0);
      }
    });
    
    return promise2;
  };
  
  MyPromise.prototype.catch = function(onRejected) {
    return this.then(null, onRejected);
  };
  
  MyPromise.prototype.finally = function(fn) {
    return this.then((data) => {
      setTimeout(fn, 0);
      return data;
    }, (reason) => {
      setTimeout(fn, 0);
      throw reason;
    });
  };
  
  MyPromise.prototype.done = function() {
    this.catch((reason) => {
      throw reason;
    });
  };
  
  MyPromise.all = function(promiseArr) {
    return new MyPromise((resolve, reject) => {
      let result = [];
      let count = 0;
  
      for (let i = 0; i < promiseArr.length; i++) {
        promiseArr[i].then((data) => {
          result[i] = data;
          count++;
  
          if (count === promiseArr.length) {
            resolve(result);
          }
        }, reject)
      }
    });
  };
  
  MyPromise.race = function(promiseArr) {
    return new MyPromise((resolve, reject) => {
      for (let i = 0; i < promiseArr.length; i++) {
        promiseArr[i].then((data) => {
          resolve(data);
        }, reject)
      }
    });
  };
  
  MyPromise.resolve = function(value) {
    let promise = new MyPromise((resolve, reject) => {
      resolveMyPromise(promise, value, resolve, reject);
    })
    return promise;
  };
  
  MyPromise.reject = function(reason) {
    return new MyPromise((resolve, reject) => {
      reject(reason);
    });
  };
  
  MyPromise.defer = MyPromise.deferred = function () {
    let dfd = {};
    dfd.promise = new MyPromise((resolve, reject) => {
      dfd.resolve = resolve;
      dfd.reject = reject;
    });
    return dfd;
  }
  
  
  module.exports = MyPromise;