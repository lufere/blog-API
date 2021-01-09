const jwt = require('jsonwebtoken');
const passport = require('passport');

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