import React, { useState } from 'react';
import { GoogleMap, Marker } from '@react-google-maps/api';
import './ResponderView.css';

const ResponderView = ({ pins, setPins }) => {
  const [filteredPins, setFilteredPins] = useState(pins);
  const [selectedPin, setSelectedPin] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Filter pins by disaster type
  const handleFilter = (disasterType) => {
    if (disasterType === 'all') {
      setFilteredPins(pins);
    } else {
      setFilteredPins(pins.filter((pin) => pin.disasterType === disasterType));
    }
  };

  // Handle pin selection from the list
  const handlePinClick = (pin) => {
    setSelectedPin(pin);
  };

  return (
    <div className="responder-view">
      {/* Map */}
      <div className="map-container">
        <GoogleMap
          zoom={12}
          center={selectedPin ? selectedPin.position : { lat: 14, lng: 482 }}
          mapContainerStyle={{ width: '100%', height: '100vh' }}
        >
          {filteredPins.map((pin) => (
            <Marker
              key={pin.id}
              position={pin.position}
              onClick={() => handlePinClick(pin)}
              icon={{
                url: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
              }}
            />
          ))}
        </GoogleMap>
      </div>

      {/* Sidebar */}
      <div className={`sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>
        <button className="toggle-sidebar" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
          {isSidebarOpen ? 'Close' : 'Open'}
        </button>
        <h2>View All Requests</h2>
        <div className="filters">
          <button onClick={() => handleFilter('all')}>All</button>
          <button onClick={() => handleFilter('flood')}>Flood</button>
          <button onClick={() => handleFilter('earthquake')}>Earthquake</button>
          <button onClick={() => handleFilter('fire')}>Fire</button>
        </div>
        <div className="pin-list">
          {filteredPins.map((pin) => (
            <div
              key={pin.id}
              className="pin-item"
              onClick={() => handlePinClick(pin)}
            >
              <h3>{pin.disasterType}</h3>
              <p>{pin.address}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ResponderView;