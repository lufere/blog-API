var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
const User = require('./models/user');
const bcrypt = require("bcryptjs");

const passportJWT = require('passport-jwt');
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

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

passport.use(new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.secret
    },
    function(jwtPayload, done){
        // return User.findOne({username: jwtPayload.username})
        return User.findById(jwtPayload._id)
            .then(user=>{
                return done(null, user.toJSON()) ;
            })
            .catch(err=>done(err));
    }
));