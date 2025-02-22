import React from 'react';

const DonationPopup = ({ address, onConfirm, onClose, donationDetails, setDonationDetails }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setDonationDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleQuantityChange = (e) => {
    const { value } = e.target;
    if (/^\d*$/.test(value)) { // Only allow numbers
      setDonationDetails((prev) => ({ ...prev, quantity: value }));
    }
  };

  return (
    <div style={styles.popup}>
      <h3 style={styles.title}>Donation Details</h3>
      <p style={styles.address}>Current Location: {address}</p>
      <input
        type="text"
        name="goods"
        placeholder="Available Goods"
        value={donationDetails.goods}
        onChange={handleChange}
        style={styles.input}
      />
      <input
        type="text"
        name="quantity"
        placeholder="Quantity"
        value={donationDetails.quantity}
        onChange={handleQuantityChange}
        style={styles.input}
      />
      <div style={styles.buttonContainer}>
        <button onClick={onConfirm} style={styles.confirmButton}>
          Confirm
        </button>
        <button onClick={onClose} style={styles.closeButton}>
          Back
        </button>
      </div>
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
  address: {
    fontSize: '14px',
    color: '#555',
    marginBottom: '20px',
  },
  input: {
    width: '100%',
    padding: '12px',
    margin: '10px 0',
    borderRadius: '8px',
    border: '1px solid #e0e0e0',
    fontSize: '14px',
    transition: 'border-color 0.3s ease',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '20px',
  },
  confirmButton: {
    padding: '12px 24px',
    backgroundColor: '#4CAF50',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
    transition: 'background-color 0.3s ease',
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
styles.input[':hover'] = {
  borderColor: '#999',
};

styles.confirmButton[':hover'] = {
  backgroundColor: '#45a049',
};

styles.closeButton[':hover'] = {
  backgroundColor: '#cc0000',
};

export default DonationPopup;