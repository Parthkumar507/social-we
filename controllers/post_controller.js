const Post=require('../models/post')
const Comment=require('../models/comment')

module.exports.postContent= async function(req,res){
    try{

      await Post.create({
            content:req.body.content,
            user:req.user._id
        })
        return res.redirect('back');

    }catch(err){
        console.log('Error ', err);
        return;
    }   
}
module.exports.destroy=async function(req,res){
    
    try{
        //finding the id , by the url
     let post=await Post.findById(req.params.id)
    

        //checking the correct person
        //in req.user.id instead of _id , we use .id , bcoz it is converting into string
        //as we require string

        if(post.user==req.user.id){

            post.remove();
           await Comment.deleteMany({post:req.param.id})

        }
            return res.redirect('back'); 

    }catch(err){
        console.log('Error ', err);
        return;
    }

}