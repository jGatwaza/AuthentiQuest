import React, { createContext, useState, useContext } from 'react';


export const AuthContext = createContext();


export const useAuth = () => useContext(AuthContext);


export const AuthProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);
  const [username, setUsername] = useState(null);

  
  const updateUserId = (id) => {
    setUserId(id);
  };

  
  const updateUsername = (name) => {
    setUsername(name);
  };

  return (
    <AuthContext.Provider value={{ userId, username, updateUserId, updateUsername }}>
      {children}
    </AuthContext.Provider>
  );
};
