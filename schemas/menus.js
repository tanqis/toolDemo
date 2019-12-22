var mongoose = require('mongoose');
var MenusSchema = new mongoose.Schema({
    menuName: String,
    menuIcon: String,
    menuClass: String,
    menuSort: Number,
    menuUrl: String,
    menuStyle: String,
    isShow: Boolean,
    isDisplay: Boolean,
    createDate: {
        type: Date,
        default: Date.now()
    },
    updateDate: {
        type: Date,
        default: Date.now()
    }
})

MenusSchema.pre('save', function (next) {
    if (this.isNew) {
        this.createDate = this.updateDate = Date.now();
    } else {
        this.updateDate = Date.now();
    }
    next();
})

MenusSchema.statics = {
    fetch: function (cb) {
        return this
            .find()
            .sort('menuSort')
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
module.exports = MenusSchema