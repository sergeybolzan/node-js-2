const router = require('express').Router({ mergeParams: true });
const { NO_CONTENT } = require('http-status-codes');
const Task = require('./task.model');
const tasksService = require('./task.service');

router.route('/').get(async (req, res) => {
  const tasks = await tasksService.getAll(req.params.boardId);
  res.json(tasks);
});

router.route('/').post(async (req, res) => {
  const task = new Task({ ...req.body, boardId: req.params.boardId });
  const createdTask = await tasksService.create(task);
  res.json(createdTask);
});

router.route('/:id').get(async (req, res) => {
  const task = await tasksService.get(req.params.boardId, req.params.id);
  res.json(task);
});

router.route('/:id').put(async (req, res) => {
  const task = await tasksService.update(
    req.params.boardId,
    req.params.id,
    req.body
  );
  res.json(task);
});

router.route('/:id').delete(async (req, res) => {
  await tasksService.remove(req.params.id);
  res.sendStatus(NO_CONTENT);
});

module.exports = router;
