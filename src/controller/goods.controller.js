const path = require("path")

const { fileUploadError, unSupportedFileType, publishGoodsError, invalidGoodsID } = require('../constant/err.type')
const { createGoods, updateGoods, removeGoods, offlineGoods, restoreGoods, findGoods } = require('../service/goods.service')

class GoodsController {
    async upload(ctx) {
        const { file } = ctx.request.files
        const fileTypes = ['image/jpeg', 'image/png']
        if (file) {
            if (!fileTypes.includes(file.type)) {
                ctx.app.emit('error', unSupportedFileType, ctx)
                return
            }
            ctx.body = {
                code: 0,
                message: '图片上传成功',
                result: {
                    goods_img: path.basename(file.path)
                }
            }
        } else {
            ctx.app.emit('error', fileUploadError, ctx)
            return
        }
    }

    async create(ctx) {
        //1、写入数据库，需要在service层写下插入商品数据库的方法
        try {
            const { createdAt, updatedAt, ...res } = await createGoods(ctx.request.body)
            ctx.body = {
                code: 0,
                message: '商品发布成功',
                result: res
            }
        } catch (err) {
            console.error(err)
            ctx.app.emit('error', publishGoodsError, ctx)
            return
        }
    }

    async update(ctx) {
        try {
            const res = await updateGoods(ctx.params.id, ctx.request.body)
            if (res) {
                ctx.body = {
                    code: 0,
                    message: '修改商品成功',
                    result: ''
                }
            } else {
                ctx.app.emit('error', invalidGoodsID, ctx)
                return
            }
        } catch (error) {
            console.error(error)
        }
    }

    async remove(ctx) {
        const res = await removeGoods(ctx.params.id)
        ctx.body = {
            code: 0,
            message: '删除商品成功',
            result: ''
        }
    }

    async offline(ctx) {
        const res = await offlineGoods(ctx.params.id)
        if (res) {
            ctx.body = {
                code: 0,
                message: '下架商品成功',
                result: ''
            }
        } else {
            ctx.app.emit('error', invalidGoodsID, ctx)
            return
        }
    }

    async restore(ctx) {
        const res = await restoreGoods(ctx.params.id)
        if (res) {
            ctx.body = {
                code: 0,
                message: '上架商品成功',
                result: ''
            }
        } else {
            ctx.app.emit('error', invalidGoodsID, ctx)
            return
        }
    }

    async findAll(ctx) {
        //1、解析pageNum pageSize
        const { pageNum = 1, pageSize = 10 } = ctx.request.query
        //2、调用数据处理的相关方法
        const res = await findGoods(pageNum, pageSize)
        //3、返回结果
        ctx.body = {
            code: 0,
            message: '获取商品列表成功',
            result: res
        }
    }
}

module.exports = new GoodsController()