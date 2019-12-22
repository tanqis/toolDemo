var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var LeaveWordsSchema = new mongoose.Schema({
    title: String,
    content: String,
    class: String,
    description: String,
    users_id: {
        type: Schema.Types.ObjectId,
        ref: 'Users'
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

LeaveWordsSchema.pre('save', function (next) {
    if (this.isNew) {
        this.createDate = this.updateDate = Date.now();
    } else {
        this.updateDate = Date.now();
    }
    next();
})

LeaveWordsSchema.statics = {
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
module.exports = LeaveWordsSchema