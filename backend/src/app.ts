import express,{ Request,Response } from "express";
import connectDB from "./config/db";
import dotenv from 'dotenv'
import 'reflect-metadata'
import nodeRouter from "./routes/node.routes";
import cors from 'cors'
const app=express()

app.use(cors())
app.use(express.json())
dotenv.config()


connectDB()

app.use('/api',nodeRouter)

app.listen(3000,()=>{
    console.log('Servcer Running Successfully http://localhost/3000')
})