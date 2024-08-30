import {z} from "zod";
import express from "express";
import { Book } from "../models/bookMode.js";
const router = express.Router();


const bookSchema = z.object({
    title : z.string().min(1,{message : "Can't be empty"}),
    author : z.string().min(6),
    publishYear : z.number().min(4)
})

//Creates a book into the database
router.post('/',async(req,res)=> {
    try {        
        //Zod validation
        const validatedData = bookSchema.parse(req.body);
        const { title, author, publishYear } = validatedData;

        if(!validatedData){
           return res.json({
            message : "Book Data format is not correct"
           })
        }
        const newBook = {
            title,author,publishYear
        }
        const book = await Book.create(newBook);

        return res.json({
           message : "Created successfully",
           book
          }
        )
    } 
    catch(e) {
        return res.json({
            message : "ERror"
        })
    }
})

//to get all the books from the database
router.get('/', async(req,res)=> {
    try{
       const books = await Book.find({});
       return res.json({
        message : "Books fetched succesfully!",
        count : books.length,
        data : books
    });
    }
    catch(e) {
     return res.json({
        message : "Error while getting all the books"
     })
    }
})

//GEt book by an id
router.get('/:id', async (req,res)=> {
    try {
        const {id} = req.params;
        const book = await Book.findById(id);

        return res.json({
            message  : "Succesfully fetched the book details",
            data : book
        })
    }
    catch(e) {
        return res.json({
            message : "There were some error while getting the book details"
        })
    }
})

//Update a book
router.put('/:id', async (req,res)=> {
    try {
        const validatedData = bookSchema.parse(req.body);
        const { title, author, publishYear } = validatedData;

        if(!validatedData){
           return res.json({
            message : "Book Data format is not correct"
           })
        }
        const id = req.params.id;
        const updatedData = {title, author, publishYear}
        const result = await Book.findByIdAndUpdate(id, updatedData);
        
        if(!result) {
            return res.status(404).json({
                message : "Updating the book not succesfull!"
            })
        }
        return res.status(200).json({
            message : "Book updated successfully!",
            updatedData
        })
    }
    catch(e) {
        return res.json({
            message : "Book not updated successfully",
        })
    }
})

//To delete a book
router.delete('/:id', async(req,res)=>{
    try {
        const {id} = req.params;
        const result = await Book.findByIdAndDelete(id);

        if(!result) {
            return res.status(404).json({
                message : "Book not found to be deleted"
            })
        }
        return res.status(200).json({
            message : "Book deleted successfully!"
        })
    }
    catch(e) {
        return res.status(500).json({
            message : "Error while deleting the book"
        })
    }
})

export default router