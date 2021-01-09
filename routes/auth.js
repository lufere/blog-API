var express = require('express');
var router = express.Router();
const bcrypt = require("bcryptjs");
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const passport = require('passport');

var authController = require('../controllers/authController');

router.post('/sign-up', (req, res, next) => {
    // console.log(req,body.username)
    // console.log(req,body.password)
    bcrypt.hash(req.body.password, 10, (err, hashedPassword) =>{
        if(err) {
            console.log('first')
            return next(err);
        }
        const user = new User({
            username: req.body.username,
            password: hashedPassword,
            creator: true,
        }).save((err,user) => {
            if(err) {
                console.log('second')   
                next(err);
            }
            // res.json({user});
            next()
        })
    })
},
authController.login);

router.post('/login', authController.login)

module.exports = router;