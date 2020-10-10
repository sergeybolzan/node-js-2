const database = require('../../utils/inMemoryDb');

const getAll = async () => database.getAll('Users');

const get = async id => database.get('Users', id);

const create = async user => database.add('Users', user);

const update = async (id, user) => database.update('Users', id, user);

const remove = async id => database.remove('Users', id);

module.exports = { getAll, get, create, update, remove };
