import { signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    NavLink
  } from 'react-router-dom';
import { database } from '../firebaseConfig';
import {useNavigate} from 'react-router-dom';
function Challenge() {
    const [images, setImages] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [feedback, setFeedback] = useState('');
    const [gameOver, setGameOver] = useState(false);
    const history = useNavigate();
    useEffect(() => {
        fetch('http://localhost:3001/images')
            .then(response => response.json())
            .then(data => setImages(data))
            .catch(err => console.error('Error fetching images:', err));
    }, []);

    const handleGuess = (guess) => {
        if (!gameOver && images.length > 0) {
            const correctAnswer = images[currentIndex].origin;
            if (guess === correctAnswer) {
                setFeedback('Correct!');
                setScore(score + 1);
            } else {
                setFeedback('Incorrect. Try again!');
            }

            // Move to next image after a short delay
            setTimeout(() => {
                if (currentIndex < images.length - 1) {
                    setCurrentIndex(currentIndex + 1);
                } else {
                    setGameOver(true); // Stop the challenge after the last image
                }
                setFeedback(''); // Reset feedback for the next image
            }, 1000);
        }
    };
    const handleClick = ()=>{
        signOut(database).then(val => history('/'));
    }
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
