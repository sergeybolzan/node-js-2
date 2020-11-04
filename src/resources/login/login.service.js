const jwt = require('jsonwebtoken');
const userRepo = require('../users/user.db.repository');
const { JWT_SECRET_KEY } = require('../../common/config');
const { checkPassword } = require('../../common/hashHelper');
const ForbiddenError = require('../../errors/forbiddenError');

const signToken = async (userLogin, password) => {
  const user = await userRepo.get({ login: userLogin });
  const { password: hashedPassword } = user;
  const comparisonResult = await checkPassword(password, hashedPassword);
  if (!comparisonResult) {
    throw new ForbiddenError();
  }
  const { id, login } = user;
  return jwt.sign({ id, login }, JWT_SECRET_KEY);
};

module.exports = {
  signToken
};
