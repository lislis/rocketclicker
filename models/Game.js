const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GameSchema = new mongoose.Schema({
  level: { type: Number, default: 1 },
  created_date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Game', GameSchema);
