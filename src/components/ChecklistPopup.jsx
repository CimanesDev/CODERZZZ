import React, { useState } from 'react';

const ChecklistPopup = ({ onClose }) => {
  const [items, setItems] = useState([
    { name: 'Water (1 gallon per person per day)', checked: false },
    { name: 'Non-perishable food (3-day supply)', checked: false },
    { name: 'Flashlight and extra batteries', checked: false },
    { name: 'First aid kit', checked: false },
    { name: 'Medications (7-day supply)', checked: false },
    { name: 'Multi-purpose tool', checked: false },
    { name: 'Sanitation and personal hygiene items', checked: false },
    { name: 'Copies of personal documents', checked: false },
    { name: 'Cell phone with chargers', checked: false },
    { name: 'Emergency contact information', checked: false },
  ]);

  const handleCheckboxChange = (index) => {
    const newItems = [...items];
    newItems[index].checked = !newItems[index].checked;
    setItems(newItems);
  };

  return (
    <div style={styles.popup}>
      <h3 style={styles.title}>Disaster Preparedness Checklist</h3>
      <ul style={styles.checklist}>
        {items.map((item, index) => (
          <li key={index} style={styles.checklistItem}>
            <input
              type="checkbox"
              checked={item.checked}
              onChange={() => handleCheckboxChange(index)}
              style={styles.checkbox}
            />
            <span style={{ ...styles.itemText, textDecoration: item.checked ? 'line-through' : 'none' }}>
              {item.name}
            </span>
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
  checklist: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
  },
  checklistItem: {
    display: 'flex',
    alignItems: 'center',
    margin: '10px 0',
    padding: '10px',
    backgroundColor: '#f8f9fa',
    borderRadius: '8px',
    border: '1px solid #e0e0e0',
    transition: 'all 0.3s ease',
  },
  checkbox: {
    marginRight: '10px',
    cursor: 'pointer',
  },
  itemText: {
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
styles.checklistItem[':hover'] = {
  backgroundColor: '#e9ecef',
  transform: 'translateY(-2px)',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
};

styles.closeButton[':hover'] = {
  backgroundColor: '#cc0000',
};

export default ChecklistPopup;