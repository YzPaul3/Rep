let MyPromise = require('./promise')

let promise = new MyPromise(function(resolve, reject) {
    setTimeout(() => {
        resolve('resolved value')
    }, 1000)
})

promise.then((value) => {
    console.log('value1: ' + value)
    return 'returned resolve'
}, (reason) => {
    console.log(reason)
}).then((value) => {
    console.log(value)
})
