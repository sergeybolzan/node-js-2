const NotFoundError = require('../../errors/notFoundError');
const Task = require('./task.model');

const getAll = async boardId => Task.find({ boardId });

const get = async (boardId, id) => {
  const task = await Task.findOne({ id, boardId });
  if (!task) {
    throw new NotFoundError(Task.modelName);
  }
  return task;
};

const create = async task => Task.create(task);

const update = async (boardId, id, task) => {
  const updatedTask = await Task.updateOne({ id, boardId }, task);
  if (!updatedTask) {
    throw new NotFoundError(Task.modelName);
  }
  return updatedTask;
};

const updateMany = async (filter, updates) => Task.updateMany(filter, updates);

const remove = async (boardId, id) => {
  const response = await Task.deleteOne({ id, boardId });
  if (!response.deletedCount) {
    throw new NotFoundError(Task.modelName);
  }
};

const deleteMany = async filter => Task.deleteMany(filter);

module.exports = {
  getAll,
  get,
  create,
  update,
  remove,
  deleteMany,
  updateMany
};
