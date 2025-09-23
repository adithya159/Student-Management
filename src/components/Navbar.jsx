import React from "react";

const Navbar = () => {
  const style = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
    backgroundColor: "#FFC0CB", // pink navbar
    color: "black",
    fontWeight: "bold",
    position: "fixed", // keep navbar at top
    top: 0,
    width: "100%",
    zIndex: 1000,
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
  };

  const linkStyle = {
    margin: "0 15px",
    cursor: "pointer",
    textDecoration: "none",
    color: "black",
  };

  return (
    <>
      <style>{`
        html {
          scroll-behavior: smooth;
        }
        @media (max-width: 768px) {
          nav {
            flex-direction: column !important;
            padding: 15px !important;
          }
          nav a {
            display: block !important;
            margin: 10px 0 !important;
            font-size: 18px !important;
          }
        }
        @media (max-width: 480px) {
          nav {
            padding: 10px !important;
          }
          nav a {
            font-size: 16px !important;
          }
        }
      `}</style>

      <nav style={style}>
        <a href="#home" style={linkStyle}>
          Home
        </a>
        <a href="#browse" style={linkStyle}>
          Browse
        </a>
        <a href="#playlists" style={linkStyle}>
          Playlists
        </a>
        <a href="#account" style={linkStyle}>
          Account
        </a>
      </nav>
    </>
  );
};

export default Navbar;
