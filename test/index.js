var express= require('express');
var path= require('path')
var expressValidator=require('express-validator');
var bodyparser=require('body-parser');
var flash=require('connect-flash');
var session=require('express-session');
var passport=require('passport');
var mongoose=require('mongoose');
var cookieparser=require('cookie-parser');
var ms=require('connect-mongo')(session);
require('./config/passport')


var app=express();

mongoose.connect('mongodb://localhost:27017/Pass');
 

app.use(bodyparser.urlencoded({extended:true}))
app.use(cookieparser());
app.use(flash())
app.use(session({
    secret:'sec',
    resave:true,
    saveUninitialized:true,
    store:new ms({mongooseConnection:mongoose.connection})
}));
app.use(passport.initialize());
app.use(passport.session());


app.set('view engine','pug');

var homerouter=require('./controllers/index')
var userRouter=require('./controllers/user')
app.use(homerouter)
app.use(userRouter)
app.listen(9000,()=>console.log('At 9000'))



