const express=require('express')
let router=express.Router();
const passport=require('passport');

const CommentController=require('../controllers/comment_controller')

router.post('/create',passport.checkAuthentication,CommentController.postComment)

module.exports=router

