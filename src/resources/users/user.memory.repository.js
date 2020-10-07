const User = require('./user.model');

const users = [new User(), new User(), new User()];

const getAll = async () => {
  return users;
};

const create = async body => {
  if (body && body.name && body.login && body.password) {
    const user = new User(body);
    users.push(user);
    return user;
  }
  return null;
};

const getOne = async id => {
  return users.find(u => u.id === id);
};

const update = async ({ id, body }) => {
  const user = users.find(u => u.id === id);
  if (user && body) {
    if (body.name) user.name = body.name;
    if (body.login) user.login = body.login;
    if (body.password) user.password = body.password;
    return user;
  }
  return null;
};

const deleteOne = async id => {
  const index = users.findIndex(u => u.id === id);
  const isUserFound = index > -1;
  if (isUserFound) users.splice(index, 1);
  return isUserFound;
};

module.exports = { getAll, create, getOne, update, deleteOne };
