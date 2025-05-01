const { Schema, model } = require('mongoose');

const PlaneSchema = new Schema({
  name: { type: String, required: true },
  rows: { type: Number, required: true },
  columns: { type: Number, required: true },
  aisles: [{ type: Number }],
  classDistribution: {
    business: { type: Number, required: true },
    economy: { type: Number, required: true }
  }
});

module.exports = model('Plane', PlaneSchema);
