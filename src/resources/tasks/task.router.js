const router = require('express').Router({ mergeParams: true });
const Task = require('./task.model');
const tasksService = require('./task.service');

router.route('/').get(async (req, res) => {
  const tasks = await tasksService.getAll(req.params.boardId);
  res.json(tasks);
});

router.route('/').post(async (req, res) => {
  const task = new Task({ ...req.body, boardId: req.params.boardId });
  const createdTask = await tasksService.create(task);
  return createdTask
    ? res.json(createdTask)
    : res.status(400).send('Bad request');
});

router.route('/:id').get(async (req, res) => {
  const task = await tasksService.get(req.params.id);
  return task ? res.json(task) : res.status(404).send('Task not found');
});

router.route('/:id').put(async (req, res) => {
  const task = await tasksService.update(req.params.id, req.body);
  return task ? res.json(task) : res.status(400).send('Bad request');
});

router.route('/:id').delete(async (req, res) => {
  const isRemoved = await tasksService.remove(req.params.id);
  return isRemoved
    ? res.sendStatus(204)
    : res.status(404).send('Task not found');
});

module.exports = router;
