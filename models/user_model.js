const mongoose = require('mongoose');

// model a user for our backend :  username,email, password, gender, dob, account_balance

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  username: {
    type: String,
    unique: false,
  },
  balance: {
    type: Number,
    default: 0,
  },
  gender: {
    enum: ['male', 'female', 'other'],
    type: String,
    default: 'other',
  },
  registration_date: {
    type: Date,
    default: Date.now,
  },
  firstname: {
    type: String,
    required: false,
    minlength: 3,
  },
  lastname: {
    type: String,
    required: false,
    minlength: 3,
  },
});

// add firstname and lastname property

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;
