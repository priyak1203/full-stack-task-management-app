const mongoose = require('mongoose');

const MenuItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide menu item name'],
    minlength: [3, 'Name must be atleast 3 characters'],
    unique: [true, 'Menu item already exists'],
  },
  category: {
    type: String,
    enum: {
      values: ['appetizers', 'main course', 'desserts', 'others'],
      message: 'category value is not supported',
    },
    default: 'others',
  },
  price: {
    type: Number,
    message: 'price must be number',
    required: [true, 'Please provide menu item price'],
    min: [10, 'Price must be minimum 10'],
  },
  availability: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model('menu_item', MenuItemSchema);
