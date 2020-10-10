const database = require('../../utils/inMemoryDb');
const TABLE_NAME = 'Tasks';

const getAll = async boardId => await database.getAll(TABLE_NAME, { boardId });

const get = async (boardId, id) => {
  const task = await database.get(TABLE_NAME, { boardId, id });
  if (!task) {
    throw new Error('Task not found');
  }
  return task;
};

const create = async task => await database.add(TABLE_NAME, task);

const update = async (boardId, id, task) => {
  const updatedTask = await database.update(TABLE_NAME, { boardId, id }, task);
  if (!updatedTask) {
    throw new Error('Task not found');
  }
  return updatedTask;
};

const remove = async id => {
  const isDeleted = await database.remove(TABLE_NAME, { id });
  if (!isDeleted) {
    throw new Error('Task not found');
  }
};

const removeByField = async (field, value) =>
  await database.removeMany(TABLE_NAME, field, value);

const updateByField = async (field, id, value) =>
  await database.updateMany(TABLE_NAME, field, id, value);

module.exports = {
  getAll,
  get,
  create,
  update,
  remove,
  removeByField,
  updateByField
};
