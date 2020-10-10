const tasksRepo = require('./task.memory.repository');

const getAll = boardId => tasksRepo.getAll(boardId);

const get = id => tasksRepo.get(id);

const create = task => tasksRepo.create(task);

const update = (id, task) => tasksRepo.update(id, task);

const remove = id => tasksRepo.remove(id);

const removeByBoard = id => tasksRepo.removeByField('boardId', id);

const updateByUser = (id, value) =>
  tasksRepo.updateByField('userId', id, value);

module.exports = {
  getAll,
  get,
  create,
  update,
  remove,
  removeByBoard,
  updateByUser
};
