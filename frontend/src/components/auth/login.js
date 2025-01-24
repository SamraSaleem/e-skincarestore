import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import './auth.css';
import Footer from '../AdminDashboard/Footer';
import HomeHeader from './homeHeader';
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [systemPassword, setSystemPassword] = useState('');
  const [showAdminVerification, setShowAdminVerification] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showSystemPassword, setShowSystemPassword] = useState(false);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const response = await fetch('http://localhost:3001/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Invalid credentials');
      }

      const data = await response.json();
      const { token, user } = data;
      const { role } = user;

      if (role === 'admin') {
        setShowAdminVerification(true);
        setSuccessMessage('Please enter system password for admin verification');
      } else {
        localStorage.setItem('token', token);
        setSuccessMessage('Login successful! Redirecting...');
        setTimeout(() => {
          window.location.href = role === 'user' ? '/user-dashboard' : '/seller-dashboard';
        }, 2000);
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const handleAdminVerification = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/auth/verify-admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, systemPassword }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Admin verification failed');
      }

      localStorage.setItem('token', data.token);
      setSuccessMessage('Admin verification successful! Redirecting...');
      setTimeout(() => {
        window.location.href = '/admin-dashboard';
      }, 2000);
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="home-container">
      <HomeHeader />

      <main style={{ 
        color: '#ef80ae', 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        marginTop: '3rem', 
        marginBottom: '5rem',
        width: '100%',
        maxWidth: '500px',
        margin: '3rem auto 5rem'
      }}>
        <h1>Login</h1>
        
        {!showAdminVerification ? (
          <form onSubmit={handleSubmit}>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              placeholder="Email" 
              required 
              style={{ border: '2px solid #ef80ae', color: email ? 'black' : '#999' }}
            />
            <div className="password-input-container">
              <input 
                type={showPassword ? "text" : "password"}
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                placeholder="Password" 
                required 
                style={{ border: '2px solid #ef80ae', color: password ? 'black' : '#999' }}
              />
              <button 
                type="button"
                className="password-toggle"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setShowPassword(!showPassword);
                }}
                tabIndex="-1"
                style={{ backgroundColor: 'transparent', border: 'none' }}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            <button type="submit" style={{ backgroundColor: '#ef80ae' }}>Login</button>
          </form>
        ) : (
          <div className="admin-verification">
            <h2>Admin Verification</h2>
            <p>Please enter the system password to access admin dashboard:</p>
            <div className="password-input-container">
              <input
                type={showSystemPassword ? "text" : "password"}
                value={systemPassword}
                onChange={(e) => setSystemPassword(e.target.value)}
                placeholder="System Password"
                className="system-password-input"
                style={{ border: '2px solid #ef80ae', color: systemPassword ? 'black' : '#999' }}
              />
              <button 
                type="button"
                className="password-toggle"
                onClick={() => setShowSystemPassword(!showSystemPassword)}
                style={{ backgroundColor: 'transparent', border: 'none' }}
              >
                {showSystemPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            <div className="verification-buttons">
              <button onClick={handleAdminVerification} style={{ backgroundColor: '#ef80ae' }}>
                Verify
              </button>
              <button 
                onClick={() => setShowAdminVerification(false)} 
                className="cancel-btn" 
                style={{ backgroundColor: '#ef80ae' }}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
        
        {successMessage && <p className="success-message">{successMessage}</p>}
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </main>

      <Footer />
    </div>
  );
};

export default Login;
