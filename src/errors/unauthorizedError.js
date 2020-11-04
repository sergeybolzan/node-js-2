const { UNAUTHORIZED } = require('http-status-codes');

class UnauthorizedError extends Error {
  constructor() {
    super('Access token is missing or invalid');
    this.status = UNAUTHORIZED;
  }
}

module.exports = UnauthorizedError;
