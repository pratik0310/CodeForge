import express from 'express';
import dotenv from 'dotenv';
import { ENV } from './lib/env.js';
import path from 'path';
dotenv.config();
const app=express();
const __dirname =path.resolve();
// app.get("/",(req,res)=>{
//     res.status(200).json({message:"success from ap243" });
// })

app.get("/health",(req,res)=>{
    res.status(200).json({message:"healthy" });
})
//make our ready for deploment

app.get("/books", (req, res) => {
    res.status(200).json({ msg: "List of books" });
})
if(ENV.NODE_ENV==="production"){
app.use(express.static(path.join(__dirname,'../frontend/dist')));

app.get("/{*any}",(req,res)=>{
    res.sendFile(path.join(__dirname,'../frontend/dist/index.html'));
})
}
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
