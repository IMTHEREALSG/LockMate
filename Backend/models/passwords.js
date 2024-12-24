const mongoose = require('mongoose');
 
const  PasswordSchema = new mongoose.Schema({
    pname:{type:String,required:true},
    pword:{type:String,required:true},
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:true
    }
});

const PassEntry = mongoose.model('passwords',PasswordSchema);

module.exports = PassEntry;