const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const authRoutes = require('./src/routes/authRoutes');

const app = express();
const PORT = 5000;

app.use(express.json())

if (!process.env.MONGO_URL) {
    console.error('MONGO_URL is not defined!');
    process.exit(1);
} else {
    console.log('MongoDB is connected!')
}

app.use('/api/auth', authRoutes)
async function start() {
    try {
        await mongoose.connect(`${process.env.MONGO_URL}`)
        app.listen(PORT, () => {
            console.log(`Server started on port ${PORT}`)
        })
    } catch (err) {
        console.error(err)
    }
}

start()







