const express = require('express');
const dotenv = require('dotenv');
const app = require('./src/app');
const connectDB = require('./src/config/db');

dotenv.config();
connectDB();

const PORT = (process.env.PORT || 5000);
app.listen(PORT,()=>{
    console.log(`Server running on the PORT : ${PORT}`);
})
