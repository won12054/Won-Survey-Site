const mongoose = require('mongoose');
require('dotenv').config();

const uri = `${process.env.MONGODB_URI}`;

const connectDB = async() => {
    try {
        await mongoose.connect(uri);
        console.log('Connected to MongoDB Atlas');
    } catch (err) {
        console.error('Error connecting to MongoDB Atlas', err);
        process.exit(1);
    }
};

module.exports = connectDB;