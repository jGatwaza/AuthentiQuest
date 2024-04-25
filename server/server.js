require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');
const cookieParser = require('cookie-parser'); 
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: ['http://localhost:3000'], 
    credentials: true 
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

        res.json(images); 
    } catch (e) {
        console.error("Error connecting to MongoDB:", e);
        res.status(500).send('Error fetching images.');
    } finally {
        await client.close();
    }
});
app.get('/people', async (req, res) => {
  try {
      await client.connect();
      const database = client.db('people');
      const collection = database.collection('people');

      const people = await collection.find().toArray();

      res.json(people); 
  } catch (e) {
      console.error("Error connecting to MongoDB:", e);
      res.status(500).send('Error fetching images.');
  } finally {
      await client.close();
  }
});
app.post('/api/score', async (req, res) => {
  try {
    await client.connect();
    const database = client.db('people');
    const collection = database.collection('people');

    const { userId, username ,score } = req.body; 

    const updateResult = await collection.updateOne(
      { userId: userId },
      { $set: { username: username, score: score } }, 
      { upsert: true } 
    );

    if (updateResult.matchedCount === 0 && updateResult.upsertedCount === 0) {
      res.status(404).json({ error: "No user found and no insert done" });
    } else {
      res.status(200).json({ message: "Score updated successfulli" });
    }
  } catch (e) {
    console.error("Error updating score in MongoDB:", e);
    res.status(500).send('Failed to update score.');
  } finally {
    await client.close();
  }
});

app.get('/api/score/:userId', async (req, res) => {
  const userId = req.params.userId;
  try {
    await client.connect();
    const database = client.db('people'); 
    const scores = database.collection('people'); 

    const query = { userId: userId };
    const userScore = await scores.findOne(query);

    if (userScore) {
      res.json(userScore);
    } else {
      res.status(404).json({ message: "No score found for this user" });
    }
  } catch (e) {
    console.error("Error connecting to MongoDB:", e);
    res.status(500).send('Error fetching score.');
  } finally {
    await client.close();
  }
});


app.post('/api/logout', (req, res) => {
  res.clearCookie('session_token');
  res.status(200).send({ message: 'Logged out successfully' });
});
  
  app.get('/api/challenge', (req, res) => {
    res.send("Challenge Endpoint hit");
  });
  
  
  app.post('/api/score' ,(req, res) => {
    res.send("Score Endpoint hit");
  });
  
 
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
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});