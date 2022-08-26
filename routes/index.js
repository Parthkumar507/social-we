const express=require('express')
const homeController=require('../controllers/home_Controller')

let router=express.Router();

router.get('/',homeController.home)

router.get('/',homeController.home2)


console.log('router is loaded')

module.exports=router;

