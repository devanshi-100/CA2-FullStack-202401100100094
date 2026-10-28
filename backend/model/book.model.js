const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    author:{
        type:String,
        required:true,
    },
    category:{
        type:String,
        required:true,
    },
    available:{
        type:Boolean,
        default:true,
    }
},{timestamps:true})

const Book = mongoose.model("Books",bookSchema);

module.exports=Book;
