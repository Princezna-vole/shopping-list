// auth.js
import React, { createContext, useContext, useState } from 'react';

// Create a context to hold the authentication state and functions
const AuthContext = createContext();

// Create a provider component to wrap your app and provide authentication context
export const AuthProvider = ({ children }) => {
  const [loggedInUser, setLoggedInUser] = useState(null);

  const handleLogin = (username, password) => {
    // Your existing login logic here
    if (username === 'owner' && password === 'owner') {
      setLoggedInUser({ username: 'owner', role: 'owner', id: 1 });
    } else if (username === 'user' && password === 'user') {
      setLoggedInUser({ username: 'user', role: 'user', id: 2 });
    }
  };

  const handleLogout = () => {
    setLoggedInUser(null);
  };

  return (
    <AuthContext.Provider value={{ loggedInUser, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Create a custom hook to easily access the authentication context
export const useAuth = () => useContext(AuthContext);
