const express=require('express')
const path=require('path')
const controller=require('../controller/users')
const router=express.Router()

router.post('/register',controller.register)
router.post('/login',controller.login)
router.get('/logout',controller.logout)

module.exports=router