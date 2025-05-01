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
    plane: { type: Schema.Types.ObjectId, ref: 'Plane', required: true },
    seats: [{ type: Schema.Types.ObjectId, ref: 'Seat' }]
})

module.exports = model('Flight', Flight)