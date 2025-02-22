import React from 'react';
import './Navbar.css';
import logo from './SalbaB.png'; // Replace with your logo path

const Navbar = ({ onCallForHelp, onDonateGoods, onBack, onEmergencyContacts, onChecklist }) => {
  return (
    <div className="nav-bar">
      {/* Logo and Title */}
      <div className="nav-header">
        <img src={logo} alt="Logo" className="nav-logo" />
        <h2>SalbaBida</h2>
      </div>

      {/* Buttons */}
      <button className="nav-button" onClick={onCallForHelp}>
        Call for Help
      </button>
      <button className="nav-button" onClick={onDonateGoods}>
        Donate Goods
      </button>
      <button className="nav-button" onClick={onEmergencyContacts}>
        Emergency Contacts
      </button>
      <button className="nav-button" onClick={onChecklist}>
        Disaster Preparedness Checklist
      </button>

      {/* Back Button */}
      <button className="back-button" onClick={onBack}>
        Back
      </button>
    </div>
  );
};

export default Navbar;