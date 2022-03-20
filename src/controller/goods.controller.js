const path = require("path")

const { fileUploadError, unSupportedFileType, publishGoodsError } = require('../constant/err.type')
const { createGoods } = require('../service/goods.service')

class GoodsController {
    async upload(ctx, next) {
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
}

module.exports = new GoodsController()