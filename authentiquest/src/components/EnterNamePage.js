import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

const EnterNamePage = () => {
  const [name, setName] = useState('');
  const { userId, username, updateUserId, updateUsername } = useAuth();
  const navigate = useNavigate();

  
  const handleNameSubmit = () => {
    if (name.trim()) {
      updateUsername(name.trim());
      navigate('/challenge');
    }
  };
  useEffect(() => {
    if (userId && username !=null) {
      navigate('/challenge');
    }
  }, [userId, username, navigate]);

  return (

    <div class="containeri">
    <h1>Put a name to it</h1>
    <div class="input-group">
        <input type="text" placeholder="Type your name or nickname here" id="name" onChange={(e) => setName(e.target.value)}/>
        <button type="submit" id="enter-button" onClick={handleNameSubmit}>Play</button>
    </div>
    </div>
  );
};

export default EnterNamePage;
