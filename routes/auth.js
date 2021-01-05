var express = require('express');
var router = express.Router();
const bcrypt = require("bcryptjs");
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const passport = require('passport');

router.post('/sign-up', (req, res, next) => {
    bcrypt.hash(req.body.password, 10, (err, hashedPassword) =>{
        if(err) return next(err);
        const user = new User({
            username: req.body.username,
            password: hashedPassword,
            creator: true,
        }).save(err => {
            if(err) return next(err);
            res.redirect('/');
        })
    })
});

router.post('/login', (req, res, next)=>{
    passport.authenticate('local', {session: false}, (err, user, info) =>{
        if(err || !user){
            return res.status(400).json({
                message: 'Something is not right',
                user: user
            });
        }

        req.login(user, {session:false}, (err)=>{
            if(err)res.send(err);
            const token = jwt.sign(user, process.env.secret);
            return res.json({user:user, token:token});
        });
    },{succesRedirect:'/',failureRedirect:'/'})
    (req, res);

})

module.exports = router;