var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var CommentSchema = new Schema({
    content: {type:String, required:true},
    timestamp: {type:Date, required:true},
    author: {type:Schema.Types.ObjectId, required:true, ref: 'User'},
    post: {type:Schema.Types.ObjectId, ref: 'Post'},
})

module.exports = mongoose.model('Comment', CommentSchema);