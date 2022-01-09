const mongoose=require('mongoose')
const Schema=mongoose.Schema;


const movieSchema=new Schema({
    movieName:{
        type:String,
        minlength:1,
        maxlength:25,
        required:true
    },
    year:{
        type:Number,
        required:true

    },

    category:{
        type:String,
        required:true,
        enum:['Comedy',"Action","Drama","Scifi"]

    },

    description:{
        type:String,
        minlength:5,
        maxlength:250,
        required:true
    }
})

const Movies=mongoose.model('Movie',movieSchema,'movie')
module.exports=Movies;