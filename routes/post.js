const express=require('express')
let router=express.Router();
const passport=require('passport');

const PostController=require('../controllers/post_controller')

router.post('/create',passport.checkAuthentication,PostController.postContent)

module.exports=router

