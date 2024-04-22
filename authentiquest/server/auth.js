const express = require('express');
const bcrypt = require('bcrypt');
const User = require('./models/User');

const router = express.Router();

router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();
    res.status(201).send("User registered");
  } catch (error) {
    res.status(500).json(error);
  }
});
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
      const user = await User.findOne({ username });
      if (!user) return res.status(404).send('User not found');
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).send('Invalid credentials');
  
      const token = jwt.sign({ id: user._id }, 'secret_key', { expiresIn: '1h' });
      res.status(200).json({ user: user._id, token });
    } catch (error) {
      res.status(500).json(error);
    }
  });
  
module.exports = router;
