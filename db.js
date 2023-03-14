import mongoose from "mongoose";

export function databaseConnection(){
    const params={
        useNewUrlparser:true,
        useUnifiedTopology:true,
    };
    try{
        mongoose.connect(process.env.MONGO_URL,parans)
        console.log("mongo db is connected")
    } catch (error){
        console.log("mongodb connection error",error)

    }
}