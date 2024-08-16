import mongoose from "mongoose";

console.log("we are logging here inside connectdb");


export const connectDb=async ()=>{
   
    try{
        console.log(process.env.MONGO_URI);
        const conn=await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDb Connectd :${conn.connection.host}`)

    }catch(error){
        console.log("here is error");
        console.log("Error conction to mongoDB:",error.message)
        process.exit(1) //1=failure 0=success  
    }
}