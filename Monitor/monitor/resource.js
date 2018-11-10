let processData = (d) => {
    let data = {
        name: d.name,
        initiatorType: d.initiatorType,
        duration: d.duration
    }
    return data
} 

export default {
    init(cb) {
        if (window.PerformanceObserver) {
            let observer = new PerformanceObserver((list) => {
                let data = list.getEntries()[0];
                cb(processData(data))
            })
            observer.observe({entryTypes: ['resource']})
        } else {
            window.addEventListener('load', () => {
                // 获取资源相关信息
                let resourceData = performance.getEntriesByType('resource')
                let data = resourceData.map(item => processData(item))
                cb(data)
            }, false)
        }
    }
}
