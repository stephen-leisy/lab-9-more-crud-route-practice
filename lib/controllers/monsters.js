const { Router } = require('express');
const Monster = require('../models/Monster');

module.exports = Router().post('/', async (req, res, next) => {
  try {
    const makeMonster = await Monster.insert(req.body);
    res.send(makeMonster);
  } catch (err) {
    next(err);
  }
});
