 var mongoose = require('mongoose')
 var LeaveWordsSchema = require('../schemas/LeaveWords')
 var LeaveWords = mongoose.model('LeaveWords', LeaveWordsSchema)

 module.exports = LeaveWords