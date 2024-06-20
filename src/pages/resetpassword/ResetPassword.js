import React, { useState } from 'react';
import './ResetPassword.css';
import Logo from '../../assets/images/logo-black.png';
import { postData } from '../../service/api';
import { useNavigate, useSearchParams } from 'react-router-dom';

const ResetPassword = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [newPasswordError, setNewPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [apiError, setApiError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const toggleNewPasswordVisibility = () => setShowNewPassword(!showNewPassword);
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

  const validatePassword = (password) => {
    const minLength = password.length >= 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    return minLength && hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar;
  };

  const handleResetPassword = async (event) => {
    event.preventDefault();
    setNewPasswordError('');
    setConfirmPasswordError('');
    setApiError('');
    setSuccessMessage('');

    let valid = true;

    if (!validatePassword(newPassword)) {
      setNewPasswordError(
        'Password must contain at least 8 characters including uppercase, lowercase, number, and special character'
      );
      valid = false;
    }

    if (newPassword !== confirmPassword) {
      setConfirmPasswordError('Passwords do not match');
      valid = false;
    }

    if (!valid) return;
    const token = searchParams.get('token');
    const requestData = { newPassword, resetToken: token };
    postData('/auth/reset-password', requestData)
      .then((response) => {
        const { token } = response;
        localStorage.setItem('wavexctoken', token);
        navigate('/login');
      })
      .catch((error) => {
        console.error('Error login:', error);
        setApiError(error.response?.message || 'Login failed. Please try again.');
      });
  };

  return (
    <div className="reset-page">
      <div className="reset-container">
        <div className="reset-section">
          <div className="logo">
            <img src={Logo} alt="Logo" />
          </div>
          <div className="reset-form">
            <p className="reset-header">Reset Your Password</p>
            <form onSubmit={handleResetPassword}>
              <div className="input-container">
                <input
                  id="newPassword"
                  type={showNewPassword ? 'text' : 'password'}
                  value={newPassword}
                  onChange={(e) => {
                    setNewPassword(e.target.value);
                    setNewPasswordError('');
                  }}
                  placeholder="New Password"
                  className="px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 w-full"
                  required
                />
                <span className="toggle-password">
                  <i
                    className={`absolute inset-y-1/2 right-3 cursor-pointer text-gray-400 hover:text-gray-600 transition duration-200 ease-in-out ${
                      showNewPassword ? 'fas fa-eye-slash' : 'fas fa-eye'
                    }`}
                    onClick={toggleNewPasswordVisibility}
                  ></i>
                </span>
                {newPasswordError && <p className="error-message">{newPasswordError}</p>}
              </div>
              <div className="input-container">
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    setConfirmPasswordError('');
                  }}
                  placeholder="Confirm Password"
                  className="px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 w-full"
                  required
                />
                <span className="toggle-password">
                  <i
                    className={`absolute inset-y-1/2 right-3 cursor-pointer text-gray-400 hover:text-gray-600 transition duration-200 ease-in-out ${
                      showConfirmPassword ? 'fas fa-eye-slash' : 'fas fa-eye'
                    }`}
                    onClick={toggleConfirmPasswordVisibility}
                  ></i>
                </span>
                {confirmPasswordError && <p className="error-message">{confirmPasswordError}</p>}
              </div>
              <div className="buttons">
                <button type="submit" className="reset-button">
                  Reset Password
                </button>
              </div>
              {apiError && <p className="error-message">{apiError}</p>}
              {successMessage && <p className="success-message">{successMessage}</p>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
