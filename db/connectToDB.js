import mongoose from "mongoose"

export const connect = async () =>{
    try{
     let connect = await mongoose.connect("mongodb+srv://e4179100:MOMyPwQjTUHLKfx3@winesdb.cgh8jfk.mongodb.net/")
     console.log("mongo db connected")
    }
    catch(err){
        console.log(err);
        console.log("cannot connect to db")
        process.exit(1)
    }
}