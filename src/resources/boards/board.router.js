const router = require('express').Router();
const Board = require('./board.model');
const boardsService = require('./board.service');

router.route('/').get(async (req, res) => {
  const boards = await boardsService.getAll();
  res.json(boards);
});

router.route('/').post(async (req, res) => {
  const board = new Board(req.body);
  const createdBoard = await boardsService.create(board);
  res.json(createdBoard);
});

router.route('/:id').get(async (req, res) => {
  try {
    const board = await boardsService.get(req.params.id);
    res.json(board);
  } catch (err) {
    res.status(404).send(err.message);
  }
});

router.route('/:id').put(async (req, res) => {
  try {
    const board = await boardsService.update(req.params.id, req.body);
    res.json(board);
  } catch (err) {
    res.status(404).send(err.message);
  }
});

router.route('/:id').delete(async (req, res) => {
  try {
    await boardsService.remove(req.params.id);
    res.sendStatus(204);
  } catch (err) {
    res.status(404).send(err.message);
  }
});

module.exports = router;
