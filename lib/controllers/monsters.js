const { Router } = require('express');
const Monster = require('../models/Monster');

module.exports = Router()
  .post('/', async (req, res, next) => {
    try {
      const makeMonster = await Monster.insert(req.body);
      res.send(makeMonster);
    } catch (err) {
      next(err);
    }
  })
  .get('/', async (req, res, next) => {
    try {
      const getMonsters = await Monster.getAllMonsters();
      res.send(getMonsters);
    } catch (err) {
      next(err);
    }
  })
  .get('/:id', async (req, res, next) => {
    try {
      const aMonster = await Monster.getAMonster(req.params.id);
      res.send(aMonster);
    } catch (err) {
      next(err);
    }
  })
  .put('/:id', async (req, res, next) => {
    try {
      const changeMonster = await Monster.changeAMonster(
        req.params.id,
        req.body.name
      );
      res.send(changeMonster);
    } catch (err) {
      next(err);
    }
  })
  .delete('/:id', async (req, res, next) => {
    try {
      const deleteMonster = await Monster.deleteAMonster(req.params.id);
      res.send(deleteMonster);
    } catch (err) {
      next(err);
    }
  });
