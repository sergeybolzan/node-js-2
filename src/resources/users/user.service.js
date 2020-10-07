const usersRepo = require('./user.memory.repository');

const getAll = () => usersRepo.getAll();

const create = body => usersRepo.create(body);

const getOne = id => usersRepo.getOne(id);

const update = body => usersRepo.update(body);

const deleteOne = id => usersRepo.deleteOne(id);

module.exports = { getAll, create, getOne, update, deleteOne };
