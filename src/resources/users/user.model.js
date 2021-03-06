const uuid = require('uuid');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  id: {
    type: String,
    default: uuid
  },
  name: String,
  login: String,
  password: String
});

userSchema.statics.toResponse = user => {
  const { id, name, login } = user;
  return { id, name, login };
};

const User = mongoose.model('User', userSchema);

module.exports = User;
