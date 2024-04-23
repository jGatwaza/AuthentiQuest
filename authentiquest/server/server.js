require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');
const cookieParser = require('cookie-parser'); // for handling cookies
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: ['http://localhost:3000'], // assuming your frontend runs on localhost:3000
    credentials: true // allow the frontend to send cookies
}));
const port = 3001;

const uri = "mongodb+srv://jgatwazakubwimana:2GgOFGoYabk2mrYo@cluster0.jcg8rvd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function connectToDatabase() {
  await client.connect();
  const database = client.db('images');
  alert( database.collection('images'));
}

app.get('/images', async (req, res) => {
    try {
        await client.connect();
        const database = client.db('images');
        const collection = database.collection('images');

        const images = await collection.find().toArray();

        res.json(images); // Send images as JSON
    } catch (e) {
        console.error("Error connecting to MongoDB:", e);
        res.status(500).send('Error fetching images.');
    } finally {
        await client.close();
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

app.get('/api/google-login', async (req, res) => {
  alert(res);
  const { token } = req.body; // Token received from GoogleLogin component
  const decoded = jwt.decode(token); // Assuming you are sending the JWT token from the client

  const db = await connectToDatabase();
  const users = db.collection('users');

  let user = await users.findOne({ email: decoded.email });

  if (!user) {
    // User does not exist, so create a new user
    const newUser = {
      email: decoded.email,
      name: decoded.name,
      googleId: decoded.sub, // Google's unique ID for the user
      tokens: []
    };
    await users.insertOne(newUser);
    user = newUser;
  }

  // Create a JWT token for our session management
  const userToken = jwt.sign({ userID: user._id }, process.env.JWT_SECRET, { expiresIn: '2h' });

  // Store the token in the user's record
  await users.updateOne({ _id: user._id }, { $push: { tokens: userToken } });

  // Set a cookie with the token
  res.cookie('session_token', userToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development', // secure in production
    maxAge: 7200000 // 2 hours in milliseconds
  });

  res.status(200).json({ message: 'Logged in successfully!' });
});

app.post('/api/logout', (req, res) => {
  res.clearCookie('session_token');
  res.status(200).send({ message: 'Logged out successfully' });
});
  // Placeholder route for challenge
  app.get('/api/challenge', (req, res) => {
    res.send("Challenge Endpoint hit");
  });
  
  // Placeholder route for score
  app.post('/api/score' ,(req, res) => {
    res.send("Score Endpoint hit");
  });
  
  // Placeholder route for leaderboard
  app.get('/api/leaderboard', (req, res) => {
    res.send("Leaderboard Endpoint hit");
  });
  app.get('/api/images', async (req, res) => {
    try {
      const images = await Image.find();
      res.json(images);
    } catch (error) {
      console.error("Error fetching images:", error);
      res.status(500).json({ error: "Failed to fetch images", details: error.message });
    }
  });
  