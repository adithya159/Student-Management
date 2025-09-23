import React from 'react';

// Mock data for genres
const genres = [
  { name: 'Pop', img: 'https://picsum.photos/200?random=1' },
  { name: 'Hip-Hop', img: 'https://picsum.photos/200?random=2' },
  { name: 'Rock', img: 'https://picsum.photos/200?random=3' },
  { name: 'Jazz', img: 'https://picsum.photos/200?random=4' },
  { name: 'Classical', img: 'https://picsum.photos/200?random=5' },
  { name: 'Electronic', img: 'https://picsum.photos/200?random=6' }
];

// Mock data for popular playlists
const playlists = [
  { name: 'Top Hits 2025', img: 'https://picsum.photos/200?random=7' },
  { name: 'Relaxing Vibes', img: 'https://picsum.photos/200?random=8' },
  { name: 'Workout Boost', img: 'https://picsum.photos/200?random=9' },
  { name: 'Throwback Classics', img: 'https://picsum.photos/200?random=10' }
];

const Browse = () => {
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

  const searchBar = {
    width: '80%',
    maxWidth: '500px',
    padding: '10px 15px',
    fontSize: '1rem',
    borderRadius: '25px',
    border: '1px solid #ccc',
    marginBottom: '30px',
    outline: 'none',
  };

  return (
    <div style={style}>
      <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Browse Music</h1>

      {/* Search Bar */}
      <input type="text" placeholder="Search by genre, artist, or album..." style={searchBar} />

      {/* Genres */}
      <h2 style={sectionTitle}>Genres</h2>
      <div style={cardContainer}>
        {genres.map((genre, index) => (
          <div style={card} key={index}>
            <img src={genre.img} alt={genre.name} style={cardImage} />
            <div style={cardText}>{genre.name}</div>
          </div>
        ))}
      </div>

      {/* Popular Playlists */}
      <h2 style={sectionTitle}>Popular Playlists</h2>
      <div style={cardContainer}>
        {playlists.map((playlist, index) => (
          <div style={card} key={index}>
            <img src={playlist.img} alt={playlist.name} style={cardImage} />
            <div style={cardText}>{playlist.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Browse;
