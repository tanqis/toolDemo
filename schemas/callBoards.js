var mongoose = require('mongoose');
var CallBoardsSchema = new mongoose.Schema({
    name: String,
    list: Array,
    sort: Number,
    description: String,
    createDate: {
        type: Date,
        default: Date.now()
    },
    updateDate: {
        type: Date,
        default: Date.now()
    }
})

CallBoardsSchema.pre('save', function (next) {
    if (this.isNew) {
        this.createDate = this.updateDate = Date.now();
    } else {
        this.updateDate = Date.now();
    }
    next();
})

CallBoardsSchema.statics = {
    fetch: function (cb) {
        return this
            .find()
            .sort('sort')
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
module.exports = UsersSchema