const Post=require('../models/post')
module.exports.home=function(req,res){
    //cookie come as a req , but goes as a res
    // let x=req.cookies;
    // res.cookie('user_id',1)

    Post.find({})
    .populate('user')
    .populate({
        path:'comments',
        populate:{
            path:'user'
        }
    })
    .exec(function(err,posts){
        return res.render('home',{
            titleName:'Home',
            posts:posts
            
        })
    })
}

