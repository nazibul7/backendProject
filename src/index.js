import dotenv from "dotenv"
import { connectDB } from "./db/connectDB.js";
import express from "express"
dotenv.config({
    path:"./env"
})


const app = express()
app.listen(process.env.PORT,()=>{
    console.log('Running');
})


connectDB()
    




















/*const connectDB = async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
    } catch (error) {
        console.error(error);
        throw err
    }
}*/