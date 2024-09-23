const express=require('express')
const path=require('path')
const rootdir=require('../utils/path')

const router =express.Router()

router.get('/add-product',(req,res,next)=>{
    //res.sendFile(path.join(__dirname,'..','views','add-product.html'))
    res.sendFile(path.join(rootdir,'views','add-product.html'))


})

router.post('/store-product',(req,res,next)=>{
    console.log('form data:',req.body);
    res.send('<b>Product submites</b>')
})

module.exports=router