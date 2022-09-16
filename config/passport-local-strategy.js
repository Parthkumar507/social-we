const passport=require('passport');

const LocalStrategy =require('passport-local').Strategy

const User=require('../models/user')

//authenitaction using passport
passport.use(new LocalStrategy({
    usernameField:'email'//This is based on schema
    }, 
    function(email,password,done){
        // Find a User and establish the identity
        User.findOne({email:email},function(err,user){//right email is value passed by function
            //left is prop , in schema
            if (err) { 
                console.log('error in finding the user --> Passport')
                return done(err); }
            if (!user   ||  user.password!=password) {
                console.log('Invalid UserName/Password')
                 return done(null, false);
                 }
            return done(null, user);
        })

    } 

));


//serialisation of user
passport.serializeUser(function(user,done){
    done(null,user.id);
})


//Deserialisation of user
passport.deserializeUser(function(id,done){
    User.findById(id,function(err,user){
        if (err) { 
            console.log('error in finding the user --> Passport')
            return done(err); 
        }
        return done(null,user)
    })
})

//check the user is authenticate or not

passport.checkAuthentication=function(req,res,next){
    //if the user is signed in , then pass on the request to the next function(controller action)
    if(req.isAuthenticated()){
        return next();
    }
    //if the user is not sign-in
    return res.redirect('/users/sign-in')

}



passport.setAuthenticatedUser=function(req,res,next){
    if(req.isAuthenticated()){
        //req.user contains the current signed-in user from the session cookie and we are just  
        // sending this to the locals for future use
        res.locals.user=req.user;
    }
    next();
}




module.exports=passport