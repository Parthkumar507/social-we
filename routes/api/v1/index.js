const express=require('express')
let router=express.Router();

router.use('/posts',require('./posts'))

module.exports=router