import {PORT, DB} from './config.js'
import mongoose from "mongoose";
// import { Book } from "./models/bookMode.js";
import cors from "cors"
import booksRoute from './routes/booksRoute.js'
import express from 'express';

const app = express();
app.use(express.json());
app.use(cors());

app.use('/books',booksRoute);

//W BookStore!!
app.get('/',(req,res)=>{
    return res.status(234).send("W BookStore")
})

app.listen(PORT,()=>{
    console.log(`Listening to localhost:${PORT}`)
});

mongoose.connect(DB).then(()=>{
    console.log('App connected to database');
}).catch((e)=>{
    console.log(e);
})