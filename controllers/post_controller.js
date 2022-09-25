const Post=require('../models/post')
const Comment=require('../models/comment')


module.exports.postContent=function(req,res){
    Post.create({
        content:req.body.content,
        user:req.user._id
    },function(err,post){
        if(err){console.log('error in finding the Post ');return;}

        return res.redirect('back');
    })
}
module.exports.destroy=function(req,res){
    //finding the id , by the url
    Post.findById(req.params.id,function(err,post){

        //checking the correct person
        //in req.user.id instead of _id , we use .id , bcoz it is converting into string
        //as we require string

        if(post.user==req.user.id){

            post.remove();
            Comment.deleteMany({post:req.param.id},function(err){
             return res.redirect('back');   
            })
        }else{
            return res.redirect('back'); 
        }
    })
}