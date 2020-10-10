const database = require('../../utils/inMemoryDb');

const getAll = async boardId => {
  const tasks = database.getAll('Tasks');
  return tasks.filter(task => task.boardId === boardId);
};

const get = async id => database.get('Tasks', id);

const create = async task => database.add('Tasks', task);

const update = async (id, task) => database.update('Tasks', id, task);

const remove = async id => database.remove('Tasks', id);

const removeByField = async (field, value) =>
  database.removeMany('Tasks', field, value);

const updateByField = async (field, id, value) =>
  database.updateMany('Tasks', field, id, value);

module.exports = {
  getAll,
  get,
  create,
  update,
  remove,
  removeByField,
  updateByField
};
