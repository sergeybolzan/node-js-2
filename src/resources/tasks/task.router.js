const router = require('express').Router({ mergeParams: true });
const { NO_CONTENT } = require('http-status-codes');
const tasksService = require('./task.service');
const validator = require('../../utils/validation/validator');
const schemas = require('../../utils/validation/schemas');

router.get('/', async (req, res) => {
  const tasks = await tasksService.getAll(req.params.boardId);
  res.json(tasks);
});

router.post('/', validator(schemas.task), async (req, res) => {
  const task = await tasksService.create({
    ...req.body,
    boardId: req.params.boardId
  });
  res.json(task);
});

router.get('/:id', async (req, res) => {
  const task = await tasksService.get(req.params.boardId, req.params.id);
  res.json(task);
});

router.put('/:id', validator(schemas.task), async (req, res) => {
  const task = await tasksService.update(
    req.params.boardId,
    req.params.id,
    req.body
  );
  res.json(task);
});

router.delete('/:id', async (req, res) => {
  await tasksService.remove(req.params.boardId, req.params.id);
  res.sendStatus(NO_CONTENT);
});

module.exports = router;
