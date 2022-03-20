const path = require('path')

const Koa = require('koa');
const KoaBody = require('koa-body')
const koaStatic = require('koa-static')
const parameter = require('koa-parameter')

const router = require('../router/index');
const errHandler = require('./errHandler');

const app = new Koa();

app
    .use(KoaBody({
        multipart: true,      //上传文件必须开启
        formidable: {
            uploadDir: path.join(__dirname, '../upload'), //文件存放地址，配置里不推荐使用相对路径，相对路径是相对于进程api里process.cwd()的路径而言
            keepExtensions: true,                   //保留文件的后缀名
        }
    }))
    .use(koaStatic(path.join(__dirname, '../upload')))
    .use(parameter(app))
    .use(router.routes())

app.on('error'/* 监听到的错误事件 */, errHandler)

module.exports = app