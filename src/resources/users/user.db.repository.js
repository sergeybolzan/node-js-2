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

const create = async user => User.create(await hashUserPassword(user));

const update = async (id, user) => {
  const userWithHashedPassword = await hashUserPassword(user);
  const updatedUser = await User.updateOne({ id }, userWithHashedPassword);
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

const hashUserPassword = async user => {
  const { password } = user;
  const hashedPassword = await hashPassword(password);
  return {
    ...user,
    password: hashedPassword
  };
};

module.exports = { getAll, get, create, update, remove };
