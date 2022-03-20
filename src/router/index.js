const fs = require('fs')

const Router = require('koa-router')

const router = new Router()

fs.readdirSync(__dirname).forEach(file => {
    // console.log(file)
    if (file != 'index.js') { //加载当前目录下的除了index.js的文件里导出的router实例对象
        let r = require('./' + file)
        // router对象也支持use方法注册中间件
        router.use(r.routes())
    }
})

module.exports = router