const router = require('express').Router();
const { NO_CONTENT } = require('http-status-codes');
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
  const board = await boardsService.get(req.params.id);
  res.json(board);
});

router.route('/:id').put(async (req, res) => {
  const board = await boardsService.update(req.params.id, req.body);
  res.json(board);
});

router.route('/:id').delete(async (req, res) => {
  await boardsService.remove(req.params.id);
  res.sendStatus(NO_CONTENT);
});

module.exports = router;
