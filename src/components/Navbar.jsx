// src/components/Navbar.js
import React from 'react';
import './Navbar.css';

const Navbar = ({ onCallForHelp, onFindShelters }) => {
  return (
    <div className="nav-bar">
      <h2>CODERZZZ</h2>
      <button className="nav-button" onClick={onCallForHelp}>Call for Help</button>
      <button className="nav-button" onClick={onFindShelters}>Find Shelters</button>
    </div>
  );
};

export default Navbar;