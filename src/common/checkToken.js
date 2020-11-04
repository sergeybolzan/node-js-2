const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('./config');
const UnauthorizedError = require('../errors/unauthorizedError');

module.exports = (req, res, next) => {
  const authHeader = req.header('Authorization');
  if (authHeader) {
    const [type, token] = authHeader.split(' ');
    if (type === 'Bearer') {
      try {
        jwt.verify(token, JWT_SECRET_KEY);
      } catch (e) {
        throw new UnauthorizedError();
      }
      return next();
    }
  }
  throw new UnauthorizedError();
};
