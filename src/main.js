const Koa = require('koa');
const app = new Koa();
const router = require('./router/user.route')

const { APP_PORT } = require('./config/config.default')


app.use(router.routes())

app.listen(APP_PORT, () => {
    console.log(`server is running on http://localhost:${APP_PORT}`)
})