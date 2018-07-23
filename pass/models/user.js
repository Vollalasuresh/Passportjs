var mongoose=require('mongoose');
var bcrypt=require('bcrypt-nodejs')
var userSchema= mongoose.Schema({
    name:String,
    password:String,
});

userSchema.methods.encryptPassword=(password)=>
{
    return bcrypt.hashSync(password,bcrypt.genSaltSync(10),null)
}
userSchema.methods.validPassword=(password,user)=>

{

    console.log(password,user.password)
    return bcrypt.compareSync(password,user.password);
}

module.exports=mongoose.model('user',userSchema);
