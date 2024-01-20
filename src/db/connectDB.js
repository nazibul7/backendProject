import mongoose from "mongoose";
import { DB_NAME } from "../constants.js"

const connectDB = async () => {
    try {
        const connect = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`MONGODB connected !! DB HOST : ${connect.connection.name}`);
    } catch (error) {
        console.error(`MONGODB connection error`, error);
        process.exit(1)
    }
}

export { connectDB }
