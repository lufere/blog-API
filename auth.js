var express = require('express');
var router = express.Router();
const bcrypt = require("bcryptjs");
const User = require('./models/user');

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

module.exports = router;