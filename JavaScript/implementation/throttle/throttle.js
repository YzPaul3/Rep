// 利用时间戳(会立刻执行)
const throttleA = (fn, wait) => {
    let context, args
    let previous = 0
    return function() {
        context = this
        args = arguments
        let now = +new Date()
        if (now - previous >= wait) {
            fn.apply(context, args)
            previous = now
        }
    }
}

// 利用定时器(会延迟执行)
const throttleB = (fn, wait) => {
    let context, args
    let timer
    return function() {
        context = this
        args = arguments
        if (!timer) {
            timer = setTimeout(() => {
                fn.apply(context, args)
                timer = null
            }, wait)
        }
    }
}

// 合并版本
const throttleC = (fn, wait) => {
    let context, args, timer, result
    let previous = 0

    let later = function() {
        previous = +new Date()
        fn.apply(context, args)
        timer = null
    }

    let throttled = function() {
        context = this
        args = arguments
        let now = +new Date()
        let remaining = wait - (now - previous)

        if (remaining <= 0 || remaining > wait) {
            if (timer) {
                clearTimeout(timer)
                timer = null
            }
            previous = now
            fn.apply(context, args)
        } else if (!timer) {
            timer = setTimeout(later, remaining)
        }
    }
    return throttled
}

const throttle = (fn, wait, options) => {
    let context, args, timer
    let previous = 0

    let later = function() {
        fn.apply(context, args)
        timer = null
    }

    let throttled = function() {
        let args = arguments
        let context = this
        let now = +new Date()
        let remaining = wait - (now - previous)
        
        if (remaining <= 0 || remaining > wait) {
            if (timer) {
                clearTimeout(timer)
                timer = null
            }
            fn.apply(context, args)
            previous = now
        } else if (!timer) {
            timer = setTimeout(later, remaining)
        }
    }
    return throttled
}



var count = 1;
var container = document.getElementById('container');

function getUserAction() {
    container.innerHTML = count++;
    return count
};

container.addEventListener('mousemove', throttleC(getUserAction, 1000), false)