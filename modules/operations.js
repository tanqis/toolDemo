 var mongoose = require('mongoose')
 var OperationsSchema = require('../schemas/Operations')
 var Operations = mongoose.model('Operations', OperationsSchema)

 module.exports = Operations