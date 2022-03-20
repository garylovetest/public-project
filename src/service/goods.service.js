const Goods = require('../model/goods.model')

class GoodsServoce {
    async createGoods(goods) {
        const res = await Goods.create(goods)
        return res.dataValues
    }
}

module.exports = new GoodsServoce()