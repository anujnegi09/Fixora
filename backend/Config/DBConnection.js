import mongoose  from "mongoose";
import {logger} from "../config/Logger.js";
//function to connect to the mongodb database
export const connectDB = async () =>{
    try{
        mongoose.connection.on('connected', ()=> 
            logger.info("database connected"));
        
        await mongoose.connect(`${process.env.MONGODB_URL}/fixora`)
    } catch(error){
        logger.error(`Error connecting to database: ${error.message}`);
    }
}