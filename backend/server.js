// const express = require('express')
import express from 'express';
import { connectDB } from './config/db.js';
import prodductRouts from './routes/product.route.js';
import path from 'path';
import { configDotenv } from 'dotenv';

configDotenv();

const app = express();
const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

app.use(express.json());
app.use("/api/products", prodductRouts);

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "/frontend/dist")));
    app.get('*', (req,res) => {
        res.sendFile(path.resolve(__dirname,'frontend', 'dist', 'index.html'));
        console.log(path.resolve(__dirname,'frontend', 'dist', 'index.html'));
    });
}

app.listen(PORT, ()=>{
    connectDB();
    console.log('Server is running on http://localhost:'+PORT)
})