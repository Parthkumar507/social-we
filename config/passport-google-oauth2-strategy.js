const passport=require('passport')
// const GoogleStrategy = require('passport-google-oauth20').Strategy;
// const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;


const crypto=require('crypto')
const User=require('../models/user')

passport.use(new GoogleStrategy({
    clientID: "488583160350-0u8hb51r12uftp8ijjed8sgjq17g9bhl.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "http://localhost:8000/users/auth/google/callback"
    // passReqToCallback   : true,
    // scope: [ 'profile','email' ],
    // state: true
    
},    function(accessToken, refreshToken, profile, done){
    // find a user
    User.findOne({email: profile.emails[0].value}).exec(function(err, user){
        if (err){console.log('error in google strategy-passport', err); return;}
        console.log(accessToken, refreshToken);
        console.log(profile);

        if (user){
            // if found, set this user as req.user
            return done(null, user);
        }else{
            // if not found, create the user and set it as req.user
            User.create({
                name: profile.displayName,
                email: profile.emails[0].value,
                password: crypto.randomBytes(20).toString('hex')
            }, function(err, user){
                if (err){console.log('error in creating user google strategy-passport', err); return;}

                return done(null, user);
            });
        }

    }); 
}

// function(accessToken,refreshToken,profile,done){
//     User.findOne({email:profile.emails[0].value}.exec(function(err,user){
//         if(err){console.log('error in google strategy-passport',err);return}

//         console.log(profile);

//         if(user){
//             return done(null,user)
//         }else{
//             User.create({
//                 name:profile.displayName,
//                 email:profile.emails[0].value,
//                 password:crypto.randomBytes(20).toString('hex')
//             },function(err,user){
//                 if(err){console.log('error in create user google strategy-passport',err);return}

//                 return done(null,user)
//             })
//         }


//     }))
// }


))

module.exports=passport

