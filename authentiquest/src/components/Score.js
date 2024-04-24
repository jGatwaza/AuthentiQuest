import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { signOut } from 'firebase/auth';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    NavLink
  } from 'react-router-dom';
import { database } from '../firebaseConfig';

const Score = () => {
  const [score, setScore] = useState(null);
  const { userId, username } = useAuth();
  const navigate = useNavigate();
  const handleClick = () => {
    signOut(database).then(() => navigate('/'));
};
const getScoreMessage = score => {
  if (score < 5) return "I've never seen worse";
  else if (score < 10) return "Clearly AI can do better than you.";
  else if (score < 15) return "Got a long way to go.";
  else if (score < 20) return "AI is winning!";
  else if (score < 25) return "AI is caught up ";
  else if (score < 30) return "At least about average!";
  else if (score < 35) return "Keep trying, human!";
  else if (score < 40) return "Not bad!";
  else if (score < 45) return "AI has nothing on you!";
  else if (score < 50) return "Nearly perfect!";
  else return "You are humanity's hope!";
};
  useEffect(() => {
    axios.get(`http://localhost:3001/api/score/${userId}`)
        .then(response => {
            // Make sure the response has the data structure you expect
            setScore(response.data.score);
        })
        .catch(error => {
            console.error('Failed to fetch score:', error);
        });
}, [userId]);

    return (
        <div>
          <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#000000', padding: '0.5rem 1rem' }}>
          <div style={{ color: 'white', fontWeight: 'bold', fontSize: '24px' }} className='wrapper'>
            AuthentiQuest
          </div>
          <div className='wrapper'>
            {/* <NavLink to="/" className={({ isActive }) => (isActive ? "active-link" : "link")}>Login</NavLink> */}
            <NavLink to="/challenge" className={({ isActive }) => (isActive ? "active-link" : "link")}>Challenge</NavLink>
            <NavLink to="/score" className={({ isActive }) => (isActive ? "active-link" : "link")}>Score</NavLink>
            <NavLink to="/leaderboard" className={({ isActive }) => (isActive ? "active-link" : "link")}>Leaderboard</NavLink>
            <button onClick={handleClick} className='logoutb'>Sign out</button>
          </div>
        </nav>
            <div class="score-container">
        <div class="score-box">
            <div class="score-title">Your score</div>
            <div class="score-button">
                <span class="score-value text-center">{score !== null ? score : "..."}</span>
                <p className="score-message lead white text-center mb-4">{username}, {score !== null ? getScoreMessage(score) : "Computing your fate"}</p>
            </div>
            
        </div>
        <p className='lead white mt-4'>Checkout the leaderboard to see how others did</p>
    </div>
        </div>
    );
};

export default Score;