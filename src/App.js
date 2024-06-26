import React, { useEffect, useState } from 'react';
import { Routes, BrowserRouter as Router, Route, Navigate } from 'react-router-dom';
import './App.css';
import Login from './pages/login/Login';
import Home from './pages/home/Home';
import ResetPassword from './pages/resetpassword/ResetPassword';
import ForgotPassword from './pages/forgotpassword/ForgotPassword';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('wavexctoken');
    setIsLoggedIn(!!token);
  }, []);

  return (
    <div className="app-container">
      <Router>
        <Routes>
          <Route
            path="/login"
            element={isLoggedIn ? <Navigate to="/home" /> : <Login setIsLoggedIn={setIsLoggedIn} />}
          />
          <Route
            path="/home"
            element={isLoggedIn ? <Home /> : <Navigate to="/login" setIsLoggedIn={setIsLoggedIn} />}
          />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/" element={<Navigate to={isLoggedIn ? '/home' : '/login'} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
