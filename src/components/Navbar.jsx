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

        {/* "View All Requests" Button (visible only in Responder View) */}
        {role === 'responder' && (
          <button className="nav-button" onClick={onViewAllRequests}>
            View All Requests
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