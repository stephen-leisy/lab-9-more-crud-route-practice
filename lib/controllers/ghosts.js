const { Router } = require('express');
const Ghost = require('../models/Ghost');

module.exports = Router()
.post('/', async (req, res, next) => {
  try {
    const newGhost = await Ghost.makeNewGhost(req.body);
    res.send(newGhost);
  } catch (err) {
    next(err);
  }
})
.get('/', async (req, res, next) => {
    try {
        const allGhosts = await Ghost.getAllGhosts();
        res.send(allGhosts);
    } catch (err) {
        next(err);
    }
})
