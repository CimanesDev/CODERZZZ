import React, { useState, useEffect } from 'react';
import { GoogleMap, Marker, useLoadScript, DirectionsRenderer } from '@react-google-maps/api';
import './ResponderView.css';

const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

const ResponderView = ({ pins, setPins, isSidebarOpen, isVictimView }) => {
  const [selectedPin, setSelectedPin] = useState(null);
  const [mapCenter, setMapCenter] = useState({ lat: 14, lng: 482 });
  const [userLocation, setUserLocation] = useState(null);
  const [directions, setDirections] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: apiKey,
    libraries: ['places', 'directions'],
  });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setUserLocation(location);
          setMapCenter(location);
        },
        () => setMapCenter({ lat: 14, lng: 482 })
      );
    }
  }, []);

  const handlePinClick = (pin) => {
    setSelectedPin(pin);
    setMapCenter(pin.position);
    setShowPopup(true);
  };



  const handleConfirmDirections = () => {
    if (userLocation && selectedPin) {
      const directionsService = new window.google.maps.DirectionsService();
      directionsService.route(
        {
          origin: userLocation,
          destination: selectedPin.position,
          travelMode: window.google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === window.google.maps.DirectionsStatus.OK) {
            setDirections(result);
          } else {
            console.error('Error fetching directions:', status);
          }
        }
      );
    }
    setShowPopup(false);
  };

  const handleCancelDirections = () => {
    setDirections(null);
    setShowPopup(false);
  };

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <div className="responder-view">
      <div className="map-container">
        <GoogleMap zoom={12} center={mapCenter} mapContainerStyle={{ width: '100%', height: '100vh' }}>
          {pins.map((pin) => (
            <Marker
              key={pin.id}
              position={pin.position}
              onClick={() => handlePinClick(pin)}
              icon={{
                url: pin.type === 'donation' 
                  ? 'http://maps.google.com/mapfiles/ms/icons/green-dot.png' 
                  : 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
              }}
            />
          ))}
          {directions && <DirectionsRenderer directions={directions} options={{ suppressMarkers: true }} />}
        </GoogleMap>
      </div>

      <div className={`sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>
        <h2>Lahat ng Nangangailangan</h2>
        <div className="pin-list">
          {pins.filter((pin) => pin.type === 'help').map((pin) => (
            <div key={pin.id} className={`pin-item ${selectedPin?.id === pin.id ? 'selected' : ''}`} onClick={() => handlePinClick(pin)}>
              <h3>{pin.disasterType}</h3>
              <p>{pin.address}</p>
            </div>
          ))}
        </div>
      </div>

      {showPopup && selectedPin && (
        <div className="popup-overlay">
          <div className="popup">
            <h3>Detalye ng {selectedPin.type === 'donation' ? 'Donasyon' : 'Pangangailangan'}</h3>
            <p>{selectedPin.disasterType}</p>
            <p>{selectedPin.address}</p>
            
            {selectedPin.type === 'donation' ? (
              <>
                <button className="popup-button cancel" onClick={() => setShowPopup(false)}>Okay</button>
              </>
            ) : (
              <>
                <h4>Gusto mo ba ng ruta patungo rito?</h4>
                <div className="popup-buttons">
                <button className="popup-button yes" onClick={handleConfirmDirections}>Gusto</button>
                <button className="popup-button cancel" onClick={handleCancelDirections}>Ayaw</button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ResponderView;
