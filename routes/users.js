var express = require('express');
var router = express.Router();

const USERS = [];
/* GET users listing. */
router.get('/', function (req, res, next) {
  res.status(200).json({
    data: USERS,
  });
});

//MVC, MRC -> MRVC (Models, View, Routes, Controllers)
//

router.post('/signup', (req, res) => {
  const { email, password1, password2, username } = req.body;
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

  USERS.push({
    email: email,
    password: password1,
    username: username ? username : '',
  });
  return res.status(201).json({
    success: true,
    message: 'User created successfully',
  });
});

module.exports = router;
