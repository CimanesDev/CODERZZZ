import React, { useState } from 'react';
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';
import './ResponderView.css';

const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY; // Ensure this is set in your .env file

const ResponderView = ({ pins, isSidebarOpen }) => {
  const [selectedPin, setSelectedPin] = useState(null);

  // Load the Google Maps script
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: apiKey,
    libraries: ['places'],
  });

  // Filter only "Call for Help" pins (type: 'help')
  const callForHelpPins = pins.filter((pin) => pin.type === 'help');

  // Handle pin selection from the list
  const handlePinClick = (pin) => {
    setSelectedPin(pin);
  };

  // Show a loading message while the script is loading
  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div className="responder-view">
      {/* Map */}
      <div className="map-container">
        <GoogleMap
          zoom={12}
          center={selectedPin ? selectedPin.position : { lat: 14, lng: 482 }}
          mapContainerStyle={{ width: '100%', height: '100vh' }}
        >
          {/* Render all "Call for Help" pins */}
          {callForHelpPins.map((pin) => (
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
        <h2>All Requests</h2>
        <div className="pin-list">
          {callForHelpPins.map((pin) => (
            <div
              key={pin.id}
              className={`pin-item ${selectedPin?.id === pin.id ? 'selected' : ''}`}
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