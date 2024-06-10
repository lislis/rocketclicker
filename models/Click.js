const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ClickSchema = new mongoose.Schema({
  by: { type: Schema.Types.ObjectId, ref: 'User' },
  username: { type: String, required: true, default: 'anonymous animal' },
  created_date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Click', ClickSchema);
