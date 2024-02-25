import React from 'react';
import '../styles/NavBar.css'; // Make sure to adjust the path if you have an external CSS file

const NavBar = () => {
  return (
    <nav>
    <div className="nav__content">
      <img src="" alt="" />
      <a
        href="/Login"
        target="_blank"
        rel="noopener noreferrer"
      >
        Log in
      </a>
      <a
        href="/Register"
        target="_blank"
        rel="noopener noreferrer"
      >
        Sign Up here
      </a>
    </div>
  </nav>
  );
};

export default NavBar;
