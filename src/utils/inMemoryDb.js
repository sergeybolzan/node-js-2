const User = require('../resources/users/user.model');
const Board = require('../resources/boards/board.model');
const Task = require('../resources/tasks/task.model');

const database = {
  Users: [new User(), new User(), new User()],
  Boards: [new Board()],
  Tasks: [new Task(), new Task(), new Task()]
};

const getAll = tableName => database[tableName];

const get = (tableName, id) => {
  return database[tableName].find(entity => entity.id === id);
};

const add = (tableName, entity) => {
  const table = database[tableName];
  table.push(entity);
  return get(tableName, entity.id);
};

const update = (tableName, id, data) => {
  const table = database[tableName];
  const index = table.findIndex(entity => entity.id === id);
  if (data && index) {
    table[index] = { id: table[index].id, ...data };
    return get(tableName, id);
  }
};

const remove = (tableName, id) => {
  const table = database[tableName];
  const index = table.findIndex(entity => entity.id === id);
  const isEntityFound = index > -1;
  if (isEntityFound) table.splice(index, 1);
  return isEntityFound;
};

const updateMany = (tableName, key, oldValue, newValue) => {
  database[tableName]
    .filter(entity => entity[key] === oldValue)
    .forEach(entity => (entity[key] = newValue));
};

const removeMany = (tableName, key, value) => {
  database[tableName] = database[tableName].filter(
    entity => entity[key] !== value
  );
};

module.exports = {
  getAll,
  get,
  add,
  update,
  remove,
  updateMany,
  removeMany
};
