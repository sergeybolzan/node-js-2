const usersRepo = require('./user.memory.repository');
const tasksService = require('../tasks/task.service');

const getAll = () => usersRepo.getAll();

const get = id => usersRepo.get(id);

const create = user => usersRepo.create(user);

const update = (id, user) => usersRepo.update(id, user);

const remove = async id => {
  await usersRepo.remove(id);
  await tasksService.updateByUser(id, null);
};

module.exports = { getAll, get, create, update, remove };
