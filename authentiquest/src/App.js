import './App.css';

import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink
} from 'react-router-dom';
import Login from './components/Login';
import Challenge from './components/Challenge';
import Score from './components/Score';
import Leaderboard from './components/Leaderboard';

function App() {
  return (
    <Router>
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
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/challenge" element={<Challenge />} />
          <Route path="/score" element={<Score />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
