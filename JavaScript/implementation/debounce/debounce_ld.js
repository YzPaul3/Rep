// 防抖 节流

function debounce(func, wait, opts = {}) {
    let leading = true
    let trailing = true
    let lastCallTime // 最后调用的时间
    let timeout
    let lastThis
    let lastArgs

    let shouldInvoke = function(now) {
        let sinceLastTime = now - lastCallTime
        return lastCallTime === undefined || sinceLastTime > wait
    }

    let invokeFunc = function(time) {
        func.apply(lastThis, lastArgs)
    }

    let remainingWait = function(now) {
        return wait - (now - lastCallTime)
    }

    let trailingEdge = function(time) {
        timeout = undefined
        if(trailing) {
            invokeFunc(time)
        }
    }

    let timerExpired = function() {
        let now = Date.now() // 当前定时器到时，是否需要执行
        if (shouldInvoke(now)) { // 如果需要调用
            // 触发结束方法
            return trailingEdge(now)
        }
        startTimer(timerExpired, remainingWait(now))
    }

    let startTimer = function(timerExpired, wait) {
        timeout=  setTimeout(timerExpired, wait)
    }

    // 是否第一次执行
    let leadingEdge = function(time) {
        if (leading) {
            invokeFunc(time)
        }
        startTimer(timerExpired, wait) //开启定时器，下次定时器到了，是否需要执行func
    }

    let debounced = function(...args) {
        lastThis = this
        lastArgs = args

        let now = Date.now()

        // 判断是否应该调用
        let isInvoking = shouldInvoke(now)
        lastCallTime = now
        if (isInvoking) {
            if (timeout === undefined) {
                leadingEdge(now)
            }
        }
    }
}


var count = 1;
var container = document.getElementById('container');

function getUserAction() {
    container.innerHTML = count++;
    return count
};

container.addEventListener('mousemove', debounce(getUserAction, 1000, false), false)