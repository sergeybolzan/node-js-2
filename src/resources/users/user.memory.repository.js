const database = require('../../utils/inMemoryDb');
const TABLE_NAME = 'Users';

const getAll = async () => await database.getAll(TABLE_NAME);

const get = async id => {
  const user = await database.get(TABLE_NAME, { id });
  if (!user) {
    throw new Error('User not found');
  }
  return user;
};

const create = async user => await database.add('Users', user);

const update = async (id, user) => {
  const updatedUser = await database.update(TABLE_NAME, { id }, user);
  if (!updatedUser) {
    throw new Error('User not found');
  }
  return updatedUser;
};

const remove = async id => {
  const isDeleted = await database.remove(TABLE_NAME, { id });
  if (!isDeleted) {
    throw new Error('User not found');
  }
};

module.exports = { getAll, get, create, update, remove };
