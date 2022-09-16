const express=require('express')
let router=express.Router();

const homeController=require('../controllers/home_Controller')

console.log('router loaded');

router.get('/',homeController.home)
router.use('/users',require('./users'))
router.use('/post',require('./post'))

// for any further routes, access from here
// router.use('/routerName', require('./routerfile));

module.exports=router;

