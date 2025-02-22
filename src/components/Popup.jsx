import React from 'react';

const Popup = ({ onSelectDisaster, onClose }) => {
  const disasters = [
    { type: 'flood', icon: '🌊', label: 'Flood' },
    { type: 'fire', icon: '🔥', label: 'Fire' },
    { type: 'earthquake', icon: '🌍', label: 'Earthquake' },
    { type: 'medical', icon: '🚑', label: 'Medical Emergency' },
    { type: 'roadblock', icon: '🚧', label: 'Roadblock' },
    { type: 'food', icon: '🍲', label: 'Food/Water' },
    { type: 'shelter', icon: '🏠', label: 'Shelter' },
  ];

  return (
    <div style={styles.popup}>
      <h3 style={styles.title}>What do you need help with?</h3>
      <div style={styles.iconContainer}>
        {disasters.map((disaster) => (
          <div
            key={disaster.type}
            style={styles.icon}
            onClick={() => onSelectDisaster(disaster.type)}
          >
            <span style={styles.iconText}>{disaster.icon}</span>
            <span style={styles.iconLabel}>{disaster.label}</span>
          </div>
        ))}
      </div>
      <button onClick={onClose} style={styles.closeButton}>
        Close
      </button>
    </div>
  );
};

const styles = {
  popup: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#ffffff',
    padding: '30px',
    borderRadius: '15px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)',
    zIndex: 1000,
    width: '350px',
    textAlign: 'center',
    fontFamily: 'Arial, sans-serif',
  },
  title: {
    fontSize: '20px',
    fontWeight: '600',
    color: '#333',
    marginBottom: '20px',
  },
  iconContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '15px',
    marginBottom: '25px',
  },
  icon: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '15px',
    backgroundColor: '#f8f9fa',
    borderRadius: '10px',
    border: '1px solid #e0e0e0',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  iconText: {
    fontSize: '32px',
    marginBottom: '10px',
  },
  iconLabel: {
    fontSize: '14px',
    fontWeight: '500',
    color: '#555',
  },
  closeButton: {
    padding: '12px 24px',
    backgroundColor: '#ff4444',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
    transition: 'background-color 0.3s ease',
  },
};

// Add hover effects
styles.icon[':hover'] = {
  backgroundColor: '#e9ecef',
  transform: 'translateY(-2px)',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
};

styles.closeButton[':hover'] = {
  backgroundColor: '#cc0000',
};

export default Popup;