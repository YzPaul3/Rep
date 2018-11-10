let Koa = require('koa')
let path = require('path')
let Server = require('koa-static')

let app = new Koa()

app.use(Server(path.join(__dirname, 'client')))
app.use(Server(path.join(__dirname, 'node_modules')))
app.use(async(ctx, next) => {
    if (ctx.path == '/api/list') {
        ctx.body = {api : '/api/list'}
    } else {
        next()
    }
})

app.listen(3000, function() {
    console.log('server start 3000')
})
