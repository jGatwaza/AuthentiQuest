require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const authRoutes = require('../routes/auth');
const connectDB = require('./database'); // Adjust the path as necessary
connectDB();

const app = express();
app.use(cors({ credentials: true, origin: 'http://localhost:3000' })); // Adjust CORS for your environment
app.use(express.json());
app.use(cookieParser());
app.use('/api', authRoutes);
app.use(express.json()); // Middleware to parse JSON
app.use('/api', authRoutes);

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Placeholder route for login
app.post('/api/login', (req, res) => {
    res.send("Login Endpoint hit");
  });
app.post('/api/register', (req, res) => {
  res.send("Register Endpoint hit");
});
  
  // Placeholder route for challenge
  app.get('/api/challenge', (req, res) => {
    res.send("Challenge Endpoint hit");
  });
  
  // Placeholder route for score
  app.post('/api/score', (req, res) => {
    res.send("Score Endpoint hit");
  });
  
  // Placeholder route for leaderboard
  app.get('/api/leaderboard', (req, res) => {
    res.send("Leaderboard Endpoint hit");
  });

