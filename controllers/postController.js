const Post = require('../models/post');
const {body, validationResult} = require('express-validator');

exports.post_list = (req, res, next)=>{
    Post.find({})
        .populate('author')
        .then(results=> res.json({post_list:results}))
        .catch(err=>next(err))
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

        if(!errors.isEmpty()) return res.status(400).json({errors:errors.array(),post});

        post.save((err)=>{
            if(err) return next(err);
            res.json({post});
        })
    }
]

exports.post_detail = (req, res, next) =>{
    Post.findById(req.params.id)
        .populate('author')
        .then(post=>res.json({post:post}))
        .catch(err=>next(err));
}

exports.post_update = (req, res, next) => {
    res.send('Updating post with id: ' + req.params.id);
}

exports.post_delete = (req, res, next) =>{
    res.send('Deleting post with id: ' + req.params.id)
}