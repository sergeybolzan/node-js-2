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
  return createdBoard
    ? res.json(createdBoard)
    : res.status(400).send('Bad request');
});

router.route('/:id').get(async (req, res) => {
  const board = await boardsService.get(req.params.id);
  return board ? res.json(board) : res.status(404).send('Board not found');
});

router.route('/:id').put(async (req, res) => {
  const board = await boardsService.update(req.params.id, req.body);
  return board ? res.json(board) : res.status(400).send('Bad request');
});

router.route('/:id').delete(async (req, res) => {
  const isRemoved = await boardsService.remove(req.params.id);
  return isRemoved
    ? res.sendStatus(204)
    : res.status(404).send('Board not found');
});

module.exports = router;
