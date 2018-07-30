var express=require('express');
var router=express.Router();
var passport=require('passport')

 var User=require('../models/user')

router.get('/login',(req,res)=>
{
   login_err=req.flash('loginError');
   password_err=req.flash('passwordError')
    console.log("########",password_err)
    res.render('login',{login_err,password_err})
})
router.get('/register',(req,res)=>
{
    usererrr_msg=req.flash('userExists')
    res.render('register',{usererrr_msg})

})

router.post('/register',passport.authenticate('local.register',{
    successRedirect:'/show',
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