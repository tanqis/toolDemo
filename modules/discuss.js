 var mongoose = require('mongoose')
 var DiscussSchema = require('../schemas/Discuss')
 var Discuss = mongoose.model('Discuss', DiscussSchema)

 module.exports = Discuss