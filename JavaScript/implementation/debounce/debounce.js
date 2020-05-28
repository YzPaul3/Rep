// 1
const debounceA = (fn, wait) => {
    let timer
    return () => {
        clearTimeout(timer)
        timer = setTimeout(fn, wait)
    }
}

// 2
// 修正this指向
const debounceB = (fn, wait) => {
    let timer
    return function() {
        let context = this
        clearTimeout(timer)
        timer = setTimeout(() => {
            fn.apply(context)
        }, wait)
    }
}

// 3
// 修正event参数
const debounceC = (fn, wait) => {
    let timer
    return function() {
        let context = this
        let args = arguments
        clearTimeout(timer)
        timer = setTimeout(() => {
            fn.apply(context, args)
        }, wait)
    }
}

// 4
// 添加立即执行功能
const debounceD = (fn, wait = 50, immediate = true) => {
    let timer
    return function() {
        let context = this
        let args = arguments
        if (timer) clearTimeout(timer)
        if (immediate) {
            let callNow = !timer
            timer = setTimeout(() => {
                timer = null
            }, wait)
            if (callNow) {
                fn.apply(context, args)
            }
        } else {
            timer = setTimeout(() => {
                fn.apply(context, args)
            }, wait)
        }
    }
}

// 5
// 支持函数返回值
const debounceE = (fn, wait = 50, immediate = true) => {
    let timer
    let result
    return function() {
        console.log(this)
        let context = this
        let args = arguments
        if (timer) clearTimeout(timer)
        if (immediate) {
            let callNow = !timer
            timer = setTimeout(() => {
                timer = null
            }, wait)
            if (callNow) {
                result = fn.apply(context, args)
            }
        } else {
            timer = setTimeout(() => {
                result = fn.apply(context, args)
            }, wait)
        }
        return result
    }
}

function debounce1 (fn, delay = 500) {
    let timer;
    return function () {
        if (timer) {
            clearTimeout(timer)
        }
        let context = this;
        let args = arguments;
        setTimeout(() => {
            fn.apply(context, args);
            timer = null;
        }, delay);
    }
}

var count = 1;
var container = document.getElementById('container');

function getUserAction() {
    container.innerHTML = count++;
    return count;
};

container.addEventListener('mousemove', debounce1(getUserAction, 1000, false), false)



