const { Schema, model } = require('mongoose');

const Flight = new Schema({
    flightName: { type: String, required: true },
    direction: { 
        from: { type: String, required: true },
        to: { type: String, required: true }
    },
    departureTime: { type: String, required: true },
    departureDate: { type: String, required: true },
    arrivalTime: { type: String, required: true },
    arrivalDate: { type: String, required: true },
    price: { type: Number, required: true },
    status: { type: String, required: true },
    seats: [{
        сlass: { type: String, required: true },
        number: { type: Number, required: true },
        isFree: { type: Boolean, required: true, default: true }
    }]
})

module.exports = model('Flight', Flight)