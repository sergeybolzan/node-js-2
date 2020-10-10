const database = require('../../utils/inMemoryDb');

const getAll = async () => database.getAll('Boards');

const get = async id => database.get('Boards', id);

const create = async board => database.add('Boards', board);

const update = async (id, board) => database.update('Boards', id, board);

const remove = async id => database.remove('Boards', id);

module.exports = { getAll, get, create, update, remove };
