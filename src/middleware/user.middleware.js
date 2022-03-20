const bcrypt = require('bcryptjs')

const { getUserInfo } = require('../service/user.service')
const { userFormateError, userAlreadyExisted, userRegisterError, userDoesNotExist, userLoginError, invalidPassword } = require('../constant/err.type')

const userValidator = async (ctx, next) => {
    //验证注册用户输入数据的合法性，用户名或密码为空的情况
    const { user_name, password } = ctx.request.body

    if (!user_name || !password) {
        console.error('用户名或密码为空', ctx.request.body)
        ctx.app.emit('error', userFormateError, ctx)
        return
    }

    await next()
}

const varifyUser = async (ctx, next) => {
    const { user_name } = ctx.request.body
    //验证数据的合法性，比如创建了相同的用户
    //查询数据库，如果返回了用户信息，则返回409,请求的资源存在冲突
    try {
        const res = await getUserInfo({ user_name })
        if (res) {
            console.error('用户名已经存在', { user_name })
            ctx.app.emit('error', userAlreadyExisted, ctx)
            return
        }
    } catch (err) {     //捕获数据库异常
        console.error('获取用户信息错误', err)
        ctx.app.emit('error', userRegisterError, ctx)
        return
    }

    await next()
}

const crpytPassword = async (ctx, next) => {
    const { password } = ctx.request.body

    const salt = bcrypt.genSaltSync(10);
    //hash保存的是密文
    const hash = bcrypt.hashSync(password, salt)

    ctx.request.body.password = hash

    await next()

}

const verifyLogin = async (ctx, next) => {

    //1、判断用户是否存在，不存在则报错
    const { user_name, password } = ctx.request.body
    try {
        const res = await getUserInfo({ user_name })
        if (!res) {
            console.error('用户名不存在', { user_name })
            ctx.app.emit('error', userDoesNotExist, ctx)
            return
        }

        //2、用户输入的密码和数据库密码是否匹配，不匹配则报错
        if (!bcrypt.compareSync(password, res.password)) {
            ctx.app.emit('error', invalidPassword, ctx)
            return
        }
    } catch (err) {
        console.error(err)
        ctx.app.emit('error', userLoginError, ctx)
        return
    }

    await next()
}


module.exports = {
    userValidator,
    varifyUser,
    crpytPassword,
    verifyLogin
}