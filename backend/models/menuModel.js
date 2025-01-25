const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide menu item name'],
  },
  category: {
    type: String,
    default: 'others',
  },
  price: {
    type: Number,
    required: [true, 'Please provide menu item price'],
  },
  availability: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model('menu', menuSchema);
