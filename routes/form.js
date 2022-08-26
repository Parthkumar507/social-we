const express =require('express')

const router =express.Router()

const formController=require('../controllers/form_controller')

router.get('/submit',formController.submit)
router.post('/submit/new',formController.re)


module.exports=router