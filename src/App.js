import React from 'react';
import './App.css';
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom'
import SpList from './Pages/SpList';
import Nothing from './Pages/Nothing';



function App() {

  
  return (
    <div className="App" style={{width: '500px',
    margin: '0 auto',
    backgroundColor: 'rgb(237, 238, 238)',
    padding: '20px',
    border:'1px solid rgb(170, 170, 219)',
    borderBottom:'none'}}>
  <h1> Shopping List</h1>
  <Router>
        <Routes>
          <Route path="/Pages/SpList" element={<SpList />} /> 
         
        </Routes>
      </Router>
    </div>
  );
}

export default App;
