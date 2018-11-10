// 页面性能监控
let processData = (p) => {
    let data = {
        // 上个页面卸载到本页面开始加载的时长
        prevPageUnload: p.fetchStart - p.navigationStart,
        // 重定向的时长
        redirect: p.redirectEnd - p.redirectStart,
        // dns解析时长
        dns: p.domainLookupEnd -p.domainLookupStart,
        // tcp connect
        tcpConnect: p.connectEnd - p.connectStart,
        // request -> response
        send: p.responseEnd - p.requestStart,
        // 首字节接收到的时长
        ttfb: p.responseStart - p.navigationStart,
        // dom准备的时长
        domready: p.domInteractive - p.domLoading,
        // 白屏
        whiteScreen: p.domLoading - p.navigationStart,
        // dom解析时间
        dom: p.domComplete - p.domLoading,
        // window.onload执行时间
        windowonload: p.loadEventEnd - p.loadEventStart,
        // total
        total: p.loadEventEnd - p.navigationStart
    }
    return data
}

// onload页面全都加载完再执行
let load = (cb) => {
    let timer;
    let check = () => {
        if (performance.timing.loadEventEnd) {
            clearTimeout(timer)
            cb()
        } else {
            timer = setTimeout(check, 100)
        }
    }
    window.addEventListener('load', check, false)
}

// dom解析完成后，还没有触发onload
let domReady = (cb) => {
    let timer;
    let check = () => {
        if (performance.timing.domInteractive) {
            clearTimeout(timer)
            cb()
        } else {
            timer = setTimeout(check, 100)
        }
    }
    window.addEventListener('DOMContentLoaded', check, false)
}

export default {
    init(cb) {
        // dom解析完成后，还没有触发onload
        domReady(() => {
            let perfData = performance.timing
            let data = processData(perfData)
            data.type = 'domReady'
            cb(data)
        })
        load(() => {
            let perfData = performance.timing
            let data = processData(perfData)
            data.type = 'load'
            cb(data)
        })
    }
}