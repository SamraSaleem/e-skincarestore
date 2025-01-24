import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import './auth.css';
import Footer from '../AdminDashboard/Footer';
import HomeHeader from './homeHeader';
const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user'
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [focusedField, setFocusedField] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear error when user starts typing
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: ''
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.errors) {
          setErrors(data.errors);
        } else {
          setErrors({ general: data.message });
        }
        return;
      }

      // Clear form and show success message
      setFormData({
        name: '',
        email: '',
        password: '',
        role: 'user'
      });
      setErrors({});
      setSuccessMessage('Registration successful! Redirecting to login...');

      // Redirect to login page after 2 seconds
      setTimeout(() => {
        window.location.href = '/login';
      }, 2000);

    } catch (error) {
      setErrors({ general: 'An error occurred. Please try again.' });
    }
  };

  return (
    <div className="home-container">
      <HomeHeader />

      <main style={{ color: '#ef80ae',display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '3rem', marginBottom: '5rem' }}>
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            required
            style={{ border: '2px solid #ef80ae', color: formData.name ? 'black' : '#999' }}
          />
          {errors.name && <div className="error-box"><span>Error:</span> {errors.name}</div>}

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            required
            style={{ border: '2px solid #ef80ae', color: formData.email ? 'black' : '#999' }}
          />
          {errors.email && <div className="error-box"><span>Error:</span> {errors.email}</div>}

          <div className="password-input-container">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              required
              onFocus={() => setFocusedField('password')}
              onBlur={() => setFocusedField('')}
              style={{ 
                border: `2px solid ${focusedField === 'password' ? 'black' : '#ef80ae'}`,
                color: formData.password ? 'black' : '#999'
              }}
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
          {errors.password && <div className="error-box"><span>Error:</span> {errors.password}</div>}

          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
            onFocus={() => setFocusedField('role')}
            onBlur={() => setFocusedField('')}
            style={{ 
              border: `2px solid ${focusedField === 'role' ? 'black' : '#ef80ae'}`,
              color: formData.role ? 'black' : '#999'
            }}
          >
            <option value="user">User</option>
            <option value="seller">Seller</option>
            <option value="admin">Admin</option>
          </select>

          {errors.general && <div className="error-box"><span>Error:</span> {errors.general}</div>}
          
          <button type="submit" style={{ backgroundColor: '#ef80ae' }}>Register</button>
        </form>

        {successMessage && <p className="success-message">{successMessage}</p>}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Register;
