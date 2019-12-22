 var mongoose = require('mongoose')
 var CallBoardsSchema = require('../schemas/CallBoards')
 var CallBoards = mongoose.model('CallBoards', CallBoardsSchema)

 module.exports = CallBoards