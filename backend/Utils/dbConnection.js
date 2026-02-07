import mongoose  from "mongoose";

//function to connect to the mongodb database
export const connectDB = async () =>{
    try{
        mongoose.connection.on('connected', ()=> 
            console.log("database connected"));
        
        await mongoose.connect(`${process.env.MONGODB_URL}/fixora`)
    } catch(error){
        console.log(error);

    }
}