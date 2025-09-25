import React, { useState } from 'react';

const RegisterPage = ({ setCurrentPage }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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

  const handleRegister = (e) => {
    e.preventDefault();
    setCurrentPage('home'); // go to Home after registration
  };

  return (
    <div style={style}>
      <div style={formContainer}>
        <h1 style={{ marginBottom: '20px', color: '#FF69B4' }}>MusicStream Register</h1>
        <form onSubmit={handleRegister} style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={input}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={input}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={input}
            required
          />
          <button
            type="submit"
            style={button}
            onMouseOver={(e) => (e.target.style.backgroundColor = '#FF1493')}
            onMouseOut={(e) => (e.target.style.backgroundColor = '#FF69B4')}
          >
            Register
          </button>
        </form>

        <p
          style={{ marginTop: '15px', fontSize: '0.9rem', color: '#666', cursor: 'pointer' }}
          onClick={() => setCurrentPage('login')}
        >
          Already have an account? Login
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
