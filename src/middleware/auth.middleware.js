const jwt = require('jsonwebtoken')

const { JWT_SECRET } = require('../config/config.default')
const { tokenExpiredError, invalidToken, hasNotAdminPermission } = require('../constant/err.type')

const auth = async (ctx, next) => {
    const { user_name } = ctx.request.body
    //拿到请求携带的令牌
    const { authorization } = ctx.header
    //去掉开头的'Bearer '部分
    const token = authorization.replace('Bearer ', '')
    try {
        //解析token
        const user = jwt.verify(token, JWT_SECRET)
        //将user信息存入ctx上下文对象
        ctx.user = {}
        ctx.user.tokenDecode = user
    } catch (err) {
        switch (err.name) {
            case 'TokenExpiredError':
                console.error('token已过期', err)
                ctx.app.emit('error', tokenExpiredError, ctx)
                return
            case 'JsonWebTokenError':
                console.error('无效的token', err)
                ctx.app.emit('error', invalidToken, ctx)
                return
        }
        console.log(err)
    }

    await next()
}

const hasAdminPermission = async (ctx, next) => {

    const is_admin = ctx.user.tokenDecode.is_admin
    if (!is_admin) {
        console.error('该用户没有管理员权限')
        ctx.app.emit('error', hasNotAdminPermission, ctx)
        return
    }

    await next()
}

module.exports = {
    auth,
    hasAdminPermission
}