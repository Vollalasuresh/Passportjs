var express=require('express');
var router=express.Router();
var passport=require('passport');


router.get('/',(req,res)=>
{
    res.render('home')
})

module.exports=router;
