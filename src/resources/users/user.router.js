const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');

router.route('/').get(async (req, res) => {
  const users = await usersService.getAll();
  res.json(users.map(User.toResponse));
});

router.route('/').post(async (req, res) => {
  const user = await usersService.create(req.body);
  return user
    ? res.json(User.toResponse(user))
    : res.status(400).send('Bad request');
});

router.route('/:id').get(async (req, res) => {
  const user = await usersService.getOne(req.params.id);
  return user
    ? res.json(User.toResponse(user))
    : res.status(404).send('User not found');
});

router.route('/:id').put(async (req, res) => {
  const user = await usersService.update({ id: req.params.id, body: req.body });
  return user
    ? res.json(User.toResponse(user))
    : res.status(400).send('Bad request');
});

router.route('/:id').delete(async (req, res) => {
  const isRemoved = await usersService.deleteOne(req.params.id);
  return isRemoved
    ? res.status(204) // .send('The user has been deleted')
    : res.status(404).send('User not found');
});

module.exports = router;
