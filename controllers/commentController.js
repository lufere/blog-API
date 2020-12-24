var Comment = require('../models/comment');

exports.comment_list = (req, res, next) => {
    res.send('Get all comments from post with id: ' + req.params.userId);
}

exports.comment_create = (req, res, next) => {
    res.send('Create a comment in the post with id: ' + req.params.userId);
}

exports.comment_detail = (req, res, next) => {
    res.send('Show comment with id: ' + req.params.id + ' from the post with id: ' + req.params.userId);
}

exports.comment_update = (req, res, next) => {
    res.send('Update comment with id: ' + req.params.id + ' from the post with id: ' + req.params.userId);
}

exports.comment_delete = (req, res, next) => {
    res.send('Delete comment with id: ' + req.params.id + ' from the post with id: ' + req.params.userId);
}