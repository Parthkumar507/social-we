const Post=require('../models/post')
const User=require('../models/user');
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
        User.find({},function(err,users){
            return res.render('home',{
                titleName:'Home',
                posts:posts,
                all_users:users
                
            })
        })
    })
}

