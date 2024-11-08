const mongoose = require('mongoose')
require('dotenv').config({path:"../../.env"})

const connectDB = async ()=>{
    try{
        const connect = await mongoose.connect(process.env.MONGO_URI);
        console.log(`DB Connected successfully at ${connect.connection.host}` );
    }catch(error){
        console.log("DB Connection failed",error);
    }
}
module.exports = connectDB;