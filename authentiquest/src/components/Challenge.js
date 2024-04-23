import { signOut } from 'firebase/auth';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

import {
    BrowserRouter as Router,
    Routes,
    Route,
    NavLink
  } from 'react-router-dom';

import { db } from '../firebaseConfig';
import { database } from '../firebaseConfig';
import { doc, updateDoc } from 'firebase/firestore';
import { collection, addDoc } from 'firebase/firestore';
import {useNavigate} from 'react-router-dom';
import { useAuth } from '../AuthContext';
function Challenge() {
    const [images, setImages] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [feedback, setFeedback] = useState('');
    const [gameOver, setGameOver] = useState(false);
    const history = useNavigate();
    const { userId } = useAuth();
  
    const updateScoreInFirestore = async (newScore) => {
      if (userId) {
        console.log(userId);
        const userDocRef = doc(db, 'users', userId);
  
        try {
          await updateDoc(userDocRef, {
            score: newScore
          });
          alert("Score updated successfully");
        } catch (error) {
          alert("Error updating score: ", error);
        }
      }
      else{
        alert("User not authenticated");
      }
    };
    const saveNewScoreInFirestore = async (userId, newScore) => {
        if (!userId) {
          console.log("User not authenticated");
          return; // Exit if there is no user ID
        }
      
        console.log(`Attempting to save score for user ID: ${userId} with score: ${newScore}`); // Log user ID and score
      
        // Reference the 'scores' collection and prepare a new document
        const scoresCollectionRef = collection(db, 'authentiquest');
      
        try {
          // Add a new document with the user's score and user ID
          const docRef = await addDoc(scoresCollectionRef, {
            userId: userId,
            score: newScore,
            timestamp: new Date()
          });
          console.log("New score document created with ID: ", docRef.id);
        } catch (error) {
          console.error("Error creating new score document: ", error);
        }
      };
      
    useEffect(() => {
      fetch('http://localhost:3001/images')
        .then(response => response.json())
        .then(data => setImages(data))
        .catch(err => console.error('Error fetching images:', err));
    }, []);
  
    useEffect(() => {
        if (gameOver) {
            console.log("Game over detected, attempting to save score...");
            axios.post('http://localhost:3001/api/score', { userId, score })
              .then(() => console.log("Score saved successfully"))
              .catch(error => console.error("Failed to save score:", error));
        }
    }, [gameOver, score, userId]);
  
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
        }, 1000);
      }
    };
  
    const handleClick = () => {
      signOut(database).then(() => history('/'));
    };
  
    return (
        <div>
        <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#000000', padding: '0.5rem 1rem' }}>
          <div style={{ color: 'white', fontWeight: 'bold', fontSize: '24px' }} className='wrapper'>
            AuthentiQuest
          </div>
          <div className='wrapper'>
            <NavLink to="/" className={({ isActive }) => (isActive ? "active-link" : "link")}>Login</NavLink>
            <NavLink to="/challenge" className={({ isActive }) => (isActive ? "active-link" : "link")}>Challenge</NavLink>
            <NavLink to="/score" className={({ isActive }) => (isActive ? "active-link" : "link")}>Score</NavLink>
            <NavLink to="/leaderboard" className={({ isActive }) => (isActive ? "active-link" : "link")}>Leaderboard</NavLink>
            <button onClick={handleClick}>Sign out</button>
          </div>
        </nav>
            <p className='padded lead-p'>Score: {score}</p>
            {!gameOver ? (
                images.length > 0 ? (
                    <div style={{ textAlign: 'center', padding: 20 }}>
                        <img 
                            src={images[currentIndex].url} 
                            alt="Gallery" 
                            style={{ height: '60vh' }}
                        />
                        <div>
                            <button className= 'choice-btn regular' onClick={() => handleGuess('human')}>Human</button>
                            <button  className = 'choice-btn danger' onClick={() => handleGuess('ai')}>AI</button>
                        </div>
                        {feedback && <p className='regular feedback'>{feedback}</p>}
                    </div>
                ) : (
                    <p className='padded danger'>Loading images...</p>
                )
            ) : (
                <p className='padded regular'>Challenge completed! Your final score: {score}</p>
            )}
        </div>
    );
}

export default Challenge;
