const Post=require('../../../models/post')
const Comment=require('../../../models/comment')


module.exports.index= async function(req,res){

    let posts = await Post.find({})
    .sort('-createdAt')
      .populate("user"
      ,{
        name:true,
        email:true
      }
      )
      .populate({
        path: "comments",
        populate: {
          path: 'user',select:'name',select:'email'
        },
      }).exec();


    return res.status(200).json({
        message:"List of posts",
        posts:posts
    })
}

module.exports.destroy=async function(req,res){

    // const id2=req.param.id;

    try{
        //finding the id , by the url
     let post=await Post.findById(req.params.id)

        if(post.user==req.user.id){
            console.log("post.user :" ,post.user.id)
            console.log("req.user.id :" ,req.user.id)
 
            post.remove();
           await Comment.deleteMany({post:req.param.id})
           return res.status(200).json(
            {
            message:"Post and comments associated deleted successfully!"
            })

        }else{
            console.log("post.user :" ,post.user)
            console.log("req.user.id :" ,req.user)

            return res.status(401).json({
                message:"You cannot delete the post!"
            })

        }

    }catch(err){
        console.log(err)

        return res.json(500,{
            message:"Internal Server Error"
        }) 

    }

}
