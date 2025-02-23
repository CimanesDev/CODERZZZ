import React from 'react';
import './Navbar.css';
import logo from './SalbaB.png'; // Replace with your logo path

const Navbar = ({ onCallForHelp, onDonateGoods, onBack, onEmergencyContacts, onChecklist, role, onViewAllRequests }) => {
  return (
    <div className="nav-bar">
      {/* Logo and Title */}
      <div className="nav-header">
        <img src={logo} alt="Logo" className="nav-logo" />
        <h2>SalbaBida</h2>
      </div>

      {/* Buttons for Victim View */}
      <div className="nav-buttons">
        {/* Show these buttons only in Victim View */}
        {role === 'victim' && (
          <>
            <button className="nav-button" onClick={onCallForHelp}>
              Manghingi ng tulong
            </button>
            <button className="nav-button" onClick={onDonateGoods}>
              Magdonate
            </button>
            <button className="nav-button" onClick={onEmergencyContacts}>
              Emergency Contacts
            </button>
            <button className="nav-button" onClick={onChecklist}>
              Checklist sa Paghahanda sa Sakuna
            </button>
          </>
        )}

        {/* "View All Requests" Button (visible only in Responder View) */}
        {role === 'responder' && (
          <button className="nav-button" onClick={onViewAllRequests}>
            Tignan ang mga nangangailangan
          </button>
        )}

        {/* Back Button (visible in both views) */}
        <button className="back-button" onClick={onBack}>
          Back
        </button>
      </div>
    </div>
  );
};

export default Navbar;