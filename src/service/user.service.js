const User = require('../model/user.model')

class UserService {
    async createUser(user_name, password) {
        //插入数据库
        const res = await User.create({
            // user_name: user_name，可以省略成一个
            user_name,
            password
        })
        return res.dataValues
    }

    async getUserInfo({ id, user_name, password, is_admin }) {
        //创建一个接收参数的对象，这样可以不管传参的顺序
        const whereOpt = {}
        //id如果存在，将id赋值后拷贝到whereOpt对象里
        id && Object.assign(whereOpt, { id })
        user_name && Object.assign(whereOpt, { user_name })
        password && Object.assign(whereOpt, { password })
        is_admin && Object.assign(whereOpt, { is_admin })
        const res = await User.findOne({
            attributes: ['id', 'user_name', 'password', 'is_admin'],
            where: whereOpt
        })
        //如果res有结果则，返回值，如果没有结果则返回空
        return res ? res.dataValues : null
    }

    async updateById({ id, user_name, password, is_admin }) {
        const whereOpt = { id }
        const newUser = {}

        user_name && Object.assign(newUser, { user_name })
        password && Object.assign(newUser, { password })
        is_admin && Object.assign(newUser, { is_admin })
        const res = await User.update(newUser, { where: whereOpt })
        //返回如果是[0]，则表示没有修改密码，前后密码一致，因为前置有加密，基本不太可能出现这种情况
        return res[0] > 0 ? true : false
    }
}

module.exports = new UserService()