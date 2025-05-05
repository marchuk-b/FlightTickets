const { Schema, model } = require('mongoose');

const PlaneSchema = new Schema({
  name: { type: String, required: true },
  businessPart: {
    rows: { type: Number, required: true },
    columns: { type: Number, required: true },
    aisles: [{ type: Number }],
  },
  economPart: {
    rows: { type: Number, required: true },
    columns: { type: Number, required: true },
    aisles: [{ type: Number }],
  }
});

module.exports = model('Plane', PlaneSchema);
