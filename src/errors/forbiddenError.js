const { FORBIDDEN } = require('http-status-codes');

class ForbiddenError extends Error {
  constructor() {
    super('Incorrect login or password');
    this.status = FORBIDDEN;
  }
}

module.exports = ForbiddenError;
