const express=require('express')
const homeController=require('../controllers/home_Controller')

let router=express.Router();

router.get('/',homeController.home)

router.use('/users',require('./users'))
router.use('/form',require('./form'))



console.log('router is loaded')

module.exports=router;

