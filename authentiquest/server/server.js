require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json()); // Middleware to parse JSON
const authRoutes = require('./auth');
app.use('/api', authRoutes);

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Placeholder route for login
app.post('/api/login', (req, res) => {
    res.send("Login Endpoint hit");
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
const connectDB = require('./database'); // Adjust the path as necessary
connectDB();
