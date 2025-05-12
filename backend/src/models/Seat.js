const { Schema, model } = require('mongoose');

const SeatSchema = new Schema({
  flightId: {
    type: Schema.Types.ObjectId,
    ref: 'Flight',
    required: true
  },
  seatId: {
    type: String,
    required: true,
  },
  seatClass: {
    type: String,
    enum: ['economy', 'business'],
    required: true,
  },
  isReserved: {
    type: Boolean,
    default: false,
  },
  reservedBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    default: null,
  },
  row: {
    type: String,
    required: true,
  },
  column: {
    type: Number,
    required: true,
  }
});

module.exports = model('Seat', SeatSchema)