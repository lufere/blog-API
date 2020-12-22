var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var PostSchema = new Schema({
    title: {type: String, required: true},
    content: {type: String, required: true},
    timestamp: {type: Date, required: true},
    author: {type: Schema.Types.ObjectId, required: true, ref:'User'},
    published: {type: Boolean, required: true},
});

module.exports = mongoose.model('Post', PostSchema);