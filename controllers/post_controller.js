const Post=require('../models/post')

module.exports.postContent=function(req,res){

    // if(!req.isAuthenticated()){
    //     return res.redirect('/users/sign-in')
    // }
    Post.create({
        content:req.body.content,
        user:req.user._id
    },function(err,post){
        if(err){console.log('error in finding the Post ');return;}

        return res.redirect('back');
    })
}