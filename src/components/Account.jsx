import React, { useState } from 'react';

// Mock data for recently played/favorites
const recentPlays = [
  { name: 'Blinding Lights', img: 'https://picsum.photos/200?random=21' },
  { name: 'Levitating', img: 'https://picsum.photos/200?random=22' },
  { name: 'Peaches', img: 'https://picsum.photos/200?random=23' },
  { name: 'Save Your Tears', img: 'https://picsum.photos/200?random=24' },
];

const Account = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('John Doe');
  const [email, setEmail] = useState('john.doe@example.com');
  const [subscription, setSubscription] = useState('Free'); // default
  const [currentSongIndex, setCurrentSongIndex] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const style = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: '100vh',
    paddingTop: '100px',
    textAlign: 'center',
    background: 'linear-gradient(to bottom right, #FFC0CB, #FFB6C1)',
    color: '#333',
    width: '100%',
  };

  const profileContainer = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: '15px',
    padding: '20px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
    marginBottom: '30px',
    width: '90%',
    maxWidth: '500px',
  };

  const profileImage = { width: '120px', height: '120px', borderRadius: '50%', objectFit: 'cover', marginBottom: '15px' };
  const profileName = { fontSize: '1.8rem', fontWeight: 'bold', marginBottom: '5px' };
  const profileEmail = { fontSize: '1rem', color: '#666', marginBottom: '15px' };
  const button = { padding: '10px 25px', fontSize: '1rem', borderRadius: '25px', border: 'none', backgroundColor: '#FF69B4', color: 'white', cursor: 'pointer', transition: '0.3s' };
  const sectionTitle = { fontSize: '1.8rem', margin: '20px 0 10px 0' };
  const cardContainer = { display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px', marginBottom: '30px' };
  const card = { width: '160px', height: '200px', borderRadius: '15px', backgroundColor: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.2)', cursor: 'pointer', transition: '0.3s', padding: '10px' };
  const cardImage = { width: '100%', height: '120px', borderRadius: '10px', objectFit: 'cover', marginBottom: '10px' };
  const cardText = { fontWeight: 'bold', fontSize: '1rem' };

  const inputStyle = { padding: '8px 12px', margin: '5px 0', width: '80%', fontSize: '1rem', borderRadius: '5px', border: '1px solid #ccc', outline: 'none' };
  const radioContainer = { display: 'flex', justifyContent: 'space-around', marginTop: '10px', width: '80%' };

  const playerBox = {
    position: 'fixed',
    bottom: '20px',
    left: '50%',
    transform: 'translateX(-50%)',
    backgroundColor: '#FFC0CB',
    padding: '15px 30px',
    borderRadius: '25px',
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
    zIndex: 1000
  };
  const buttonStyle = { padding: '8px 12px', borderRadius: '50%', border: 'none', backgroundColor: '#FF69B4', color: 'white', cursor: 'pointer' };

  const playSong = (index) => {
    if (currentSongIndex === index) setIsPlaying(!isPlaying);
    else { setCurrentSongIndex(index); setIsPlaying(true); }
  };

  const prevSong = () => { if (currentSongIndex > 0) setCurrentSongIndex(currentSongIndex - 1); };
  const nextSong = () => { if (currentSongIndex < recentPlays.length - 1) setCurrentSongIndex(currentSongIndex + 1); };

  return (
    <div style={style}>
      <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Account</h1>

      {/* Profile Section */}
      <div style={profileContainer}>
        <img src="https://picsum.photos/150?random=20" alt="User" style={profileImage} />
        {!isEditing ? (
          <>
            <div style={profileName}>{name}</div>
            <div style={profileEmail}>{email}</div>
            <div style={{ marginBottom: '10px' }}>Plan: {subscription}</div>
            <button style={button} onClick={() => setIsEditing(true)}
              onMouseOver={e => (e.target.style.backgroundColor = '#FF1493')}
              onMouseOut={e => (e.target.style.backgroundColor = '#FF69B4')}
            >
              Edit Profile
            </button>
          </>
        ) : (
          <>
            <input type="text" style={inputStyle} value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
            <input type="email" style={inputStyle} value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
            <div style={radioContainer}>
              <label>
                <input type="radio" name="plan" value="Free" checked={subscription==='Free'} onChange={(e)=>setSubscription(e.target.value)} /> Free
              </label>
              <label>
                <input type="radio" name="plan" value="Premium" checked={subscription==='Premium'} onChange={(e)=>setSubscription(e.target.value)} /> Premium
              </label>
            </div>
            <button style={button} onClick={() => setIsEditing(false)}
              onMouseOver={e => (e.target.style.backgroundColor = '#FF1493')}
              onMouseOut={e => (e.target.style.backgroundColor = '#FF69B4')}
            >
              Save
            </button>
          </>
        )}
      </div>

      {/* Recently Played / Favorites */}
      <h2 style={sectionTitle}>Recently Played</h2>
      <div style={cardContainer}>
        {recentPlays.map((item, index) => (
          <div style={card} key={index} onClick={() => playSong(index)}>
            <img src={item.img} alt={item.name} style={cardImage} />
            <div style={cardText}>{item.name}</div>
            <div>{isPlaying && currentSongIndex===index ? '▶️ Playing' : '⏸️ Paused'}</div>
          </div>
        ))}
      </div>

      {/* Subscription Info */}
      <div style={profileContainer}>
        <h2 style={{ marginBottom: '10px' }}>Subscription</h2>
        <p style={{ fontSize: '1rem', color: '#666' }}>Plan: {subscription}</p>
      </div>

      {/* Mini Player */}
      {currentSongIndex !== null && (
        <div style={playerBox}>
          <button style={buttonStyle} onClick={prevSong}>&laquo;</button>
          <div>{`${recentPlays[currentSongIndex].name}`}
            <div style={{ fontSize: '0.8rem' }}>{isPlaying ? 'Playing ▶️' : 'Paused ⏸️'}</div>
          </div>
          <button style={buttonStyle} onClick={() => setIsPlaying(!isPlaying)}>{isPlaying ? '⏸️' : '▶️'}</button>
          <button style={buttonStyle} onClick={nextSong}>&raquo;</button>
        </div>
      )}
    </div>
  );
};

export default Account;
