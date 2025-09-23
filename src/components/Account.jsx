import React from 'react';

// Mock data for recently played/favorites
const recentPlays = [
  { name: 'Blinding Lights', img: 'https://picsum.photos/200?random=21' },
  { name: 'Levitating', img: 'https://picsum.photos/200?random=22' },
  { name: 'Peaches', img: 'https://picsum.photos/200?random=23' },
  { name: 'Save Your Tears', img: 'https://picsum.photos/200?random=24' },
];

const Account = () => {
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

  const profileImage = {
    width: '120px',
    height: '120px',
    borderRadius: '50%',
    objectFit: 'cover',
    marginBottom: '15px',
  };

  const profileName = {
    fontSize: '1.8rem',
    fontWeight: 'bold',
    marginBottom: '5px',
  };

  const profileEmail = {
    fontSize: '1rem',
    color: '#666',
    marginBottom: '15px',
  };

  const button = {
    padding: '10px 25px',
    fontSize: '1rem',
    borderRadius: '25px',
    border: 'none',
    backgroundColor: '#FF69B4',
    color: 'white',
    cursor: 'pointer',
    transition: '0.3s',
  };

  const sectionTitle = {
    fontSize: '1.8rem',
    margin: '20px 0 10px 0',
  };

  const cardContainer = {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '20px',
    marginBottom: '30px',
  };

  const card = {
    width: '160px',
    height: '200px',
    borderRadius: '15px',
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
    cursor: 'pointer',
    transition: '0.3s',
    padding: '10px',
  };

  const cardImage = {
    width: '100%',
    height: '120px',
    borderRadius: '10px',
    objectFit: 'cover',
    marginBottom: '10px',
  };

  const cardText = {
    fontWeight: 'bold',
    fontSize: '1rem',
  };

  return (
    <div style={style}>
      <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Account</h1>

      {/* Profile Section */}
      <div style={profileContainer}>
        <img
          src="https://picsum.photos/150?random=20"
          alt="User"
          style={profileImage}
        />
        <div style={profileName}>John Doe</div>
        <div style={profileEmail}>john.doe@example.com</div>
        <button
          style={button}
          onMouseOver={e => (e.target.style.backgroundColor = '#FF1493')}
          onMouseOut={e => (e.target.style.backgroundColor = '#FF69B4')}
        >
          Edit Profile
        </button>
      </div>

      {/* Recently Played / Favorites */}
      <h2 style={sectionTitle}>Recently Played</h2>
      <div style={cardContainer}>
        {recentPlays.map((item, index) => (
          <div style={card} key={index}>
            <img src={item.img} alt={item.name} style={cardImage} />
            <div style={cardText}>{item.name}</div>
          </div>
        ))}
      </div>

      {/* Subscription Info */}
      <div style={profileContainer}>
        <h2 style={{ marginBottom: '10px' }}>Subscription</h2>
        <p style={{ fontSize: '1rem', color: '#666' }}>Premium Plan - $9.99/month</p>
        <button
          style={button}
          onMouseOver={e => (e.target.style.backgroundColor = '#FF1493')}
          onMouseOut={e => (e.target.style.backgroundColor = '#FF69B4')}
        >
          Manage Plan
        </button>
      </div>
    </div>
  );
};

export default Account;
