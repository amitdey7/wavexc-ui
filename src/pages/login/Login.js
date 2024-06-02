import React, { useState } from 'react';
import './Login.css';
import Logo from '../../assets/images/logo-black.png';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  return (
    <div className="loginContainer">
      <div className="login-page">
        <div className="auth-container">
          <div className="logo">
            <img src={Logo} alt="Logo" />
          </div>
          <div className="login-form">
            <p>Login To Your Account</p>
            <form>
              <input type="email" placeholder="Email" required />
              <div className="password-container">
                <input type={showPassword ? 'text' : 'password'} placeholder="Password" required />
                <span className="toggle-password" onClick={togglePasswordVisibility}>
                  <i className={showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'}></i>
                </span>
              </div>
              <div className="options">
                <a href="/" className="forgot-password">
                  Forgot password?
                </a>
              </div>
              <div className="buttons">
                <button type="submit" className="login-button">
                  Log In
                </button>
              </div>
            </form>
          </div>
          <p className="sign-up">
            Don't have an account? <a href="/">Sign Up</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
