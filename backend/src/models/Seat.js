const { Schema, model } = require('mongoose');

const SeatSchema = new Schema({
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
  }
});

module.exports = model('Seat', SeatSchema)