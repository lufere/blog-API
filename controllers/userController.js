var User = require('../models/user');
const bcrypt = require('bcryptjs');

const {body, validationResult} = require('express-validator');
const user = require('../models/user');

exports.user_list = (req, res, next) => {
    User.find({})
        .then(results=>res.json({users: results}))
        .catch(err=>next(err));
}

exports.user_create = (req, res, next) => {
    res.send('Create a new user');
}

exports.user_detail = (req, res, next) => {
    User.findById(req.params.id)
        .then(user=>res.json({user}))
        .catch(err=>next(err));
}

exports.user_update = [
    body('username').trim().escape().isLength({min:1}),
    body('creator').trim().escape(),
    (req, res, next) => {
        const errors = validationResult(req);
        var user;
        User.findById(req.params.id)
            .then(foundUser=>{
                if(!req.body.password){
                    user = new User({
                        username: req.body.username,
                        password: foundUser.password,
                        creator: req.body.creator,
                        _id: req.params.id,
                    })
                    if(!errors.isEmpty()) res.json({errors:errors.array()})
                    User.findByIdAndUpdate(req.params.id,user,{new:true})
                        .then(updatedUser=>res.json({updatedUser}))
                        .catch(err=>next(err));
                }else{
                    bcrypt.hash(req.body.password,10)
                        .then(hashedPassword=>{
                            console.log(req.body.username);
                            user = new User({
                                username: req.body.username,
                                password:hashedPassword,
                                creator:req.body.creator,
                                _id: req.params.id,
                            })
                            if(!errors.isEmpty()) res.json({errors:errors.array()})
                            User.findByIdAndUpdate(req.params.id,user,{new:true})
                                .then(updatedUser=>res.json({updatedUser}))
                                .catch(err=>next(err));
                        })
                        .catch(err=>next(err));
                }
            })
            .catch(err=>next(err));
    }
]

exports.user_delete = (req, res, next) => {
    User.findByIdAndDelete(req.params.id)
        .then(deletedUser=>res.json({deletedUser}))
        .catch(err=>next(err));
}