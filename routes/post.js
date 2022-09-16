const express=require('express')
let router=express.Router();

const PostController=require('../controllers/post_controller')

router.post('/create',PostController.postContent)


module.exports=router

