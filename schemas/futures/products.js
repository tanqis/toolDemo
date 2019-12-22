var mongoose = require('mongoose');
// 类型包含：String、Number、Objectid、Bollean、function、data、Mixed、Array
var ProductSchema = new mongoose.Schema({
    productId: String,
    productName: String,
    productPriceArrs: Array,
    isPublic: {
        type: Boolean,
        default: false
    },
    createBy: {
        type: String,
        default: 'sutanqi'
    },
    createDate: {
        type: Date,
        default: Date.now()
    },
    updateDate: {
        type: Date,
        default: Date.now()
    }
})

//每次执行都会调用,时间更新操作
ProductSchema.pre('save', function (next) {
    if (this.isNew) {
        this.createDate = this.updateDate = Date.now();
    } else {
        this.updateDate = Date.now();
    }
    next();
})

ProductSchema.statics = {
    fetch: function (cb) {
        return this
            .find()
            .sort('createDate')
            .exec(cb)
    },
    findById: function (id, cb) {
        return this
            .findOne({
                _id: id
            })
            .exec(cb)
    },
    findListByObj: function (obj, cb) {
        return this
            .find(obj)
            .exec(cb)
    }
}
module.exports = ProductSchema