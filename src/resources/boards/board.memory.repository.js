const database = require('../../utils/inMemoryDb');
const TABLE_NAME = 'Boards';

const getAll = async () => await database.getAll(TABLE_NAME);

const get = async id => {
  const board = await database.get(TABLE_NAME, { id });
  if (!board) {
    throw new Error('Board not found');
  }
  return board;
};

const create = async board => await database.add(TABLE_NAME, board);

const update = async (id, board) => {
  const updatedBoard = await database.update(TABLE_NAME, { id }, board);
  if (!updatedBoard) {
    throw new Error('Board not found');
  }
  return updatedBoard;
};

const remove = async id => {
  const isDeleted = await database.remove(TABLE_NAME, { id });
  if (!isDeleted) {
    throw new Error('Board not found');
  }
};

module.exports = { getAll, get, create, update, remove };
