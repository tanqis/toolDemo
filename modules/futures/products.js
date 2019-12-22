var mongoose = require('mongoose')
var ProductsSchema = require('../../schemas/futures/products')
var Products = mongoose.model('Products', ProductsSchema)

module.exports = Products