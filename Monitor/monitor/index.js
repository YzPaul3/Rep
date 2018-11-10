import perf from './performance.js'
import resource from './resource.js'
import xhr from './xhr.js'
import err from './err.js'
import { formatQuery } from './util'

/* 监控页面性能
算时间差 利用浏览器api performance
performance.timing
*/
perf.init((data) => { // 获取页面性能相关数据
    console.log("perf", data)
    // 通过image传到服务端,空图片
    // new Image().src = "/p.gif?" + formatQuery(data)
})

// 监控页面静态资源加载情况
resource.init((data) => {
    console.log("resource", data)
})

// ajax 监控ajax发送情况
xhr.init((data) => {
    console.log("xhr", data)
})


// 页面错误捕获
// try catch
// 代码出错了
err.init((data) => {
    console.log("err", data)
})

// 监控用户行为
// Xpath
