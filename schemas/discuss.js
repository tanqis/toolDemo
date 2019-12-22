var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var DiscussSchema = new mongoose.Schema({
    content: String,
    leaveWords_id: {
        type: Schema.Types.ObjectId,
        ref: 'leaveWords'
    },
    users_id: {
        type: Schema.Types.ObjectId,
        ref: 'users'
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

DiscussSchema.pre('save', function (next) {
    if (this.isNew) {
        this.createDate = this.updateDate = Date.now();
    } else {
        this.updateDate = Date.now();
    }
    next();
})

DiscussSchema.statics = {
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
module.exports = DiscussSchema