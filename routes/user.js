const express = require('express');
const router = express.Router();

const User = require('../models/User.js');

router.get('/', async (req, res, next) => {
  const u = await User.find();
  return res.json(u);
});

router.post('/', async (req, res, next) => {
  const u = new User(User.new(req.body.socket));
  await u.save();
  req.app.ws.emit('new-user', { message: u });
  return res.json(u);
});


// maybe we don't need that since the server takes care of deleting via socket
router.delete('/:userId', async (req, res, next) => {
  const u = await User.findOneAndDelete({_id: req.params.userId });
  req.app.ws.emit('remove-user', { message: u });
  return res.json(u);
});


module.exports = router;
