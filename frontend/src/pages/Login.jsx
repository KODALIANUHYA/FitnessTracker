import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';  // Updated import
import './Login.css';
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');  // State for error message
  const [loading, setLoading] = useState(false);  // Loading state
  const navigate = useNavigate();  // Use useNavigate instead of useHistory

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);  // Set loading to true when request is sent
    setErrorMessage('');  // Clear any previous error messages

    try {
      const response = await axios.post('http://localhost:5000/api/login', { email, password });
      localStorage.setItem('token', response.data.token); // Store the JWT token
      navigate('/dashboard'); // Redirect to dashboard after successful login
    } catch (error) {
      setLoading(false);  // Set loading to false after the request is completed
      setErrorMessage(error.response?.data?.message || 'Login failed. Please try again.');  // Set the error message
    }
  };

  return (
    
    <div className="admin-login-container">
        <div class="bg"></div>

        <div class="star-field">
        <div class="layer"></div>
        <div class="layer"></div>
        <div class="layer"></div>
        </div>
      <h1>WELCOME TO FITRACK 👋</h1>
      <p>Enter your Details 👇</p>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>Login</button> {/* Disable button while loading */}
        <p>Don't have an account??</p>
        <Link to="/signup">Create Account </Link>
      </form>

      {loading && <p>Loading...</p>} {/* Show loading text while the request is in progress */}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>} {/* Display error message if login fails */}
    </div>
    
  );
};

export default Login;
