const { Schema, model } = require('mongoose');

const calcSchema = new Schema({
  op: { type: String, required: true },
  a: Number,
  b: Number,
  result: Number
}, { timestamps: true });

module.exports = model('Calculation', calcSchema);
