var express = require('express');
var router = express.Router();


router.use(express.json());

// Sign Up Endpoint
router.post('/signup', (req, res) => {
    const { email, username, password1, password2 } = req.body;

  // Check for missing parameters
  if (!email || !username || !password1 || !password2) {
    return res
      .status(400)
      .json({ message: 'One or more of the required parameters are missing' });
  }

  // Check if passwords match
  if (password1 !== password2) {
    return res.status(400).json({ message: "Both passwords don't match" });
  }


  // Respond with success
  res.status(201).json({ message: 'User registered successfully' });
});

// Login Endpoint
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Check for missing parameters
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }




  // Respond with success or failure
  res.status(200).json({ message: 'User logged in successfully' });
});

module.exports = router;
