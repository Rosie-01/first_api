var express = require('express');
var router = express.Router();
var { signupUser, loginUser } = require('../controllers/user_controller');

router.post('/signup', async (req, res) => {
  const { email, password1, password2 } = req.body;
  if (!email || email < 5) {
    return res.status(406).json({
      success: false,
      message: 'Provide a valid email',
    });
  }
  if (password1 != password2) {
    return res.status(406).json({
      success: false,
      message: 'Both password do not match',
    });
  }
  if (password1.length < 8) {
    return res.status(406).json({
      success: false,
      message: 'Password length must be greater than 7 characters',
    });
  }

  const signup_state = await signupUser(email, password1);
  if (signup_state.success) {
    return res.status(201).json({
      success: true,
      message: signup_state.message,
    });
  } else {
    return res.status(500).json({
      success: false,
      message: signup_state.message,
    });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || email < 5) {
    return res.status(406).json({
      success: false,
      message: 'Provide a valid email',
    });
  }

  if (password.length < 8) {
    return res.status(406).json({
      success: false,
      message: 'Password length must be greater than 7 characters',
    });
  }

  const login_state = await loginUser(email, password);
  if (login_state.success) {
    return res.status(200).json({
      success: true,
      message: login_state.message,
      token: login_state.token,
    });
  } else {
    return res.status(500).json({
      success: false,
      message: login_state.message,
    });
  }
});

module.exports = router;
