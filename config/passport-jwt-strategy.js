const passport=require('passport');
const JWTStrategy=require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt;

const User=require('../models/user')

let opts={
    jwtFromRequest :ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey :'codeial'
}

passport.use(new JWTStrategy(opts, function(jwtPayLoad, done) {
    User.findById(jwtPayLoad._id, function(err, user) {
        if (err) {
            console.log('Error in finding the user from JWT')
            return done(err, false);
        }
        // console.log('User in passport.use ',user.id)
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
            // or you could create a new account
        }
    });
}));

module.exports=passport