import React from 'react';

const EmergencyContactsPopup = ({ onClose }) => {
  const contacts = [
    { name: 'Police', number: '100' },
    { name: 'Fire Department', number: '101' },
    { name: 'Ambulance', number: '102' },
    { name: 'Disaster Management', number: '108' },
    { name: 'Coast Guard', number: '109' },
  ];

  return (
    <div style={styles.popup}>
      <h3 style={styles.title}>Emergency Contacts</h3>
      <ul style={styles.contactList}>
        {contacts.map((contact, index) => (
          <li key={index} style={styles.contactItem}>
            <strong style={styles.contactName}>{contact.name}:</strong>
            <span style={styles.contactNumber}>{contact.number}</span>
          </li>
        ))}
      </ul>
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
    width: '400px',
    textAlign: 'left',
    fontFamily: 'Arial, sans-serif',
  },
  title: {
    fontSize: '20px',
    fontWeight: '600',
    color: '#333',
    marginBottom: '20px',
  },
  contactList: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
  },
  contactItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: '10px 0',
    padding: '10px',
    backgroundColor: '#f8f9fa',
    borderRadius: '8px',
    border: '1px solid #e0e0e0',
    transition: 'all 0.3s ease',
  },
  contactName: {
    fontSize: '14px',
    color: '#333',
  },
  contactNumber: {
    fontSize: '14px',
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
    marginTop: '20px',
  },
};

// Add hover effects
styles.contactItem[':hover'] = {
  backgroundColor: '#e9ecef',
  transform: 'translateY(-2px)',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
};

styles.closeButton[':hover'] = {
  backgroundColor: '#cc0000',
};

export default EmergencyContactsPopup;