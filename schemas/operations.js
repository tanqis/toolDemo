var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var OperationsSchema = new mongoose.Schema({
    browserName: String,
    browserType: String,
    Ip: String,
    remainTime: String,
    usersId: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    leaveWords_id: {
        type: Schema.Types.ObjectId,
        ref: 'leaveWords'
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

OperationsSchema.pre('save', function (next) {
    if (this.isNew) {
        this.createDate = this.updateDate = Date.now();
    } else {
        this.updateDate = Date.now();
    }
    next();
})

OperationsSchema.statics = {
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
    }
}
module.exports = OperationsSchema