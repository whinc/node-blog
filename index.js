const Koa = require('koa')
const path = require('path')
const views = require('koa-views')
const static = require('koa-static')
const bodyParser = require('koa-bodyparser')
const mongoose = require('mongoose')
const CONFIG = require('./config/config')
const router = require('./routes')

const app = new Koa()

// 模板引擎
app.use(views(path.join(__dirname, './views'), {
    extension: 'ejs'
}))

// 静态资源
app.use(static(path.join(__dirname, './static')))

// body 解析
app.use(bodyParser())

// 路由
router(app)

mongoose.connect(CONFIG.mongodb, {useNewUrlParser: true})

app.listen(CONFIG.port)