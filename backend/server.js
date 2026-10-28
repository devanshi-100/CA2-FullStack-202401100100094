require('dotenv').config();
const express = require('express')
const mongoose = require('mongoose');
const bookRouter = require("./router/book.router.js")

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.use((req,res,next)=>{
    console.log("You are in server.")
    next();
})

mongoose.connect(process.env.MONGODB_URI)
.then(()=>{
    console.log("mongodb is connected")
}).catch(err=>{
    console.log(err);
})

app.use("/api/books",bookRouter);


app.listen(process.env.PORT,()=>{
    console.log("server is listning...")
})
