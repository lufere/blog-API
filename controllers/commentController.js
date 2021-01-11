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
            // console.log('user: ', req.user);
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

exports.comment_update = [
    body('content', "Comment content can't be empty").trim().escape().isLength({min:1}),
    body('author', "Comment has to have an author").trim().escape().isLength({min:1}),
    (req, res, next) => {
        const errors = validationResult(req);
        var timestamp;

        Comment.findById(req.params.id)
            .select('timestamp')
            .then(comment=>timestamp=comment.timestamp)
            .catch(err=>next(err));

        var comment = new Comment({
            content: req.body.content,
            timestamp: timestamp,
            author: req.user,
            post: req.params.postId,
            _id: req.params.id
        });

        if(!errors.isEmpty()) res.status(400).json({errors:errors.array(),comment});

        if(req.user._id.toString() === req.body.author){
            Comment.findByIdAndUpdate(req.params.id,comment,{new:true})
                .then(updatedComment=>res.json({comment:updatedComment}))
                .catch(err=>next(err));
        }else{
            res.status(403).json({errors:'Unauthorized user'});
        }
    }
] 

exports.comment_delete = (req, res, next) => {
    Comment.findById(req.params.id)
        .select('author')
        .then(comment=>{
            if(comment.author._id.toString()===req.user._id.toString()){
                Comment.findByIdAndDelete(req.params.id)
                    .then(deletedComment=> res.json({deletedComment}))
                    .catch(err=>next(err));
            }else{
                res.status(403).json({erorrs:'Unauthorized user'});
            }
        })
        .catch(err=>next(err));
}