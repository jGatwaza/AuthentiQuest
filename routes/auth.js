const express = require('express');
const router = express.Router();
const User = require('../models/User');
const authMiddleware = require('../middleware/auth');

router.post('/register', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    const token = await authMiddleware.generateAuthToken(user);
    authMiddleware.setTokenCookie(res, token);
    res.status(201).send({ user, token });
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user || !(await user.comparePassword(req.body.password))) {
      return res.status(401).send({ message: 'Login failed! Check authentication credentials' });
    }
    const token = await authMiddleware.generateAuthToken(user);
    authMiddleware.setTokenCookie(res, token);
    res.send({ user, token });
  } catch (error) {
    res.status(400).send(error);
  }
});

// Add more routes as needed for scoring and leaderboard

module.exports = router;
