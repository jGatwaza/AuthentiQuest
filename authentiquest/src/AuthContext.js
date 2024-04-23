import React, { createContext, useState, useContext } from 'react';

// Create a context
export const AuthContext = createContext();

// Create a custom hook for using the auth context
export const useAuth = () => useContext(AuthContext);

// Create a provider component
export const AuthProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);

  // Method to update the user ID
  const updateUserId = (id) => {
    setUserId(id);
  };

  return (
    <AuthContext.Provider value={{ userId, updateUserId }}>
      {children}
    </AuthContext.Provider>
  );
};
