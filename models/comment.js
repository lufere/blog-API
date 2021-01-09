const moment = require('moment');
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var CommentSchema = new Schema({
    content: {type:String, required:true},
    timestamp: {type:Date, required:true},
    author: {type:Schema.Types.ObjectId, required:true, ref: 'User'},
    post: {type:Schema.Types.ObjectId, ref: 'Post'},
})

CommentSchema.set('toJSON', {virtuals:true})

CommentSchema
.virtual('timestamp_formatted')
.get(function(){
    return moment(this.timestamp).format('MMMM Do YYYY, h:mm:ss a');
})

module.exports = mongoose.model('Comment', CommentSchema);