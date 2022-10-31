const Post=require('../../../models/post')
const Comment=require('../../../models/comment')


module.exports.index= async function(req,res){

    let posts = await Post.find({})
    .sort('-createdAt')
      .populate("user")
      .populate({
        path: "comments",
        populate: {
          path: "user",
        },
      });


    return res.json('200',{
        message:"List of posts",
        posts:posts
    })
}

module.exports.destroy=async function(req,res){
    
    try{
        //finding the id , by the url
     let post=await Post.findById(req.params.id)

        // if(post.user==req.user.id){

            post.remove();

           await Comment.deleteMany({post:req.param.id})

           return res.status(200).json(
            {
            message:"Post and comments associated deleted successfully!"
            })



        // }else{
        //     req.flash('error','You cannot delete this post')
        //     return res.redirect('back'); 

        // }

    }catch(err){
        console.log(err)

        return res.json(500,{
            message:"Internal Server Error"
        }) 

    }

}
