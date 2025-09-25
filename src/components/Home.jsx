import React, { useState } from 'react';

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
  {
    name: 'The Weeknd',
    monthlyListeners: '75M',
    about: 'Canadian singer, songwriter, and record producer.',
    topSongs: trendingSongs.map(song => song.song)
  },
  {
    name: 'Dua Lipa',
    monthlyListeners: '55M',
    about: 'English singer and songwriter.',
    topSongs: ['Levitating', 'Don’t Start Now', 'New Rules', 'Physical', 'Break My Heart']
  },
  {
    name: 'Justin Bieber',
    monthlyListeners: '65M',
    about: 'Canadian singer and songwriter.',
    topSongs: ['Peaches', 'Sorry', 'Love Yourself', 'Baby', 'Yummy']
  },
  {
    name: 'Doja Cat',
    monthlyListeners: '45M',
    about: 'American rapper, singer, songwriter.',
    topSongs: ['Kiss Me More', 'Say So', 'Woman', 'Need to Know', 'Streets']
  },
  {
    name: 'Adele',
    monthlyListeners: '60M',
    about: 'English singer-songwriter known for soulful voice.',
    topSongs: ['Hello', 'Rolling in the Deep', 'Easy on Me', 'Someone Like You', 'Set Fire to the Rain']
  }
];

const Home = () => {
  const [currentSongIndex, setCurrentSongIndex] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedArtist, setSelectedArtist] = useState(null);
  const [currentSong, setCurrentSong] = useState(null); // for top 20 songs clicked
  const [stationSongs, setStationSongs] = useState([]); // new: for "Start Listening"
  const [stationStarted, setStationStarted] = useState(false);

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

  const buttonStyle = {
    padding: '8px 12px',
    borderRadius: '50%',
    border: 'none',
    backgroundColor: '#FF69B4',
    color: 'white',
    cursor: 'pointer'
  };

  const overlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 999
  };

  const modalStyle = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '90%',
    maxWidth: '500px',
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '20px',
    zIndex: 1000,
    color: 'black',
    maxHeight: '80vh',
    overflowY: 'auto'
  };

  const prevSong = () => {
    if (currentSongIndex > 0) {
      setCurrentSongIndex(currentSongIndex - 1);
      setIsPlaying(true);
    }
  };

  const nextSong = () => {
    const songs = stationStarted ? stationSongs : trendingSongs;
    if (currentSongIndex < songs.length - 1) {
      setCurrentSongIndex(currentSongIndex + 1);
      setIsPlaying(true);
    }
  };

  const playSong = (index = null, song = null, artist = null, fromStation = false) => {
    if (index !== null) {
      setCurrentSongIndex(index);
      setIsPlaying(true);
      setCurrentSong(null);
      setStationStarted(fromStation);
    } else if (song && artist) {
      setCurrentSongIndex(null);
      setCurrentSong({ song, artist });
      setIsPlaying(true);
    }
  };

  const startStation = () => {
    const generatedSongs = Array.from({ length: 20 }, (_, i) => ({
      song: `Station Song ${i + 1}`,
      artist: `Artist ${i + 1}`
    }));
    setStationSongs(generatedSongs);
    setStationStarted(true);
    setCurrentSongIndex(0);
    setIsPlaying(true);
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
        onClick={startStation}
        onMouseOver={e => (e.target.style.backgroundColor = '#FF1493')}
        onMouseOut={e => (e.target.style.backgroundColor = '#FF69B4')}
      >
        Start Listening
      </button>

      {/* Show Station if Started */}
      {stationStarted && (
        <>
          <h2 style={sectionTitle}>🎶 Starting your Station...</h2>
          <div style={cardContainer}>
            {stationSongs.map((song, index) => (
              <div
                style={songCard}
                key={index}
                onClick={() => playSong(index, null, null, true)}
              >
                <img src={`https://picsum.photos/200?random=${index + 100}`} alt={song.song} style={songImage} />
                <div style={songName}>{song.song}</div>
                <div style={artistName}>{song.artist}</div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Trending Songs */}
      <h2 style={sectionTitle}>Trending Songs</h2>
      <div style={cardContainer}>
        {trendingSongs.map((song, index) => (
          <div style={songCard} key={index} onClick={() => playSong(index)}>
            <img src={`https://picsum.photos/200?random=${index}`} alt={song.song} style={songImage} />
            <div style={songName}>{song.song}</div>
            <div style={artistName}>{song.artist}</div>
          </div>
        ))}
      </div>

      {/* Top Artists */}
      <h2 style={sectionTitle}>Top Artists</h2>
      <div style={cardContainer}>
        {topArtists.map((artist, index) => (
          <div style={artistCard} key={index} onClick={() => setSelectedArtist(artist)}>
            <img src={`https://picsum.photos/100?random=${index + 10}`} alt={artist.name} style={artistImage} />
            <div style={artistNameText}>{artist.name}</div>
          </div>
        ))}
      </div>

      {/* Mini Player Box */}
      {(currentSongIndex !== null || currentSong) && (
        <div style={playerBox}>
          <button style={buttonStyle} onClick={prevSong}>&laquo;</button>
          <div>
            {currentSongIndex !== null
              ? stationStarted
                ? `${stationSongs[currentSongIndex].song} - ${stationSongs[currentSongIndex].artist}`
                : `${trendingSongs[currentSongIndex].song} - ${trendingSongs[currentSongIndex].artist}`
              : `${currentSong.song} - ${currentSong.artist}`
            }
            <div style={{ fontSize: '0.8rem' }}>{isPlaying ? 'Playing ▶️' : 'Paused ⏸️'}</div>
          </div>
          <button style={buttonStyle} onClick={() => setIsPlaying(!isPlaying)}>
            {isPlaying ? '⏸️' : '▶️'}
          </button>
          <button style={buttonStyle} onClick={nextSong}>&raquo;</button>
        </div>
      )}

      {/* Artist Modal */}
      {selectedArtist && (
        <>
          <div style={overlayStyle} onClick={() => setSelectedArtist(null)}></div>
          <div style={modalStyle}>
            <h2>{selectedArtist.name}</h2>
            <p><strong>Monthly Listeners:</strong> {selectedArtist.monthlyListeners}</p>
            <p><strong>About:</strong> {selectedArtist.about}</p>
            <p><strong>Top Songs:</strong></p>
            <ol>
              {selectedArtist.topSongs.map((songName, i) => (
                <li key={i} style={{ cursor: 'pointer', color: '#FF69B4' }}
                    onClick={() => playSong(null, songName, selectedArtist.name)}>
                  {songName}
                </li>
              ))}
            </ol>
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
