import React, { useState } from 'react';
import './Login.css';
import Logo from '../../assets/images/logo-black.png';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-section">
          <div className="logo">
            <img src={Logo} alt="Logo" />
          </div>
          <div className="login-form">
            <p>Login To Your Account</p>
            <form>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                className="px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 w-full"
                required
              />
              <div className="password-container">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  className="px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 w-full"
                  required
                />
                <span className="toggle-password">
                  <i
                    className={`absolute inset-y-1/2 right-3 cursor-pointer text-gray-400 hover:text-gray-600 transition duration-200 ease-in-out ${
                      showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'
                    }`}
                    onClick={togglePasswordVisibility}
                  ></i>
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
