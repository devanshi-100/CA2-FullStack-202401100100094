const express = require('express')
const {addBook,displayBooks,updateBook} = require("../controller/book.controller.js")

const router =  express.Router();

router.post("/",addBook);
router.get("/",displayBooks);
router.patch("/:id",updateBook);

module.exports=router;