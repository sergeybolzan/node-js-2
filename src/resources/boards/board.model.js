const uuid = require('uuid');
const mongoose = require('mongoose');

const boardSchema = new mongoose.Schema({
  id: {
    type: String,
    default: uuid
  },
  title: String,
  columns: Array
});

const Board = mongoose.model('Board', boardSchema);

module.exports = Board;
