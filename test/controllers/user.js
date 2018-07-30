var express=require('express');
var router=express.Router();
var passport=require('passport');

var user=require('../models/user');


router.get('/register',(req,res)=>
{
    res.render('register')
});
router.post('/register',passport.authenticate('local.signin',{
    successRedirect:'/login',
    failureRedirect:'/register',
    failureFlash: true

}))
router.get('/login',(req,res)=>
{
    res.render('login')
})


module.exports=router;
