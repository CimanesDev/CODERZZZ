// src/components/Navbar.js
import React from 'react';
import './Navbar.css';

const Navbar = ({ onCallForHelp, onBack }) => {
  return (
    <div className="nav-bar">
      <h2>KapBa</h2>
      <button className="nav-button" onClick={onCallForHelp}>Call for Help</button>
      <button className="back-button" onClick={onBack}>Back</button>
    </div>
  );
};

export default Navbar;