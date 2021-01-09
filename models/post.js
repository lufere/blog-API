const moment = require('moment');
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var PostSchema = new Schema({
    title: {type: String, required: true},
    content: {type: String, required: true},
    timestamp: {type: Date, required: true},
    author: {type: Schema.Types.ObjectId, required: true, ref:'User'},
    published: {type: Boolean, required: true},
});

PostSchema
.set('toJSON', {virtuals:true})

PostSchema
.virtual('timestamp_formatted')
.get(function(){
    return moment(this.timestamp).format('MMMM Do YYYY, h:mm:ss a');
})

module.exports = mongoose.model('Post', PostSchema);