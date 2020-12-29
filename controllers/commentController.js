var Comment = require('../models/comment');
const {body, validationResult} = require('express-validator');

exports.comment_list = (req, res, next) => {
    Comment.find({post : req.params.postId})
        .populate('author post')
        .then(results=> res.json({comments:results}))
        .catch(err=>next(err));
}

exports.comment_create = [
    body('content', 'Comment content is required').trim().escape().isLength({min:1}), 
    (req, res, next) => {
        const errors = validationResult(req);

        var comment = new Comment({
            content: req.body.content,
            timestamp: Date.now(),
            author: req.user,
            post: req.params.postId
        });

        if(!errors.isEmpty()) res.json({errors:errors.array(), comment})

        comment.save((err)=>{
            if(err) return next(err);
            console.log('user: ', req.user);
            res.json({comment});
        })
    }
] 

exports.comment_detail = (req, res, next) => {
    Comment.findById(req.params.id)
        .populate('author post')
        .then(comment=> res.json({comment}))
        .catch(err=>next(err));
}

exports.comment_update = (req, res, next) => {
    res.send('Update comment with id: ' + req.params.id + ' from the post with id: ' + req.params.postId);
}

exports.comment_delete = (req, res, next) => {
    res.send('Delete comment with id: ' + req.params.id + ' from the post with id: ' + req.params.postId);
}