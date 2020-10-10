const User = require('../resources/users/user.model');
const Board = require('../resources/boards/board.model');
const Task = require('../resources/tasks/task.model');

const database = {
  Users: [new User(), new User(), new User()],
  Boards: [new Board()],
  Tasks: [new Task(), new Task(), new Task()]
};

const getAll = (tableName, fields = {}) =>
  database[tableName].filter(entity => isFieldsEquals(entity, fields));

const get = (tableName, fields) =>
  database[tableName].find(entity => isFieldsEquals(entity, fields));

const add = (tableName, entity) => {
  const table = database[tableName];
  table.push(entity);
  return get(tableName, { id: entity.id });
};

const update = (tableName, fields, data) => {
  const table = database[tableName];
  const index = table.findIndex(entity => isFieldsEquals(entity, fields));
  if (data && index > -1) {
    table[index] = { ...data, id: table[index].id };
    return get(tableName, { id: fields.id });
  }
};

const remove = (tableName, fields) => {
  const table = database[tableName];
  const index = table.findIndex(entity => isFieldsEquals(entity, fields));
  const isEntityFound = index > -1;
  if (isEntityFound) {
    table.splice(index, 1);
  }
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

const isFieldsEquals = (entity, fields) =>
  Object.keys(fields).every(key => fields[key] === entity[key]);

module.exports = {
  getAll,
  get,
  add,
  update,
  remove,
  updateMany,
  removeMany
};
