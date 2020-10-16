const { NOT_FOUND } = require('http-status-codes');

class NotFoundError extends Error {
  constructor(entity) {
    super(`${entity} not found`);
    this.status = NOT_FOUND;
  }
}

module.exports = NotFoundError;
