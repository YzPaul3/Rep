export default {
    init(cb) {
        // window.addEventListender('error', fn, true)
        // promise失败不能通过onerror捕获
        window.onerror = function(message, source, lineno, colno, error) {
            let info = {
                message: error.message,
                name: error.name,
            }
            let stack = error.stack
            let matchUrl = stack.match(/http:\/\/[^\n]*/)[0]
            info.filename = matchUrl.match(/http:\/\/(?:\S*).js/)[0]
            let [, row,col] = matchUrl.match(/:(\d+):(\d+)/)
            info.row = row
            info.col = col
            // 代码压缩 sourcemap 定位
            cb(info)
        }
    }
}