import React, { useState, useEffect } from 'react';
import { GoogleMap, Marker, useLoadScript, DirectionsRenderer } from '@react-google-maps/api';
import './ResponderView.css';

const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY; // Ensure this is set in your .env file

const ResponderView = ({ pins, isSidebarOpen }) => {
  const [selectedPin, setSelectedPin] = useState(null);
  const [mapCenter, setMapCenter] = useState({ lat: 14, lng: 482 }); // Default center
  const [userLocation, setUserLocation] = useState(null); // Store user's location
  const [directions, setDirections] = useState(null); // Store directions response
  const [showPopup, setShowPopup] = useState(false); // Control popup visibility

  // Load the Google Maps script
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: apiKey,
    libraries: ['places', 'directions'],
  });

  // Get the user's current location when the component mounts
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setUserLocation(location); // Store user's location
          setMapCenter(location); // Set map center to user's location
        },
        (error) => {
          console.error('Error getting user location:', error);
          // Fallback to default location if user denies location access
          setMapCenter({ lat: 14, lng: 482 });
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
      // Fallback to default location if geolocation is not supported
      setMapCenter({ lat: 14, lng: 482 });
    }
  }, []);

  // Filter only "Call for Help" pins (type: 'help')
  const callForHelpPins = pins.filter((pin) => pin.type === 'help');

  // Handle pin selection from the list
  const handlePinClick = (pin) => {
    setSelectedPin(pin);
    setMapCenter(pin.position); // Center the map on the clicked pin's location
    setShowPopup(true); // Show the popup
  };

  // Handle "Yes" button click in the popup
  const handleConfirmDirections = () => {
    if (userLocation) {
      // Calculate directions from user's location to the selected pin
      const directionsService = new window.google.maps.DirectionsService();
      directionsService.route(
        {
          origin: userLocation,
          destination: selectedPin.position,
          travelMode: window.google.maps.TravelMode.DRIVING, // You can change this to WALKING, BICYCLING, etc.
        },
        (result, status) => {
          if (status === window.google.maps.DirectionsStatus.OK) {
            setDirections(result); // Set directions to display on the map
          } else {
            console.error('Error fetching directions:', status);
          }
        }
      );
    }
    setShowPopup(false); // Close the popup
  };

  // Handle "No" button click in the popup
  const handleCancelDirections = () => {
    setDirections(null); // Clear directions
    setShowPopup(false); // Close the popup
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
          center={mapCenter} // Use the current map center
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

          {/* Render directions if available */}
          {directions && (
            <DirectionsRenderer
              directions={directions}
              options={{
                suppressMarkers: true, // Hide default markers
              }}
            />
          )}
        </GoogleMap>
      </div>

      {/* Sidebar */}
      <div className={`sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>
        <h2>Lahat ng Nangangailangan</h2>
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

      {/* Popup for directions confirmation */}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup">
            <h3>Do you want directions to this place?</h3>
            <div className="popup-buttons">
                <button className="popup-button cofirm" onClick={handleConfirmDirections}>
                Yes
                </button>
                <button className="popup-button cancel" onClick={handleCancelDirections}>
                    No
                </button>
              
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResponderView;