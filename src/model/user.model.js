const { DataTypes } = require('sequelize')
const seq = require('../db/seq')

//可以去sequelize官网查看如何使用
//创建模型，表明结尾会自动附带s（model zd_user -> zd_users），建表

const User = seq.define('zd_user', {
    //id会被自动创建
    user_name: {
        type: DataTypes.STRING,
        allowsNull: false,
        unique: true,
        comment: '用户名,唯一'
    },
    password: {
        type: DataTypes.CHAR,
        allowNull: false,
        unique: false,
        comment: '密码'
    },
    is_admin: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: 0,
        comment: '是否为管理员,0:不是管理员(默认),1:是管理员'
    }
},
    /* //timestamps:false 可以不要时间戳
    {
        timestamps: false
    } */
)

//创建完数据表后可以注释掉
// User.sync({ force: true })

module.exports = User

