const Koa = require('koa');
const koaBody = require('koa-body')
const app = new Koa();
const userRouter = require('../router/user.route')

app.use(koaBody())
    .use(userRouter.routes())

module.exports = app