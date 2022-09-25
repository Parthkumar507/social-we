const express=require('express')
let router=express.Router();
const passport=require('passport');

const PostController=require('../controllers/post_controller')

router.post('/create',passport.checkAuthentication,PostController.postContent)
router.get('/destroy/:id',passport.checkAuthentication,PostController.destroy)


module.exports=router

