import React from 'react';

// Mock data for top playlists
const topPlaylists = [
  { name: 'Top Hits 2025', img: 'https://picsum.photos/200?random=11' },
  { name: 'Relaxing Vibes', img: 'https://picsum.photos/200?random=12' },
  { name: 'Workout Boost', img: 'https://picsum.photos/200?random=13' },
  { name: 'Throwback Classics', img: 'https://picsum.photos/200?random=14' }
];

// Mock data for shared playlists
const sharedPlaylists = [
  { name: 'Party Mix', img: 'https://picsum.photos/200?random=15' },
  { name: 'Chill Hits', img: 'https://picsum.photos/200?random=16' },
  { name: 'Morning Energy', img: 'https://picsum.photos/200?random=17' },
  { name: 'Romantic Tunes', img: 'https://picsum.photos/200?random=18' }
];

const Playlists = () => {
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

  const sectionTitle = {
    fontSize: '2rem',
    margin: '30px 0 10px 0',
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

  const createPlaylist = {
    width: '160px',
    height: '200px',
    borderRadius: '15px',
    backgroundColor: '#FF69B4',
    color: 'white',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
    cursor: 'pointer',
    transition: '0.3s',
    fontSize: '2rem',
  };

  return (
    <div style={style}>
      <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Playlists</h1>

      {/* Create Playlist */}
      <h2 style={sectionTitle}>Create Playlist</h2>
      <div style={cardContainer}>
        <div style={createPlaylist}>+</div>
      </div>

      {/* Top Playlists */}
      <h2 style={sectionTitle}>Top Playlists</h2>
      <div style={cardContainer}>
        {topPlaylists.map((playlist, index) => (
          <div style={card} key={index}>
            <img src={playlist.img} alt={playlist.name} style={cardImage} />
            <div style={cardText}>{playlist.name}</div>
          </div>
        ))}
      </div>

      {/* Shared Playlists */}
      <h2 style={sectionTitle}>Shared Playlists</h2>
      <div style={cardContainer}>
        {sharedPlaylists.map((playlist, index) => (
          <div style={card} key={index}>
            <img src={playlist.img} alt={playlist.name} style={cardImage} />
            <div style={cardText}>{playlist.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Playlists;
