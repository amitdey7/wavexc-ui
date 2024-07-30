import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Login.css';
import Logo from '../../assets/images/logo-black.png';
import { postData } from '../../service/api';
import { useNavigate } from 'react-router-dom';

const Login = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();
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
    if (!validateEmail(email)) {
      setEmailError('Invalid Email');
      valid = false;
    }

    postData('/auth/login', { usernameOrEmail: email, password })
      .then((response) => {
        const { token } = response;
        localStorage.setItem('wavexctoken', token);
        setIsLoggedIn(true);
        navigate('/employees');
      })
      .catch((error) => {
        const { message } = error?.response?.data;
        if (message === 'username not found') {
          setApiError('User not found. Please check the email and try again.');
        } else if (message === 'Bad credentials') {
          setApiError('Invalid password. Please try again.');
        } else {
          setApiError('Login failed. Please try again.');
        }
      });
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-section">
          <div className="logo">
            <img src={Logo} alt="WAVEXC" />
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
                  className="input-field"
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
                  className="input-field"
                  required
                />
                <span className="toggle-password" onClick={togglePasswordVisibility}>
                  <i className={`icon ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                </span>
                {passwordError && <p className="error-message">{passwordError}</p>}
              </div>
              <div className="forgot-password">
                <Link to="/forgot-password" className="forgot-password-link">
                  Forgot password?
                </Link>
              </div>
              <div className="buttons">
                <button type="submit" className="login-button">
                  Log In
                </button>
              </div>
              {apiError && <p className="error-message">{apiError}</p>}
            </form>
          </div>
          <p className="contact-us">
            Don't have an account? <a href="/">Contact us</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
