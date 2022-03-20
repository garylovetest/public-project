const Router = require('koa-router')

const { upload, create } = require('../controller/goods.controller')
const { auth, hasAdminPermission } = require('../middleware/auth.middleware')
const { validator } = require('../middleware/goods.middleware')

const router = new Router({ prefix: '/goods' })

router.post('/upload', auth, hasAdminPermission, upload)

//发布商品
router.post('/', auth, hasAdminPermission, validator, create)

module.exports = router