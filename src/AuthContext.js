// AuthContext.js
import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loggedInUser, setLoggedInUser] = useState(null);

  const login = (username, password) => {
    let role, id;

    if (username === 'owner' && password === 'owner') {
      role = 'owner';
      id = 1;
    } else if (username === 'user' && password === 'user') {
      role = 'user';
      id = 2;
    }

    if (role && id) {
      setLoggedInUser({ username, role, id });
    }
  };

  const logout = () => {
    setLoggedInUser(null);
  };

  return (
    <AuthContext.Provider value={{ loggedInUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
