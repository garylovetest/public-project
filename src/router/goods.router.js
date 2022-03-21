const Router = require('koa-router')

const { upload, create, update, remove, offline, restore, findAll } = require('../controller/goods.controller')
const { auth, hasAdminPermission } = require('../middleware/auth.middleware')
const { validator } = require('../middleware/goods.middleware')

const router = new Router({ prefix: '/goods' })

router.post('/upload', auth, hasAdminPermission, upload)

//发布商品
router.post('/', auth, hasAdminPermission, validator, create)

router.put('/:id', auth, hasAdminPermission, validator, update)

//删除商品，若数据库不增加deletedAt字段，则硬删除
router.delete('/:id', auth, hasAdminPermission, remove)

//软删除，重新建表增加了deletedAt字段，删除只会更新deletedAt字段
router.post('/:id/off', auth, hasAdminPermission, offline)

router.post('/:id/on', auth, hasAdminPermission, restore)

//获取商品列表
router.get('/', findAll)

module.exports = router