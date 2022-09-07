module.exports.profile=function(req,res){
    return res.render('user_profile',{
        titleName:'userProfile'
    })
}

//render the sign Up page
module.exports.signup=function(req,res){
    return res.render('user_sign_up',{
        titleName:'Codial|Sign Up'
    })
}


//render the sign In page
module.exports.signin=function(req,res){
    return res.render('user_sign_in',{
        titleName:'Codial|Sign In'
    })
}

//get the sign-up data
module.exports.create=function(req,res){

    //ToDo
}

//sign-in and create a session for the user
module.exports.createSession=function(req,res){

    //ToDo
}

