var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
const User = require('./models/user');

passport.use(new LocalStrategy(
    function(username, password, done){
        return done(null, user);
    }))