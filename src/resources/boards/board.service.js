const boardsRepo = require('./board.memory.repository');
const tasksService = require('../tasks/task.service');

const getAll = () => boardsRepo.getAll();

const get = id => boardsRepo.get(id);

const create = board => boardsRepo.create(board);

const update = (id, board) => boardsRepo.update(id, board);

const remove = async id => {
  const isDeleted = await boardsRepo.remove(id);
  if (isDeleted) {
    await tasksService.removeByBoard(id);
  }
  return isDeleted;
};

module.exports = { getAll, get, create, update, remove };
