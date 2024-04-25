const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.generateAuthToken = async (user) => {
  const token = jwt.sign({ userID: user.userID }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE
  });
  return token;
};

exports.setTokenCookie = (res, token) => {
  // Set cookie with token
  res.cookie('token', token, {
    httpOnly: true,
    expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000)
  });
};

exports.authenticateUser = async (req, res, next) => {
  try {
    let token;
    if (req.cookies.token) {
      token = req.cookies.token;
    }
    if (!token) {
      return res.status(401).send({ message: 'Authentication failed. No token provided.' });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ userID: decoded.userID });
    if (!user) {
      throw new Error();
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(401).send({ message: 'Please authenticate.' });
  }
};
