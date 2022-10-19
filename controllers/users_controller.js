const User=require('../models/user')

module.exports.profile=function(req,res){
    User.findById(req.params.id , function(req,user){
        
        return res.render('user_profile',{
            titleName:'userProfile',
            profile_user:user
        })
    })
   
}

module.exports.update=function(req,res){

    if(req.user.id==req.params.id){
        User.findByIdAndUpdate(req.params.id,req.body,function(err,user){
            req.flash('success', 'Updated!');
            return res.redirect('back');
        })

    }else{
        req.flash('error', 'Unauthorized!');
        return res.status(401).send('Unauthorized')
    }

    
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
        req.flash('error', 'Passwords do not match');
        return res.redirect('back')
    }
    User.findOne({ email:req.body.email },function(err,user){
        if(err){req.flash('error', err);return;}

        if(!user){//user is not present , so create it
            User.create(req.body,function(err,user){
                if(err){req.flash('error', err); return;}

                return res.redirect('/users/sign-in')
            })
        }else{
            req.flash('success', 'You have signed up, login to continue!');
            return res.redirect('/users/sign-in')
        }

    })

}

//sign-in and create a session for the user
module.exports.createSession=function(req,res){
    req.flash('success','You have logged-in succesfully')
    return res.redirect('/');
}

//sign-out and destroy a session for the user
module.exports.destroySession=function(req,res,next){
    req.logout(function(err) {
        if (err) { return next(err); }
        req.flash('success','You have logged-out succesfully')
        res.redirect('/');
      });
}



