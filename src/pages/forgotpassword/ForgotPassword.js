
import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 
import './ForgotPassword.css';
import Logo from '../../assets/images/logo-black.png';
import { postData } from '../../service/api';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [apiError, setApiError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
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
    postData('/auth/forget-password', {email} )
      .then(() => { 
        setApiMsg('Reset password link has been sent to your email. Please check your inbox.');
        //navigate('/login');
      })
      .catch((error) => {
        console.error('Error login:', error);
        setApiError(error.response?.message || 'Unable to Send Reset Password Link. Please try again');
      });
  };

  return (
    <div className="forgot-page">
      <div className="forgot-container">
        <div className="forgot-section">
          <div className="logo">
            <img src={Logo} alt="Logo" />
          </div>
          <div className="forgot-form">
            <p className="forgot-header">Forgot Your Password?</p>
            <form onSubmit={handleForgotPasswordClick}>
              <div className="input-container">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your registered email"
                  className="px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 w-full"
                  required
                />
                {emailError && <p className="error-message">{emailError}</p>}
              </div>
              <div className="buttons">
                <button type="submit" className="reset-button" >
                  Send Reset Link
                </button>
              </div>
              {apiError && <p className="error-message">{apiError}</p>}
              {successMessage && <p className="success-message">{successMessage}</p>}
            </form>
            <div className="options">
              <Link to="/login" className="back-to-login">
                Back to Login
              </Link>
            </div>
            {apiMsg && <p className="api-message">{apiMsg}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
