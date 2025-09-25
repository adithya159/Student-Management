import React, { useState } from 'react';

// Mock data for genres
const genres = [
  { name: 'Pop', img: 'https://picsum.photos/200?random=1' },
  { name: 'Hip-Hop', img: 'https://picsum.photos/200?random=2' },
  { name: 'Rock', img: 'https://picsum.photos/200?random=3' },
  { name: 'Jazz', img: 'https://picsum.photos/200?random=4' },
  { name: 'Classical', img: 'https://picsum.photos/200?random=5' },
  { name: 'Electronic', img: 'https://picsum.photos/200?random=6' }
];

// Predefined popular artists for search
const popularArtists = ['Katy Perry', 'Michael Jackson', 'Adele', 'Justin Bieber', 'Dua Lipa'];

// Mock 20 songs for a genre or artist
const generateSongs = (name) =>
  Array.from({ length: 20 }, (_, i) => ({
    name: `${name} Song ${i + 1}`,
    artist: `${name}`
  }));

const Browse = () => {
  const [currentSongIndex, setCurrentSongIndex] = useState(null);
  const [currentSongs, setCurrentSongs] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const style = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: '100vh',
    paddingTop: '100px',
    textAlign: 'center',
    background: 'linear-gradient(to bottom right, #FFC0CB, #FFB6C1)',
    color: '#333',
    width: '100%'
  };

  const sectionTitle = { fontSize: '2rem', margin: '30px 0 10px 0' };
  const cardContainer = { display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px', marginBottom: '30px' };
  const card = { width: '160px', height: '200px', borderRadius: '15px', backgroundColor: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.2)', cursor: 'pointer', transition: '0.3s', padding: '10px' };
  const cardImage = { width: '100%', height: '120px', borderRadius: '10px', objectFit: 'cover', marginBottom: '10px' };
  const cardText = { fontWeight: 'bold', fontSize: '1rem' };
  const searchBar = { width: '80%', maxWidth: '500px', padding: '10px 15px', fontSize: '1rem', borderRadius: '25px', border: '1px solid #ccc', marginBottom: '30px', outline: 'none' };

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

  const selectGenre = (genre) => {
    setCurrentSongs(generateSongs(genre));
    setCurrentSongIndex(null);
    setIsPlaying(false);
  };

  const searchArtist = (query) => {
    if (popularArtists.includes(query)) {
      setCurrentSongs(generateSongs(query));
      setCurrentSongIndex(null);
      setIsPlaying(false);
    } else {
      setCurrentSongs([]);
      setCurrentSongIndex(null);
    }
  };

  const playSong = (index) => {
    if (currentSongIndex === index) {
      setIsPlaying(!isPlaying);
    } else {
      setCurrentSongIndex(index);
      setIsPlaying(true);
    }
  };

  const prevSong = () => {
    if (currentSongIndex > 0) setCurrentSongIndex(currentSongIndex - 1);
  };
  const nextSong = () => {
    if (currentSongIndex < currentSongs.length - 1) setCurrentSongIndex(currentSongIndex + 1);
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    searchArtist(query);
  };

  return (
    <div style={style}>
      <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Browse Music</h1>
      <input
        type="text"
        placeholder="Search by genre, artist, or album..."
        value={searchQuery}
        onChange={handleSearchChange}
        style={searchBar}
      />

      {/* Genres */}
      <h2 style={sectionTitle}>Genres</h2>
      <div style={cardContainer}>
        {genres.map((genre, index) => (
          <div style={card} key={index} onClick={() => selectGenre(genre.name)}>
            <img src={genre.img} alt={genre.name} style={cardImage} />
            <div style={cardText}>{genre.name}</div>
          </div>
        ))}
      </div>

      {/* Songs List */}
      {currentSongs.length > 0 && (
        <>
          <h2 style={sectionTitle}>Top 20 Songs</h2>
          <div style={{ ...cardContainer, flexDirection: 'column', alignItems: 'center' }}>
            {currentSongs.map((song, index) => (
              <div
                key={index}
                style={{
                  ...card,
                  width: '300px',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  padding: '10px 20px'
                }}
                onClick={() => playSong(index)}
              >
                <div>{song.name}</div>
                <div>{isPlaying && currentSongIndex === index ? '▶️ Playing' : '⏸️ Paused'}</div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Mini Player */}
      {currentSongIndex !== null && (
        <div style={playerBox}>
          <button style={buttonStyle} onClick={prevSong}>&laquo;</button>
          <div>{`${currentSongs[currentSongIndex].name} - ${currentSongs[currentSongIndex].artist}`}
            <div style={{ fontSize: '0.8rem' }}>{isPlaying ? 'Playing ▶️' : 'Paused ⏸️'}</div>
          </div>
          <button style={buttonStyle} onClick={() => setIsPlaying(!isPlaying)}>{isPlaying ? '⏸️' : '▶️'}</button>
          <button style={buttonStyle} onClick={nextSong}>&raquo;</button>
        </div>
      )}
    </div>
  );
};

export default Browse;
