 var mongoose = require('mongoose')
 var MenusSchema = require('../schemas/menus')
 var Menus = mongoose.model('Menus', MenusSchema)

 module.exports = Menus