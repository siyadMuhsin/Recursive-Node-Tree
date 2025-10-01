import express,{ Request,Response } from "express";
import connectDB from "./config/db";
import dotenv from 'dotenv'
const app=express()
dotenv.config()


connectDB()
app.get('/',(req:Request,res:Response)=>{
    res.send('Hello World')
})
app.listen(3000,()=>{
    console.log('Servcer Running Successfully http://localhost/3000')
})