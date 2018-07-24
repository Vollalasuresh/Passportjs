var passport=require('passport');
var LocalStrategy=require('passport-local').Strategy; 


var User=require('../models/user');
// var us=new user()
// console.log(us.encryptPassword)
passport.serializeUser((user,done)=>
{
    done(null, user.id)
});
passport.deserializeUser((id,done)=>
{
    user.findById(id,(err,user)=>
    {
        done(err,user)
    })

})

passport.use('local.signin',new LocalStrategy({
    usernameField:'name',
    passwordField:'password',
    passReqToCallback:true,

},(req,name,password,done)=>
{
    User.findOne({name:name},(err,urs)=>
    {
        if(err)
        {console.log(err)
        return done(err)
        }
        if(urs)
        {
            return done(null,false);
        }
        var s= new User();
        console.log(s.encryptPassword)
        s.name=req.body.name;
        s.password=s.encryptPassword(req.body.password);

        s.save((err)=>
        {
            if(err) return done(err);
        })
        return done(null,s);
    })
}));


