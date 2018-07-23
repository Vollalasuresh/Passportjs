var express=require('express');
var router=express.Router();
var passport=require('passport')

 var User=require('../models/user')

router.get('/login',(req,res)=>
{
    res.render('login')
})
router.get('/register',(req,res)=>
{
    res.render('register')

})

router.post('/register',passport.authenticate('local.register',{
    successRedirect:'/login',
    failureRedirect:'/register',
    failureFlash:true
}))
router.post('/login',passport.authenticate('local.login',{
    successRedirect:'/show',
    failureRedirect:'/login',
    failureFlash:true
}))
router.get('/show',isLoggedIn,(req,res)=>
{
    res.render('show')
})
router.get('/logout',(req,res)=>
{
    req.logout();
    res.redirect('/')
})
module.exports=router;

function isLoggedIn(req,res,next)
{
    if(req.isAuthenticated())
        {
            return next();

        }
        res.redirect('/login')

}