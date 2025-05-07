const { Schema, model } = require('mongoose');

const TicketSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    email: { type: String, required: true },
    tel: { type: String, required: true },
    flight: { type: Schema.Types.ObjectId, ref: 'Flight', required: true },
    reservedSeats: [{ type: Schema.Types.ObjectId, ref: 'Seat', required: true }],
    price: { type: Number, required: true },
    status: {
        type: String,
        enum: ['Активний', 'Скасований', 'Очікує оплати'],
        default: 'Очікує оплати'
    },
    createdAt: { type: Date, default: Date.now }
});

module.exports = model('Ticket', TicketSchema)