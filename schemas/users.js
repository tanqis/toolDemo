var mongoose = require('mongoose');
//申明一个mongoons对象
// 类型包含：String、Number、Objectid、Bollean、function、data、Mixed、Array
var UsersSchema = new mongoose.Schema({
    userPwd: String,
    userName: String,
    userRealName: String,
    userEmail: String,
    userMobill: String,
    userSex: String,
    status: {
        type: Number,
        default: 1
    },
    userLevel: {
        type: Number,
        default: 1
    },
    userPermission: {
        type: Number,
        default: 1
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
UsersSchema.pre('save', function (next) {
    if (this.isNew) {
        this.createDate = this.updateDate = Date.now();
    } else {
        this.updateDate = Date.now();
    }
    next();
})

UsersSchema.statics = {
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
module.exports = UsersSchema