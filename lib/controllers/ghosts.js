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
  .get('/:id', async (req, res, next) => {
    try {
      const getAGhost = await Ghost.getOneGhost(req.params.id);
      res.send(getAGhost);
    } catch (err) {
      next(err);
    }
  })
  .put('/:id', async (req, res, next) => {
    try {
      const changeGhost = await Ghost.changeOneGhost(
        req.params.id,
        req.body.scary
      );
      res.send(changeGhost);
    } catch (err) {
      next(err);
    }
  })
  .delete('/:id', async (req, res, next) => {
    try {
      const deleted = await Ghost.deleteGhost(req.params.id);
      res.send(deleted);
    } catch (err) {
      next(err);
    }
  });
