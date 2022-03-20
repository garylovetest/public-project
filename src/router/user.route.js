const Router = require('koa-router')

const { userValidator, varifyUser, crpytPassword, verifyLogin } = require('../middleware/user.middleware')
const { register, login, changePassword } = require('../controller/user.controller')
const { auth } = require('../middleware/auth.middleware')

const router = new Router({ prefix: '/users' })

router.post('/register', userValidator, varifyUser, crpytPassword, register)

router.post('/login', userValidator, verifyLogin, login)

router.patch('/', auth, crpytPassword, changePassword)

module.exports = router;