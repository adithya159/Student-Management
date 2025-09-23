import React from 'react';
import Navbar from './components/Navbar.jsx';
import Home from './components/Home.jsx';
import Browse from './components/Browse.jsx';
import Playlists from './components/Playlists.jsx';
import Account from './components/Account.jsx';

const App = () => {
  const appStyle = {
    width: '100vw',
    minHeight: '100vh',
    backgroundColor: '#FFC0CB',
    color: 'black',
    fontFamily: 'Arial, sans-serif',
    margin: 0,
    padding: 0,
    display: 'flex',
    flexDirection: 'column'
  };

  return (
    <div style={appStyle}>
      <Navbar />
      <Home />
      <Browse />
      <Playlists />
      <Account />
    </div>
  );
};

export default App;