const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Please provide username'],
    minlength: 3,
    maxlength: 50,
  },
  password: {
    type: String,
    required: [true, 'Please provide password'],
    minlength: 6,
  },
});

module.exports = mongoose.model('user', UserSchema);
