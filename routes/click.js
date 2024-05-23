const express = require('express');
const router = express.Router();

const Click = require('../models/Click.js');

router.get('/', async (req, res, next) => {
  const c = await Click.find();
  res.setHeader('Content-Type', 'application/json');
  return res.json(c);
});

router.post('/', async (req, res, next) => {
  const c = new Click(req.body);
  await c.save();
  req.app.ws.emit('new-click', { message: c });
  res.setHeader('Content-Type', 'application/json');
  return res.json(c);
});

router.delete('/deleteallclicks', async (req, res, next) => {
  await Click.deleteMany({});
  req.app.ws.emit('delete-all-clicks');
  res.setHeader('Content-Type', 'application/json');
  return res.json({ message: 'all clicks removed' });
});


module.exports = router;
