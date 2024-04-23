import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    NavLink
} from 'react-router-dom';

const Leaderboard = () => {
    // State to hold the people data fetched from the server
    const [people, setPeople] = useState([]);

    useEffect(() => {
        // Function to fetch data from your server
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3001/people', {
                });
                console.log('People data:', response.data); // Logging the data to the console
                setPeople(response.data); // Setting the fetched data into the state
            } catch (error) {
                console.error('Failed to fetch people data:', error);
            }
        };
        fetchData();
    }, []); // Empty dependency array means this effect runs only once after the initial render
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
                </div>
            </nav>
            <h1>Leaderboard</h1>
            {/* Displaying the fetched people data */}
            <ul>
                {people.map(person => (
                    <li key={person._id}>{person.url} - {person.origin}</li>
                ))}
            </ul>
        </div>
    );
};
export default Leaderboard;
