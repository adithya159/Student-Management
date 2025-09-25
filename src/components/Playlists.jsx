import React, { useState } from 'react';

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

// Generate mock songs
const generateSongs = (playlistName) =>
  Array.from({ length: 30 }, (_, i) => ({
    name: `${playlistName} Song ${i + 1}`,
    artist: `${playlistName} Artist ${i + 1}`
  }));

const Playlists = () => {
  const [createdSongs, setCreatedSongs] = useState([]);
  const [playlistSongs, setPlaylistSongs] = useState([]);
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

  const sectionTitle = { fontSize: '2rem', margin: '30px 0 10px 0' };
  const cardContainer = { display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px', marginBottom: '30px' };
  const card = { width: '160px', height: '200px', borderRadius: '15px', backgroundColor: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.2)', cursor: 'pointer', transition: '0.3s', padding: '10px' };
  const cardImage = { width: '100%', height: '120px', borderRadius: '10px', objectFit: 'cover', marginBottom: '10px' };
  const cardText = { fontWeight: 'bold', fontSize: '1rem' };
  const createPlaylist = { width: '160px', height: '200px', borderRadius: '15px', backgroundColor: '#FF69B4', color: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.2)', cursor: 'pointer', transition: '0.3s', fontSize: '2rem' };

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

  const addSongsToCreated = () => {
    const newSongs = generateSongs('My Playlist');
    setCreatedSongs(newSongs);
    setPlaylistSongs(newSongs);
    setCurrentSongIndex(null);
    setIsPlaying(false);
  };

  const openPlaylist = (playlistName) => {
    const songs = generateSongs(playlistName);
    setPlaylistSongs(songs);
    setCurrentSongIndex(null);
    setIsPlaying(false);
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
    if (currentSongIndex < playlistSongs.length - 1) setCurrentSongIndex(currentSongIndex + 1);
  };

  return (
    <div style={style}>
      <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Playlists</h1>

      {/* Create Playlist */}
      <h2 style={sectionTitle}>Create Playlist</h2>
      <div style={cardContainer}>
        <div style={createPlaylist} onClick={addSongsToCreated}>+</div>
      </div>

      {/* Top Playlists */}
      <h2 style={sectionTitle}>Top Playlists</h2>
      <div style={cardContainer}>
        {topPlaylists.map((playlist, index) => (
          <div style={card} key={index} onClick={() => openPlaylist(playlist.name)}>
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

      {/* Playlist Songs */}
      {playlistSongs.length > 0 && (
        <>
          <h2 style={sectionTitle}>Playlist Songs</h2>
          <div style={{ ...cardContainer, flexDirection: 'column', alignItems: 'center' }}>
            {playlistSongs.map((song, index) => (
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
          <div>{`${playlistSongs[currentSongIndex].name} - ${playlistSongs[currentSongIndex].artist}`}
            <div style={{ fontSize: '0.8rem' }}>{isPlaying ? 'Playing ▶️' : 'Paused ⏸️'}</div>
          </div>
          <button style={buttonStyle} onClick={() => setIsPlaying(!isPlaying)}>{isPlaying ? '⏸️' : '▶️'}</button>
          <button style={buttonStyle} onClick={nextSong}>&raquo;</button>
        </div>
      )}
    </div>
  );
};

export default Playlists;
