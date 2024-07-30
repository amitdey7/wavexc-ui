import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './ForgotPassword.css';
import Logo from '../../assets/images/logo-black.png';
import { postData } from '../../service/api';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [apiError, setApiError] = useState('');
  const [apiMsg, setApiMsg] = useState('');

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleForgotPasswordClick = async (event) => {
    event.preventDefault();
    if (!validateEmail(email)) {
      setEmailError('Invalid Email');
      return;
    }
    postData('/auth/forget-password', { email })
      .then(() => {
        setApiMsg('Reset password link has been sent to your email. Please check your inbox.');
      })
      .catch((error) => {
        console.error('Error login:', error);
        setApiError(
          error.response?.message || 'Unable to Send Reset Password Link. Please try again'
        );
      });
  };

  return (
    <div className="forgot-password-page">
      <div className="forgot-password-container">
        <div className="forgot-password-section">
          <div className="logo">
            <img src={Logo} alt="WAVEXC" />
          </div>
          <div className="forgot-password-form">
            <p className="forgot-password-header">Forgot Your Password?</p>
            <form onSubmit={handleForgotPasswordClick}>
              <div className="input-container">
                <input
                  id="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setEmailError('');
                  }}
                  placeholder="Enter your registered email"
                  className="input-field"
                  required
                />
                {emailError && <p className="error-message">{emailError}</p>}
              </div>
              <div className="buttons">
                <button type="submit" className="forgot-password-button">
                  Send Reset Link
                </button>
              </div>
              <div className="back-to-login">
                <Link to="/login">Back to Login</Link>
              </div>
              {apiMsg && <p className="api-message">{apiMsg}</p>}
              {apiError && <p className="error-message">{apiError}</p>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
