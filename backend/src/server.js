import express from 'express';
import dotenv from 'dotenv';
import { ENV } from './lib/env.js';
dotenv.config();
const app=express();
console.log(ENV.PORT);
console.log(ENV.DB_URL);
app.get("/",(req,res)=>{
    res.status(200).json({message:"success from ap243" });
})

app.get("/health",(req,res)=>{
    res.status(200).json({message:"healthy" });
})
app.listen(3000,()=>{
    console.log("Server is running on port 3000");
})