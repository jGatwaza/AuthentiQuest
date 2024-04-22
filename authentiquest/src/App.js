import './App.css';
import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom';
import Login from './components/Login';
import Challenge from './components/Challenge';
import Score from './components/Score';
import Leaderboard from './components/Leaderboard';


function App() {
  return (
    <Router>
      <div>
        <nav>
          <Link to="/">Login</Link>
          <Link to="/challenge">Challenge</Link>
          <Link to="/score">Score</Link>
          <Link to="/leaderboard">Leaderboard</Link>
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
