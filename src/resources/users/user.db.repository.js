const NotFoundError = require('../../errors/notFoundError');
const User = require('./user.model');
const { hashPassword } = require('../../common/hashHelper');

const getAll = async () => User.find({});

const get = async filter => {
  const user = await User.findOne(filter);
  if (!user) {
    throw new NotFoundError(User.modelName);
  }
  return user;
};

const create = async user => {
  const { password } = user;
  const hashedPassword = await hashPassword(password);
  const newUser = {
    ...user,
    password: hashedPassword
  };
  return User.create(newUser);
};

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
