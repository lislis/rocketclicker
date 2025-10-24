const express = require('express');
const router = express.Router();

const Game = require('../models/Game.js');
const Click = require('../models/Click.js');

router.get('/', async (req, res, next) => {
  const g = await Game.find();
  res.setHeader('Content-Type', 'application/json');
  return res.json(g);
});

router.post('/', async (req, res, next) => {
  const g = new Game(req.body);
  await g.save();
  req.app.ws.emit('new-game', { message: g });
  res.setHeader('Content-Type', 'application/json');
  return res.json(g);
});

router.delete('/', async (req, res, next) => {
  await Game.findOneAndDelete({});
  await Click.deleteMany({});
  req.app.ws.emit('delete-all-clicks');
  req.app.ws.emit('delete-game');
  res.setHeader('Content-Type', 'application/json');
  return res.json({ message: "all deleted"});
});


router.patch('/:gameId', async (req, res, next) => {
  const g = await Game.findOneAndUpdate({ _id: req.params.gameId },
                                        req.body,
                                        { new: true });
  req.app.ws.emit('update-game', { message: g });
  res.setHeader('Content-Type', 'application/json');
  return res.json(g);
});



router.put('/:gameId', async (req, res, next) => {
  const g = await Game.findOneAndUpdate({ _id: req.params.gameId },
                                        req.body,
                                        { new: true });
  req.app.ws.emit('update-game', { message: g });
  res.setHeader('Content-Type', 'application/json');
  return res.json(g);
});


module.exports = router;
