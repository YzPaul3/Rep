export default {
    init(cb) {

        // 重写window.XMLHttpRequest方法
        let xhr = window.XMLHttpRequest

        let oldOpen = xhr.prototype.open
        xhr.prototype.open = function(method, url, async, username, password) {
            this.info = {
                method, url, async, username, password
            }
            return oldOpen.apply(this, arguments)
        }

        let oldSend = xhr.prototype.send
        xhr.prototype.send = function (value) {
            let start = Date.now()
            let fn = (type) => () => {
                this.info.time = Date.now() - start
                this.info.requestSize = value ? value.length : 0
                this.info.responseSize = this.responseText.length
                this.info.type = type
                cb(this.info)
            }
            this.addEventListener('load', fn('load'), false)
            this.addEventListener('error', fn('error'), false)
            this.addEventListener('abort', fn('abort'), false)
            return oldSend.apply(this, arguments)
        }
    }

    // window.fetch 重写
}