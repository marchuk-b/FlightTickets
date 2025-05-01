const { Schema, model } = require('mongoose');

const SeatSchema = new Schema({
  seatId: {
    type: String,
    required: true,
  },
  seatClass: {
    type: String,
    enum: ['economy', 'business', 'first'],
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
  }
}, { _id: false });

module.exports = model('Seat', SeatSchema)