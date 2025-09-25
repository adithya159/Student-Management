import React, { useState } from 'react';
import Navbar from './components/Navbar.jsx';
import Home from './components/Home.jsx';
import Browse from './components/Browse.jsx';
import Playlists from './components/Playlists.jsx';
import Account from './components/Account.jsx';
import LoginPage from './components/LoginPage.jsx';
import RegisterPage from './components/RegisterPage.jsx';

const App = () => {
  const [currentPage, setCurrentPage] = useState('login'); // start with login page

  const appStyle = {
    width: '100vw',
    minHeight: '100vh',
    backgroundColor: '#FFC0CB',
    color: 'black',
    fontFamily: 'Arial, sans-serif',
    margin: 0,
    padding: 0,
    display: 'flex',
    flexDirection: 'column',
  };

  return (
    <div style={appStyle}>
      {currentPage !== 'login' && currentPage !== 'register' && (
        <Navbar setCurrentPage={setCurrentPage} />
      )}

      {currentPage === 'home' && <Home />}
      {currentPage === 'browse' && <Browse />}
      {currentPage === 'playlists' && <Playlists />}
      {currentPage === 'account' && <Account />}
      {currentPage === 'login' && <LoginPage setCurrentPage={setCurrentPage} />}
      {currentPage === 'register' && <RegisterPage setCurrentPage={setCurrentPage} />}
    </div>
  );
};

export default App;
