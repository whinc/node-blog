const Koa = require("koa");
const path = require("path");
const views = require("koa-views");
const static = require("koa-static");
const bodyParser = require("koa-bodyparser");
const mongoose = require("mongoose");
const CONFIG = require("./config/config");
const router = require("./routes");
const session = require('koa-session')
const flash = require('./middlewares/flash')

const app = new Koa();

app.keys = ['somethings']

app.use(flash())

app.use(async (ctx, next) => {
    ctx.state.ctx = ctx
    await next()
})

app.use(session({
  key: CONFIG.session.key,
  maxAge: CONFIG.session.maxAge
}, app))


mongoose.connect(CONFIG.mongodb, { useNewUrlParser: true });

// 模板引擎
app.use(
  views(path.join(__dirname, "./views"), {
    extension: "pug",
    options: {
    //   cache: true
    }
  })
);

// 静态资源
app.use(static(path.join(__dirname, "./static")));

// body 解析
app.use(bodyParser());

// 路由
router(app);

app.listen(CONFIG.port, () => {
    console.log(`server is running on http://localhost:${CONFIG.port}`)
});
