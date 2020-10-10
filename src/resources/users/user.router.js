const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');

router.route('/').get(async (req, res) => {
  const users = await usersService.getAll();
  res.json(users.map(User.toResponse));
});

router.route('/').post(async (req, res) => {
  const user = new User(req.body);
  const createdUser = await usersService.create(user);
  return createdUser
    ? res.json(User.toResponse(createdUser))
    : res.status(400).send('Bad request');
});

router.route('/:id').get(async (req, res) => {
  const user = await usersService.get(req.params.id);
  return user
    ? res.json(User.toResponse(user))
    : res.status(404).send('User not found');
});

router.route('/:id').put(async (req, res) => {
  const user = await usersService.update(req.params.id, req.body);
  return user
    ? res.json(User.toResponse(user))
    : res.status(400).send('Bad request');
});

router.route('/:id').delete(async (req, res) => {
  const isRemoved = await usersService.remove(req.params.id);
  return isRemoved
    ? res.sendStatus(204)
    : res.status(404).send('User not found');
});

module.exports = router;
