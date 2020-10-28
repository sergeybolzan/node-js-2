const tasksRepo = require('./task.db.repository');

const getAll = boardId => tasksRepo.getAll(boardId);

const get = (boardId, id) => tasksRepo.get(boardId, id);

const create = task => tasksRepo.create(task);

const update = (boardId, id, task) => tasksRepo.update(boardId, id, task);

const updateMany = (filter, updates) => tasksRepo.updateMany(filter, updates);

const remove = (boardId, id) => tasksRepo.remove(boardId, id);

const deleteMany = filter => tasksRepo.deleteMany(filter);

module.exports = {
  getAll,
  get,
  create,
  update,
  updateMany,
  remove,
  deleteMany
};
