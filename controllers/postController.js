const Post = require('../models/post');
const {body, validationResult} = require('express-validator');

exports.post_list = (req, res, next)=>{
    res.send('Get all the posts');
}

exports.post_create = [
    body('title', 'Title required').trim().escape().isLength({min:1}),
    body('content', "Post content can't be empty").trim().escape().isLength({min:1}),
    body('published').trim().escape(),

    (req, res, next) =>{
        const errors = validationResult(req);

        const post = new Post({
            title:req.body.title,
            content:req.body.content,
            timestamp: Date.now(),
            author: req.user,
            published: req.body.published,
        });

        if(!errors.isEmpty()) return res.status(400).json({post,errors:errors.array()});

        post.save((err)=>{
            if(err) return next(err);
            res.json({post});
        })
        // res.send('Create a new post with user: ' +req.user.username);
    }
]

exports.post_detail = (req, res, next) =>{
    res.send('Show the post with id: ' + req.params.id);
}

exports.post_update = (req, res, next) => {
    res.send('Updating post with id: ' + req.params.id);
}

exports.post_delete = (req, res, next) =>{
    res.send('Deleting post with id: ' + req.params.id)
}