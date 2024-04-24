import React, { createContext, useState, useContext } from 'react';

// Create a context
export const AuthContext = createContext();

// Create a custom hook for using the auth context
export const useAuth = () => useContext(AuthContext);

// Create a provider component
export const AuthProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);
  const [username, setUsername] = useState(null);

  // Method to update the user ID
  const updateUserId = (id) => {
    setUserId(id);
  };

  // Method to update the username
  const updateUsername = (name) => {
    setUsername(name);
  };

  return (
    <AuthContext.Provider value={{ userId, username, updateUserId, updateUsername }}>
      {children}
    </AuthContext.Provider>
  );
};
