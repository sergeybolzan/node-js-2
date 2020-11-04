const bcrypt = require('bcrypt');
const { DEFAULT_SALT_ROUNDS } = require('./config');

const hashPassword = async password => {
  const salt = await bcrypt.genSalt(DEFAULT_SALT_ROUNDS);
  return await bcrypt.hash(password, salt);
};

const checkPassword = async (password, hash) =>
  await bcrypt.compare(password, hash);

module.exports = {
  hashPassword,
  checkPassword
};
