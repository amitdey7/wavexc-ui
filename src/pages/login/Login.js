import React, { useState } from 'react';
import './Login.css';
import Logo from '../../assets/images/logo-black.png';
import { postData } from '../../service/api';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [apiError, setApiError] = useState('');

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const validatePassword = (password) => {
    const minLength = password.length >= 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    return minLength && hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar;
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    setEmailError('');
    setPasswordError('');
    setApiError('');

    let valid = true;

    if (!validateEmail(email)) {
      setEmailError('Invalid Email');
      valid = false;
    }

    if (!validatePassword(password)) {
      setPasswordError('Invalid Password');
      valid = false;
    }

    if (!valid) return;
    try {
      await postData('/auth/login', { email, password });
    } catch (error) {
      console.error('Error during login:', error);
      setApiError(error.response?.message || 'Login failed. Please try again.');
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-section">
          <div className="logo">
            <img src={Logo} alt="Logo" />
          </div>
          <div className="login-form">
            <p className="login-header">Login To Your Account</p>
            <form onSubmit={handleLogin}>
              <div className="input-container">
                <input
                  id="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setEmailError('');
                  }}
                  placeholder="Enter your email"
                  className="px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 w-full"
                  required
                />
                {emailError && <p className="error-message">{emailError}</p>}
              </div>
              <div className="input-container password-container">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setPasswordError('');
                  }}
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
                {passwordError && <p className="error-message">{passwordError}</p>}
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
              {apiError && <p className="error-message">{apiError}</p>}
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
