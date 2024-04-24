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
const Leaderboard = () => {
    const navigate = useNavigate();
    const [people, setPeople] = useState([]);
    const handleClick = () => {
      signOut(database).then(() => navigate('/'));
  };
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3001/people');
                console.log('People data:', response.data);
                const sortedPeople = response.data.sort((a, b) => b.score - a.score); // Sort people by score in descending order
                setPeople(sortedPeople);
            } catch (error) {
                console.error('Failed to fetch people data:', error);
            }
        };
        fetchData();
    }, []);

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
            <div className="leaderboard-container">
                <h1 className="leaderboard-title">LEADERBOARD</h1>
                <table className="leaderboard">
                    <thead>
                        <tr>
                            <th>Rank</th>
                            <th>Name</th>
                            <th>Score</th>
                        </tr>
                    </thead>
                    <tbody>
                        {people.map((person, index) => (
                            <tr key={person.userId}>
                                <td>{index + 1}</td>
                                <td>{person.username}</td>
                                <td>{person.score}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="thank-you">Thank you for playing!</div>
            </div>
        </div>
    );
};

export default Leaderboard;
