import React from 'react';

// Mock data for trending songs
const trendingSongs = [
  { song: 'Blinding Lights', artist: 'The Weeknd' },
  { song: 'Levitating', artist: 'Dua Lipa' },
  { song: 'Peaches', artist: 'Justin Bieber' },
  { song: 'Save Your Tears', artist: 'The Weeknd' },
  { song: 'Kiss Me More', artist: 'Doja Cat' }
];

// Mock data for top artists
const topArtists = [
  { name: 'The Weeknd' },
  { name: 'Dua Lipa' },
  { name: 'Justin Bieber' },
  { name: 'Doja Cat' },
  { name: 'Adele' }
];

const Home = () => {
  const style = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: '100vh',
    paddingTop: '100px',
    textAlign: 'center',
    background: 'linear-gradient(to bottom right, #FFC0CB, #FF69B4)',
    color: 'white',
    width: '100%'
  };

  const sectionTitle = {
    fontSize: '2rem',
    margin: '30px 0 10px 0'
  };

  const cardContainer = {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '20px',
    marginBottom: '30px'
  };

  const songCard = {
    width: '160px',
    height: '220px',
    borderRadius: '15px',
    backgroundColor: '#FFB6C1',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
    cursor: 'pointer',
    transition: '0.3s',
    padding: '10px'
  };

  const songImage = {
    width: '100%',
    height: '120px',
    borderRadius: '10px',
    objectFit: 'cover',
    marginBottom: '10px'
  };

  const songName = {
    fontWeight: 'bold',
    marginBottom: '5px'
  };

  const artistName = {
    fontSize: '0.9rem',
    color: '#333'
  };

  const artistCard = {
    width: '160px',
    height: '200px',
    borderRadius: '15px',
    backgroundColor: '#FF69B4',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
    cursor: 'pointer',
    transition: '0.3s',
    padding: '10px',
    color: 'white'
  };

  const artistImage = {
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    objectFit: 'cover',
    marginBottom: '10px'
  };

  const artistNameText = {
    fontWeight: 'bold',
    fontSize: '1rem'
  };

  return (
    <div id="home" style={style}>
      <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Welcome to MusicStream</h1>
      <p style={{ fontSize: '1.5rem', maxWidth: '600px' }}>
        Stream millions of songs anytime, anywhere. Create playlists and discover music tailored just for you!
      </p>

      <button
        style={{
          marginTop: '20px',
          padding: '12px 30px',
          fontSize: '1rem',
          borderRadius: '25px',
          border: 'none',
          backgroundColor: '#FF69B4',
          color: 'white',
          cursor: 'pointer',
          transition: '0.3s'
        }}
        onMouseOver={e => (e.target.style.backgroundColor = '#FF1493')}
        onMouseOut={e => (e.target.style.backgroundColor = '#FF69B4')}
      >
        Start Listening
      </button>

      {/* Trending Songs */}
      <h2 style={sectionTitle}>Trending Songs</h2>
      <div style={cardContainer}>
        {trendingSongs.map((song, index) => (
          <div style={songCard} key={index}>
            <img
              src={`https://picsum.photos/200?random=${index}`}
              alt={song.song}
              style={songImage}
            />
            <div style={songName}>{song.song}</div>
            <div style={artistName}>{song.artist}</div>
          </div>
        ))}
      </div>

      {/* Top Artists */}
      <h2 style={sectionTitle}>Top Artists</h2>
      <div style={cardContainer}>
        {topArtists.map((artist, index) => (
          <div style={artistCard} key={index}>
            <img
              src={`https://picsum.photos/100?random=${index + 10}`}
              alt={artist.name}
              style={artistImage}
            />
            <div style={artistNameText}>{artist.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
