const NotFoundError = require('../../errors/notFoundError');
const User = require('./user.model');

const getAll = async () => User.find({});

const get = async id => {
  const user = await User.findOne({ id });
  if (!user) {
    throw new NotFoundError(User.modelName);
  }
  return user;
};

const create = async user => User.create(user);

const update = async (id, user) => {
  const updatedUser = await User.updateOne({ id }, user);
  if (!updatedUser) {
    throw new NotFoundError(User.modelName);
  }
  return updatedUser;
};

const remove = async id => {
  const deletedCount = (await User.deleteOne({ id })).deletedCount;
  if (!deletedCount) {
    throw new NotFoundError(User.modelName);
  }
};

module.exports = { getAll, get, create, update, remove };
