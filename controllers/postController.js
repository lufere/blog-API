const Post = require('../models/post');
const {body, validationResult} = require('express-validator');
const e = require('express');

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

exports.post_update = [
    body('title', 'Title required').trim().escape().isLength({min:1}),
    body('content', "Post content can't be empty").trim().escape().isLength({min:1}),
    body('published').trim().escape(),
    body('author', 'Author required').trim().escape().isLength({min:1}),

    (req, res, next) =>{
        const errors = validationResult(req);
        var timestamp;
        // var author;
        Post.findById(req.params.id)
            // .select('timestamp author')
            .then(post =>{
                timestamp = post.timestamp.toString();
                console.log(req.user.username)
            })
            .catch(err=>next(err));

        const post = new Post({
            title:req.body.title,
            content:req.body.content,
            timestamp: timestamp,
            author: req.user,
            published: req.body.published,
            _id: req.params.id
        });

        if(!errors.isEmpty()) return res.status(400).json({errors:errors.array(),post});
        
        // console.log('author: ', timestamp);
        // console.log('user: ', req.user);
        if(req.body.author === req.user._id.toString()){
            Post.findByIdAndUpdate(req.params.id, post, {new: true})
                .then(updatedPost=>res.json({post:updatedPost}))
                .catch(err=>next(err));
        }else{
            res.status(403).json({errors:'Unauthorized user'})
        }

    }
]

exports.post_delete = (req, res, next) =>{
    Post.findById(req.params.id)
        .select('author')
        .then(post=>{
            if(post.author.toString() === req.user._id.toString()){
                Post.findByIdAndDelete(req.params.id)
                    .then(deletedPost=>res.json({deleted:deletedPost}))
                    .catch(err=>next(err));                
            }else{
                res.status(403).json({errors:'Unauthorized user'})
            }
        })
        .catch(err=>next(err));

}