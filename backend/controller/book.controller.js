const Book = require("../model/book.model.js");

const addBook=async(req,res)=>{
    const {title,author,category}=req.body;
    if(!title.trim() || !author.trim() || !category.trim()){
        return res.status(400).json({
            msg:"all fields are required"
        })
    }
    const newBook = {
        title:title,
        author,
        category
    }
    await Book.create(newBook);

    return res.status(200).json({
        msg:"Book added successfully"
    })
}

const displayBooks=async(req,res)=>{
    const page = parseInt(req.query.page,10)||1;
    const limit = parseInt(req.query.limit,10)||10;
    const santPage = page>1?page:1;
    const santLimit = limit<1?10:limit;
    const skip = (santPage-1)*santLimit;

    const [Books,totalBooks] = await Promise.all([
        Book.find().sort({createdAt:-1}).skip(skip).limit(santLimit),
        Book.countDocuments()
    ])
    // console.log(Books+" "+totalBooks+" ");
    const totalPages = Math.ceil(totalBooks/santLimit);
    return res.status(200).json({
        msg:"successfully Books fetched",
        metadata:{
            totalBookRecords:totalBooks,
            currentPage:page,
        },
        Books:Books,
    })
}

const updateBook=async(req,res)=>{
    const id =req.params.id;
    if(!id){
        return res.status(400).json({
            msg:"id is required"
        })
    }

    const book = await Book.findOne({_id:id});
    if(!book){
        return res.status(400).json({
            msg:"Book not found"
        })
    }
    await Book.findByIdAndUpdate(
        id,
        {$set:{available:false}},
        {new:true}
    )
    return res.status(200).json({
        msg:"Book status updated successfully",
    })
}

module.exports={addBook,displayBooks,updateBook};