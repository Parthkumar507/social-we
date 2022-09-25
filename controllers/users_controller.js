const User=require('../models/user')

module.exports.profile=function(req,res){
    User.findById(req.params.id , function(req,user){
        return res.render('user_profile',{
            titleName:'userProfile',
            profile_user:user
        })
    })
   
}

//render the sign Up page
module.exports.signup=function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile')
    }
    return res.render('user_sign_up',{
        titleName:'Codial|Sign Up'
    })
}


//render the sign In page
module.exports.signin=function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile')
    }
    return res.render('user_sign_in',{
        titleName:'Codial|Sign In'
    })
}

//get the sign-up data
module.exports.create=function(req,res){

    if(req.body.password!=req.body.confirm_password){
        return res.redirect('back')
    }
    User.findOne({ email:req.body.email },function(err,user){
        if(err){console.log('error in finding the user in signing-up');return;}

        if(!user){//user is not present , so create it
            User.create(req.body,function(err,user){
                if(err){console.log('error in creating the user while signing-up');return;}

                return res.redirect('/users/sign-in')
            })
        }else{
            return res.redirect('/users/sign-in')
        }

    })

}

//sign-in and create a session for the user
module.exports.createSession=function(req,res){
    return res.redirect('/');
}

//sign-out and destroy a session for the user
module.exports.destroySession=function(req,res,next){
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/');
      });
}



