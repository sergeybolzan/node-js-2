const router = require('express').Router();
const { NO_CONTENT } = require('http-status-codes');
const User = require('./user.model');
const usersService = require('./user.service');
const validator = require('../../utils/validation/validator');
const schemas = require('../../utils/validation/schemas');

router.get('/', async (req, res) => {
  const users = await usersService.getAll();
  res.json(users.map(User.toResponse));
});

router.post('/', validator(schemas.user), async (req, res) => {
  const user = new User(req.body);
  const createdUser = await usersService.create(user);
  res.json(User.toResponse(createdUser));
});

router.get('/:id', async (req, res) => {
  const user = await usersService.get(req.params.id);
  res.json(User.toResponse(user));
});

router.put('/:id', validator(schemas.user), async (req, res) => {
  const user = await usersService.update(req.params.id, req.body);
  res.json(User.toResponse(user));
});

router.delete('/:id', async (req, res) => {
  await usersService.remove(req.params.id);
  res.sendStatus(NO_CONTENT);
});

module.exports = router;
