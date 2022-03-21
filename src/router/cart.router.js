const Router = require('koa-router')

const { auth } = require('../middleware/auth.middleware')
const { validator } = require('../middleware/cart.middleware')

const router = new Router({ prefix: '/carts' })

router.post('/', auth, validator, (ctx) => {
    ctx.body = ctx.user.tokenDecode
})

module.exports = router