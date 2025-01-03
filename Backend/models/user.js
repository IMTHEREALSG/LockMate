const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    mobile_no:{type:Number,required:true,unique:true},
    username:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    createdAt:{type:Date,default:Date.now}
});

const User = mongoose.model('user',UserSchema);
module.exports = User;