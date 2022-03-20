const jwt = require('jsonwebtoken')

const { userRegisterError } = require('../constant/err.type')
const { createUser, getUserInfo, updateById } = require('../service/user.service')

const { JWT_SECRET } = require('../config/config.default')

class UserController {
    async register(ctx, next) {
        //1、获取数据
        const { user_name, password } = ctx.request.body

        //2、操作数据库
        try {
            const res = await createUser(user_name, password)
            //3、返回结果
            ctx.body = {
                code: 0,
                message: '用户注册成功',
                result: {
                    id: res.id,
                    user_name: res.user_name,
                }
            }
        } catch (err) {
            console.error('获取用户信息错误', err);
            ctx.app.emit('error', userRegisterError, ctx)
            return
        }
    }

    async login(ctx, next) {
        const { user_name } = ctx.request.body
        // 1、获取用户信息（放在token的payload中，要记录id,user_name,is_admin等信息）
        try {
            //从返回结果对象中剔除password属性，将剩下的属性放在res对象里
            const { password, ...res } = await getUserInfo({ user_name })
            ctx.body = {
                code: 0,
                message: '用户登陆成功',
                result: {
                    token: jwt.sign(res, JWT_SECRET, { expiresIn: '1d' })
                }
            }
        } catch (err) {
            console.error('用户登陆失败', err);
        }
    }

    async changePassword(ctx, next) {
        //1、获取数据，通过拿到解析的token里的id，找到指定的数据库记录
        const id = ctx.user.tokenDecode.id
        //接收要修改的密码
        const { password } = ctx.request.body
        //2、操作数据库
        if (await updateById({ id, password, is_admin })) {//3、返回结果
            ctx.body = {
                code: 0,
                message: '修改密码成功',
                result: ''
            }
        } else {
            ctx.body = {
                code: '10007',
                message: '修改密码失败',
                result: ''
            }
        }

    }
}

module.exports = new UserController()