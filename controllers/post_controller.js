const Post=require('../models/post')
const Comment=require('../models/comment')

module.exports.postContent= async function(req,res){
    try{

      let post=await Post.create({
            content:req.body.content,
            user:req.user._id
        })
        // if (req.xhr){
        //     // if we want to populate just the name of the user (we'll not want to send the password in the API), this is how we do it!
        //     // post = await post.populate('user', 'name').execPopulate();
        //     post = await post.populate('user',"name").execPopulate();
        //     // , 'name').execPopulate();
        //     return res.status(200).json({
        //         data: {
        //             post: post
        //         },
        //         message: "Post created!"
        //     });
        // }
  
        if (req.xhr){
            // if we want to populate just the name of the user (we'll not want to send the password in the API), this is how we do it!
            post = await post.populate('user', 'name')

            return res.status(200).json({
                data: {
                    post: post
                },
                message: "Post created!"
            });
        }



        req.flash('success','Posted successfully!')
        return res.redirect('back');

    }catch(err){

        req.flash('error',err)
        return res.redirect('back');
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
           if(req.xhr){

            return res.status(200).json({
                
                data:{
                    post_id:req.params.id   
                },
                message:"Post Deleted"
            })
           }


           req.flash('success','Post and associated comments deleted!')
           return res.redirect('back'); 
        }else{
            req.flash('error','You cannot delete this post')
            return res.redirect('back'); 

        }

    }catch(err){
        req.flash('error',err)
        return res.redirect('back'); 
    }

}