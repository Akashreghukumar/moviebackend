const mongoose=require('mongoose')
const Schema=mongoose.Schema;


const userSchema=new Schema({
    username:{
        type:String,
        minlength:1,
        maxlength:25,
        required:true
    },
    email:{
        type:String,
        required:true

    },

    password:{
        type:String,
        required:true,
        minlength:5,

    },


})

const User=mongoose.model('User',userSchema,'user')
module.exports=User;