import React from "react";

const Navbar = ({ setCurrentPage, currentPage }) => {
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
    gap: "30px",
  };

  const linkStyle = (page) => ({
    cursor: "pointer",
    textDecoration: "none",
    color: currentPage === page ? "#FF1493" : "black", // highlight active
    fontWeight: currentPage === page ? "bold" : "normal",
    transition: "0.3s",
  });

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
        <a onClick={() => setCurrentPage("home")} style={linkStyle("home")}>
          Home
        </a>
        <a onClick={() => setCurrentPage("browse")} style={linkStyle("browse")}>
          Browse
        </a>
        <a
          onClick={() => setCurrentPage("playlists")}
          style={linkStyle("playlists")}
        >
          Playlists
        </a>
        <a onClick={() => setCurrentPage("account")} style={linkStyle("account")}>
          Account
        </a>
        <a onClick={() => setCurrentPage("login")} style={linkStyle("login")}>
          Logout
        </a>
      </nav>
    </>
  );
};

export default Navbar;
