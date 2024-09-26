const User = require('../models/user_model');
// const login_user = require('../models/loginUser_model');
const bcrypt = require('bcrypt');
const { hashPassword, verifyPassword } = require('../utils/password_validator');
const { generateToken } = require('../utils/verific');
// CRUD
async function signupUser(email, password) {
  try {
    const hashed_pass = hashPassword(password);
    if (hashed_pass == null) {
      return {
        success: false,
        message: 'password could not be hashed',
      };
    }
    let user = await User.create({
      email: email,
      password: hashed_pass,
    });
    return {
      success: true,
      message: `User created successfully with id ${user._id}`,
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
}

async function loginUser(email, password) {
  try {
    let existingUser = await User.findOne({
      email,
    });
    console.log(existingUser);
    if (!existingUser) {
      return {
        success: false,
        message: 'user not found ',
      };
    }
    const hashed_pass = existingUser.password;
    const isvalid = verifyPassword(password, hashed_pass);
    // if user details is not right
    if (!isvalid) {
      return {
        success: false,
        message: 'Details not valid',
      };
    }

    const token_generated = generateToken(existingUser._id);

    return {
      success: true,
      message: `User logged in successfully with id ${existingUser._id}`,
      token: token_generated,
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
}

module.exports = {
  signupUser,
  loginUser,
};
