const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const { anonymousAnimal } = require('../util/animals.js');

const UserSchema = new mongoose.Schema({
  name: String,
  socket: String,
  created_date: { type: Date, default: Date.now },
});

UserSchema.static('new', function newUser(socket = null) {
  return {
    name: anonymousAnimal(),
    socket,
  };
});

module.exports = mongoose.model('User', UserSchema);
