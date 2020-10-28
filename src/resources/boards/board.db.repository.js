const NotFoundError = require('../../errors/notFoundError');
const Board = require('./board.model');

const getAll = async () => Board.find({});

const get = async id => {
  const board = await Board.findOne({ id });
  if (!board) {
    throw new NotFoundError(Board.modelName);
  }
  return board;
};

const create = async board => Board.create(board);

const update = async (id, board) => {
  const updatedBoard = await Board.updateOne({ id }, board);
  if (!updatedBoard) {
    throw new NotFoundError(Board.modelName);
  }
  return updatedBoard;
};

const remove = async id => {
  const deletedCount = (await Board.deleteOne({ id })).deletedCount;
  if (!deletedCount) {
    throw new NotFoundError(Board.modelName);
  }
};

module.exports = { getAll, get, create, update, remove };
