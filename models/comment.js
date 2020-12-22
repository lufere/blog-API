var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var CommentSchema = new Schema({
    content: {type:String, required:true},
    timestamp: {type:Date, required:true},
    Author: {type:Schema.Types.ObjectId, ref: 'User'},
})

module.exports = mongoose.model('Comment', CommentSchema);