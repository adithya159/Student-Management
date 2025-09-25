import React, { useState } from 'react';

const LoginPage = ({ setCurrentPage }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const style = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    background: 'linear-gradient(to bottom right, #FFC0CB, #FFB6C1)',
    fontFamily: 'Arial, sans-serif',
  };

  const formContainer = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: '40px 30px',
    borderRadius: '20px',
    boxShadow: '0 8px 20px rgba(0,0,0,0.2)',
    width: '90%',
    maxWidth: '400px',
  };

  const input = {
    width: '100%',
    padding: '12px 15px',
    margin: '10px 0',
    borderRadius: '25px',
    border: '1px solid #ccc',
    outline: 'none',
    fontSize: '1rem',
  };

  const button = {
    width: '100%',
    padding: '12px 0',
    marginTop: '15px',
    borderRadius: '25px',
    border: 'none',
    backgroundColor: '#FF69B4',
    color: 'white',
    fontSize: '1rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: '0.3s',
  };

  const togglePassword = {
    marginTop: '-10px',
    marginBottom: '10px',
    fontSize: '0.9rem',
    color: '#FF1493',
    cursor: 'pointer',
    alignSelf: 'flex-end',
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setCurrentPage('home'); // go to Home after login
  };

  return (
    <div style={style}>
      <div style={formContainer}>
        <h1 style={{ marginBottom: '20px', color: '#FF69B4' }}>MusicStream Login</h1>
        <form onSubmit={handleLogin} style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={input}
            required
          />
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={input}
            required
          />
          <div
            style={togglePassword}
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? 'Hide Password' : 'Show Password'}
          </div>
          <button
            type="submit"
            style={button}
            onMouseOver={(e) => (e.target.style.backgroundColor = '#FF1493')}
            onMouseOut={(e) => (e.target.style.backgroundColor = '#FF69B4')}
          >
            Login
          </button>
        </form>

        <p
          style={{ marginTop: '15px', fontSize: '0.9rem', color: '#666', cursor: 'pointer' }}
          onClick={() => setCurrentPage('register')}
        >
          Don't have an account? Register
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
