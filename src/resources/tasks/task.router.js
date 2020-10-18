const router = require('express').Router({ mergeParams: true });
const { NO_CONTENT } = require('http-status-codes');
const Task = require('./task.model');
const tasksService = require('./task.service');
const validator = require('../../utils/validation/validator');
const schemas = require('../../utils/validation/schemas');

router.get('/', async (req, res) => {
  const tasks = await tasksService.getAll(req.params.boardId);
  res.json(tasks);
});

router.post('/', validator(schemas.task), async (req, res) => {
  const task = new Task({ ...req.body, boardId: req.params.boardId });
  const createdTask = await tasksService.create(task);
  res.json(createdTask);
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
  await tasksService.remove(req.params.id);
  res.sendStatus(NO_CONTENT);
});

module.exports = router;
