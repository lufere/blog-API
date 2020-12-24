var Post = require('../models/post');

exports.post_list = (req, res, next)=>{
    res.send('Get all the posts');
}

exports.post_create = (req, res, next) => {
    res.send('Create a new post');
}

exports.post_detail = (req, res, next) =>{
    res.send('Show the post with id: ' + req.params.id);
}

exports.post_update = (req, res, next) => {
    res.send('Updating post with id: ' + req.params.id);
}

exports.post_delete = (req, res, next) =>{
    res.send('Deleting post with id: ' + req.params.id)
}