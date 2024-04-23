import React from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    NavLink
  } from 'react-router-dom';
const Leaderboard = () => {
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
            {/* Add your leaderboard content here */}
        </div>
    );
};

export default Leaderboard;