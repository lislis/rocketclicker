const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GameSchema = new mongoose.Schema({
  level: { type: Number, default: 1 },
  active: { type: Boolean, default: true },
  created_date: { type: Date, default: Date.now },
  jump_value: { type: Number, default: 2.0}
});

module.exports = mongoose.model('Game', GameSchema);
