// App.js
import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SpList from './Pages/SpList';
import Home from './Pages/Home';
import { AuthProvider, useAuth } from './AuthContext';
import Button from './Components/Button';

function App() {
  const { loggedInUser, login, logout } = useAuth();

  
  const handleLogin = (username, password) => {
    if ((username === 'owner' && password === 'owner') || (username === 'user' && password === 'user')) {
      login(username, password);
    } else {
      alert('Invalid login credentials');
    }
  };

  
  const handleLogout = () => {
    logout();
  };

  return (
    <AuthProvider>
      <div className="App">
        <h1> Shopping List</h1>
        {loggedInUser ? (
          <div
          style={{
            width: '500px',
            margin: '0 auto'}}
          >
            <Button onClick={handleLogout}>Logout</Button>
          </div>
        ) : (
          <div  style={{
            width: '500px',
            margin: '0 auto',
            height:'100vh'}}>
            <h5>Please log in to access the Shopping List.</h5>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const username = e.target.username.value;
                const password = e.target.password.value;
                handleLogin(username, password);
              }}
            >
              <input type="text" name="username" placeholder="Username" style={{width: '50%', padding:'5px',margin: '5px 2px', border: '1px solid lavender', borderRadius: '20px', fontSize: '16px'  }}/>
        <input type="password" name="password" placeholder="Password" style={{width: '50%', padding:'5px',margin: '5px 2px', border: '1px solid lavender', borderRadius: '20px', fontSize: '16px'  }} />
              <Button type="submit">Log in</Button>
            </form>
          </div>
        )}
           <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Pages/SpList" element={<SpList />} />
        </Routes>
      </Router>
      </div>
    
      
    </AuthProvider>
  );
}

export default App;
