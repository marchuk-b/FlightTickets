const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const authRoutes = require('./src/routes/authRoutes');
const userRoutes = require('./src/routes/userRoutes');
const flightRoutes = require('./src/routes/flightRoutes');
const planeRoutes = require('./src/routes/planeRoutes');
const ticketRoutes = require('./src/routes/ticketRoutes');
const cookieParser = require('cookie-parser');
const cors = require('cors');


const app = express();
const PORT = 5000;

app.use(express.json())
app.use(cors({
    origin: "http://localhost:3000", // frontend адреса
    credentials: true
}));
app.use(cookieParser());

if (!process.env.MONGO_URL) {
    console.error('MONGO_URL is not defined!');
    process.exit(1);
} else {
    console.log('MongoDB is connected!')
}

app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/flights', flightRoutes)
app.use('/api/planes', planeRoutes)
app.use('/api/tickets', ticketRoutes)

app.get('/', (req, res) => {
    res.send('Server is running')
})

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







