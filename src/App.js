import React, { useEffect, useState } from 'react';
import { Routes, BrowserRouter as Router, Route, Navigate } from 'react-router-dom';
import './App.css';
import Login from './pages/login/Login';
import Home from './pages/home/Home';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  return (
    <div className="app-container">
      <Router>
        <Routes>
          <Route path="/login" element={isLoggedIn ? <Navigate to="/home" /> : <Login />} />
          <Route path="/home" element={isLoggedIn ? <Home /> : <Navigate to="/login" />} />
          <Route path="/" element={<Navigate to={isLoggedIn ? '/home' : '/login'} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
