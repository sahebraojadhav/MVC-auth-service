import express from "express";
import cookieParser from "cookie-parser";
import { connect } from "mongoose";
import dotenv from 'dotenv'
dotenv.config()
import { connectDb } from "./db/connectDB.js";
import authRoutes from './routes/auth.routes.js'


const app=express();
const PORT=process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth",authRoutes);


app.get('/',(req,res)=>{
    res.send("hello form sahebrao");
})

app.listen(PORT,()=>{
    connectDb();
    console.log("server is running on port",PORT);
})

