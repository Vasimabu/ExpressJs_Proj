const express=require('express')
const path=require('path')
//const controller=require('../controller')
const router=express.Router()
const controller=require('../controller/users')

/* let visitCount = 0;

router.get('/', (req, res) => {
    visitCount++;
    res.status(200).render('home', { 
        doctitle: "Home Page", 
        visits: visitCount 
    });
}); */

/* router.get('/login',(req,res,)=>{
    const doctitle="login page"
    res.status(200).render('login',{ doctitle })
})

router.get('/register',(req,res,)=>{
    const msg = req.query.msg || null; // Default to null if not provided
    const doctitle = "Register Page";
    console.log({doctitle});
    
    res.render('register',{msg,doctitle})
})

router.get('/home',(req,res,)=>{
    const doctitle= "home page"
    res.status(200).render('home',{ doctitle})
})

router.get('/profile',(req,res,)=>{
    const doctitle ="profile page"
    res.status(200).render('profile',{ doctitle})
})

module.exports=router */


router.get('/', (req, res) => {
    const doctitle = "Login Page";
    const msg = req.query.msg || null;
    res.status(200).render('login', { doctitle, msg });
});

router.get('/register', (req, res) => {
    const doctitle = "Register Page";
    const msg = req.query.msg || null;
    res.status(200).render('register', { doctitle, msg });
});

router.get('/home', controller.isLoggedIn,(req, res) => {
   // console.log(req.name)
   if(req.user){
    const doctitle = "Home Page";
    const msg = req.query.msg || null;
    res.status(200).render('home', { user: req.user,doctitle, msg });
   }else{
    res.redirect('/')
   }
});

router.get('/profile',controller.isLoggedIn, (req, res) => {
    if(req.user){
        const doctitle = "Profile Page";
        const msg = req.query.msg || null;
        res.status(200).render('profile', {user:{Fullname: req.user.fullname,Email:req.user.email},doctitle, msg });
       }else{
        res.redirect('/')
       }
});

module.exports = router;
