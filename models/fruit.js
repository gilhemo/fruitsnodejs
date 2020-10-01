const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const fruitSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  photoUrl: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Fruit', fruitSchema);
