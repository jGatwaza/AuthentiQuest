import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Challenge from './components/Challenge';
import Score from './components/Score';
import Leaderboard from './components/Leaderboard';
import Register from './components/Register';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './AuthContext';
import EnterNamePage from './components/EnterNamePage';

const basename = "/jGatwaza/AuthentiQuest";


function App() {
  return (
    <AuthProvider>
      <BrowserRouter basename={basename}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/challenge" element={<ProtectedRoute component={Challenge} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/score" element={<Score />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/enternamepage" element={<EnterNamePage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
