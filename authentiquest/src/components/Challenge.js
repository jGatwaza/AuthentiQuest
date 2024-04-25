import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { signOut } from 'firebase/auth';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    NavLink
  } from 'react-router-dom';
import { database } from '../firebaseConfig';
import { useAuth } from '../AuthContext';

function Challenge() {
    const [images, setImages] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [feedback, setFeedback] = useState('');
    const [gameOver, setGameOver] = useState(false);
    const navigate = useNavigate();
    const { userId, username } = useAuth();
  
    useEffect(() => {
        fetch('http://localhost:3001/images')
            .then(response => response.json())
            .then(data => {
                // Shuffle the images before setting them to state
                const shuffledData = shuffleArray(data);
                setImages(shuffledData);
            })
            .catch(err => console.error('Error fetching images:', err));
    }, []);
    

    useEffect(() => {
        if (gameOver) {
            console.log("Game over detected, attempting to save score...");
            axios.post('http://localhost:3001/api/score', { userId, username, score })
                .then(() => {
                    console.log("Score saved successfully");
                    navigate('/score'); // Redirect to score page
                })
                .catch(error => console.error("Failed to save score:", error));
        }
    }, [gameOver, userId, username, score, navigate]);

    const handleGuess = (guess) => {
        if (!gameOver && images.length > 0) {
            const correctAnswer = images[currentIndex].origin;
            if (guess === correctAnswer) {
                setFeedback('Correct!');
                setScore((prevScore) => prevScore + 1);
            } else {
                setFeedback('Incorrect. Try again!');
            }
            setTimeout(() => {
                if (currentIndex < images.length - 1) {
                    setCurrentIndex((prevIndex) => prevIndex + 1);
                    setFeedback('');
                } else {
                    console.log("Setting game over to true..."); // Debug log
                    setGameOver(true);
                }
            }, 100);
        }
    };

    const handleClick = () => {
        signOut(database).then(() => navigate('/'));
    };

    // Helper function to shuffle the array
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]]; // Swap elements
        }
        return array;
    }

    return (
        <div>
            {/* Navigation and other JSX remain the same */}
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
            {/* Game content and feedback */}
            <p className='padded lead-p mt-4'>Score: {score}</p>
            <p className='text-center lead white mt-4'>There's 50 of these, how many can you get?</p>
            {!gameOver ? (
                images.length > 0 ? (
                    <div style={{ textAlign: 'center', padding: 10 }}>
                        <img 
                            src={images[currentIndex].url} 
                            alt="Gallery" 
                            style={{ height: '60vh' }}
                        />
                        <div className='mt-4'>
                            <button className= 'choice-btn regular' onClick={() => handleGuess('human')}>Real Image</button>
                            <button className = 'choice-btn danger' onClick={() => handleGuess('ai')}>AI Generated</button>
                        </div>
                        <h4 className='white currently-answered mt-3'>{currentIndex}/50 Answered</h4>
                    </div>
                ) : (
                    <p className='padded danger'>Loading images...</p>
                )
            ) : (
                <p></p>
            )}
        </div>
    );
}

export default Challenge;
