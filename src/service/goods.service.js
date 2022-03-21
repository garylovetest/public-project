const Goods = require('../model/goods.model')

class GoodsServoce {
    async createGoods(goods) {
        const res = await Goods.create(goods)
        return res.dataValues
    }

    async updateGoods(id, goods) {
        const res = await Goods.update(goods, { where: { id } })
        return res[0] > 0 ? true : false
    }

    async removeGoods(id) {
        const res = await Goods.destroy({ where: { id } })
        return res[0] > 0 ? true : false
    }

    async offlineGoods(id) {
        const res = await Goods.destroy({ where: { id } })
        return res > 0 ? true : false
    }

    async restoreGoods(id) {
        const res = await Goods.restore({ where: { id } })
        return res > 0 ? true : false
    }

    async findGoods(pageNum, pageSize) {
        /* //1、获取总数
        const count = await Goods.count()        //会自动去除软删除的数据
        //2、获取分页的数据，获取当前页的pagesize数量的记录
        const offset = (pageNum - 1) * pageSize
        const rows = await Goods.findAll({ offset: offset, limit: pageSize * 1 })
         */

        //或者直接用接口提供的方法：
        const offset = (pageNum - 1) * pageSize
        const { count, rows } = await Goods.findAndCountAll({ offset, limit: pageSize * 1 })
        return {
            pageNum,
            pageSize,
            total: count,
            list: rows
        }
    }
}

module.exports = new GoodsServoce()