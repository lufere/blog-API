const jwt = require('jsonwebtoken');
const passport = require('passport');
const {body, validationResult} = require('express-validator');
const bcrypt = require("bcryptjs");
const User = require('../models/user');

exports.login = (req, res, next) => {
    passport.authenticate('local', {session: false}, (err, user, info) =>{
        if(err || !user){
            return res.status(400).json({
                message: 'Something is not right',
                user: user,
                status: 400,
                info: info,
            });
        }

        req.login(user, {session:false}, (err)=>{
            if(err)res.send(err);
            const token = jwt.sign(user, process.env.secret, {expiresIn:60});
            return res.json({user:user, token:token, status:200});
        });
    },{succesRedirect:'/',failureRedirect:'/'})
    (req, res);
}

exports.sign_up = [
    body('username', 'Username required').trim().escape().isLength({min:1}),
    body('password', 'Password required').trim().escape().isLength({min:1}),
    body('creator', 'Creator required').trim().escape(),
    (req, res, next) => {
        const errors = validationResult(req);
        // console.log('username: ',req,body.username)
        // console.log('password: ',req,body.password)
        bcrypt.hash(req.body.password, 10, (err, hashedPassword) =>{
            if(err) {
                console.log('first')
                return next(err);
            }
            const user = new User({
                username: req.body.username,
                password: hashedPassword,
                creator: true,
            })
            
            if(!errors.isEmpty()) return res.status(400).json({errors:errors.array(), user, status:400})

            user.save((err,user) => {
                if(err) {
                    console.log('second')   
                    next(err);
                }
                // res.json({user});
                next()
            })
        })
    }
]