const express = require('express');
const router = express.Router();

const Click = require('../models/Click.js');

router.get('/', async (req, res, next) => {
  const c = await Click.find();
  return res.json(c);
});

router.post('/', async (req, res, next) => {
  const c = new Click(req.body);
  await c.save();
  req.app.ws.emit('new-click', { message: c });
  return res.json(c);
});

router.post('/deleteallclicks', async (req, res, next) => {
  Click.remove({});
  req.app.ws.emit('delete-all-clicks');
  return res.json({ message: 'all clicks removed' });
});


module.exports = router;
