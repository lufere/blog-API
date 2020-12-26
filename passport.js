var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
const User = require('./models/user');
const bcrypt = require("bcryptjs");

passport.use(new LocalStrategy(
    function(username, password, done){
        return User.findOne({username:username})
            .then(user=>{
                if(!user){
                    return done(null, false, {msg: 'Incorrect username'});
                }else{
                    bcrypt.compare(password, user.password)
                        .then(res=>{
                            if(res){
                                return done(null, user.toJSON());
                            }else{
                                return done(null, false, {msg:'Incorrect password'});
                            }
                        }).catch(err=>done(err))
                }
            }).catch(err=>done(err))
    }
));