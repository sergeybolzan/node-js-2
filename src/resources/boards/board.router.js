const router = require('express').Router();
const { NO_CONTENT } = require('http-status-codes');
const Board = require('./board.model');
const boardsService = require('./board.service');
const validator = require('../../utils/validation/validator');
const schemas = require('../../utils/validation/schemas');

router.get('/', async (req, res) => {
  const boards = await boardsService.getAll();
  res.json(boards);
});

router.post('/', validator(schemas.board), async (req, res) => {
  const board = new Board(req.body);
  const createdBoard = await boardsService.create(board);
  res.json(createdBoard);
});

router.get('/:id', async (req, res) => {
  const board = await boardsService.get(req.params.id);
  res.json(board);
});

router.put('/:id', validator(schemas.board), async (req, res) => {
  const board = await boardsService.update(req.params.id, req.body);
  res.json(board);
});

router.delete('/:id', async (req, res) => {
  await boardsService.remove(req.params.id);
  res.sendStatus(NO_CONTENT);
});

module.exports = router;
