var express=require('express');
var bodyParser=require('body-parser');
var path=require('path');
var cookieParser=require('cookie-parser')
var session=require('express-session');
var pug=require('pug');
var mongoose=require('mongoose');
var passport=require('passport');
var ms=require('connect-mongo')(session);
var flash=require('express-flash')


mongoose.connect('mongodb://localhost:27017/passp');

var app=express();

app.set('view engine','pug');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname+'public')));
app.use(bodyParser.json());

app.use(cookieParser());
app.use(session({
    secret:'sec',
    resave:true,
    saveUninitialized:true,
    store: new ms({mongooseConnection:mongoose.connection})
}))
app.use(flash())
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')

var indexRoute=require('./controllers/index')
var userRoute=require('./controllers/user')



app.use('/',indexRoute);
app.use(userRoute)



app.listen(3000,()=>console.log("At 3000"));
