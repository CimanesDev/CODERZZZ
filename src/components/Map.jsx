// src/components/Map.js
import React, { useState, useEffect, useRef } from 'react';
import { GoogleMap, Marker, useLoadScript, Autocomplete } from '@react-google-maps/api';
import axios from 'axios';
import Popup from './Popup';
import './Map.css';

const Map = ({ isCallForHelpMode, setIsCallForHelpMode }) => {
  const [markerPosition, setMarkerPosition] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [isLocationConfirmed, setIsLocationConfirmed] = useState(false);
  const [pins, setPins] = useState([]); // Array to store all pins
  const [selectedPin, setSelectedPin] = useState(null); // Currently selected pin
  const [address, setAddress] = useState(''); // Address for the search bar
  const autocompleteRef = useRef(null);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: 'AIzaSyD1JWD2LMUTfBiF6Gk5jpuMxMpE7_q9EE8', // Replace with your API key
    libraries: ['places'], // Enable Places API
  });

  // Get the user's current location
  useEffect(() => {
    if (isCallForHelpMode && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setMarkerPosition(userLocation);
          fetchAddress(userLocation); // Fetch address for the current location
        },
        (error) => {
          console.error('Error getting user location:', error);
        }
      );
    }
  }, [isCallForHelpMode]);

  // Fetch address from coordinates using Geocoding API
  const fetchAddress = async (position) => {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${position.lat},${position.lng}&key=AIzaSyD1JWD2LMUTfBiF6Gk5jpuMxMpE7_q9EE8`
      );
      if (response.data.results[0]) {
        setAddress(response.data.results[0].formatted_address);
      }
    } catch (error) {
      console.error('Error fetching address:', error);
    }
  };

  // Handle map clicks (only if location is not confirmed)
  const handleMapClick = (event) => {
    if (isCallForHelpMode && !isLocationConfirmed) {
      const newPosition = {
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
      };
      setMarkerPosition(newPosition);
      fetchAddress(newPosition); // Fetch address for the new position
    }
  };

  // Handle address search
  const onPlaceChanged = () => {
    if (autocompleteRef.current) {
      const place = autocompleteRef.current.getPlace();
      if (place.geometry) {
        const newPosition = {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        };
        setMarkerPosition(newPosition);
        setAddress(place.formatted_address); // Update address from the search result
      }
    }
  };

  // Handle disaster selection
  const handleSelectDisaster = (disasterType) => {
    if (markerPosition) {
      const newPin = {
        id: Date.now(), // Unique ID for the pin
        position: markerPosition,
        disasterType: disasterType,
        address: address, // Store the address with the pin
      };
      setPins((prevPins) => [...prevPins, newPin]); // Add the new pin to the array
      setShowPopup(false); // Close the disaster selection popup
      setIsLocationConfirmed(true); // Show confirmation popup
      setMarkerPosition(null); // Reset the marker position
      setAddress(''); // Clear the address
      setIsCallForHelpMode(false); // Reset isCallForHelpMode to false
    }
  };

  // Handle pin deletion
  const handleDeletePin = (pinId) => {
    setPins((prevPins) => prevPins.filter((pin) => pin.id !== pinId));
    setSelectedPin(null); // Clear the selected pin
  };

  // Handle pin selection
  const handlePinClick = (pin) => {
    setSelectedPin(pin);
  };

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <>
      <GoogleMap
        zoom={12}
        center={markerPosition || { lat: 14, lng: 482 }} // Default center
        mapContainerStyle={{ width: '100%', height: '100vh' }}
        onClick={isCallForHelpMode && !isLocationConfirmed ? handleMapClick : undefined} // Only allow clicks in "Call for Help" mode
      >
        {/* Render all pins */}
        {pins.map((pin) => (
          <Marker
            key={pin.id}
            position={pin.position}
            onClick={() => handlePinClick(pin)} // Handle pin click
          />
        ))}

        {/* Render the current marker (if not confirmed yet) */}
        {isCallForHelpMode && markerPosition && !isLocationConfirmed && (
          <Marker
            position={markerPosition}
            draggable={true}
            onDragEnd={(event) => {
              const newPosition = {
                lat: event.latLng.lat(),
                lng: event.latLng.lng(),
              };
              setMarkerPosition(newPosition);
              fetchAddress(newPosition); // Fetch address for the new position
            }}
          />
        )}
      </GoogleMap>

      {/* Search Bar */}
      {isCallForHelpMode && !isLocationConfirmed && (
        <div className="search">
          <Autocomplete
            onLoad={(autocomplete) => (autocompleteRef.current = autocomplete)}
            onPlaceChanged={onPlaceChanged}
          >
            <input
              className="input"
              type="text"
              placeholder="Search for an address"
              value={address} // Bind the address to the input
              onChange={(e) => setAddress(e.target.value)} // Allow manual input
            />
          </Autocomplete>
        </div>
      )}

      {/* Confirm Location Button */}
      {isCallForHelpMode && !isLocationConfirmed && (
        <button className="confirm" onClick={() => setShowPopup(true)}>
          Confirm Location
        </button>
      )}

      {/* Popup for disaster selection */}
      {showPopup && (
        <Popup
          onSelectDisaster={handleSelectDisaster}
          onClose={() => setShowPopup(false)}
        />
      )}

      {/* Confirmation message after disaster selection */}
      {isLocationConfirmed && (
        <div className="confirmation-popup">
          <p>
            You asked for help at <strong>{pins[pins.length - 1]?.address}</strong> with{" "}
            <strong>{pins[pins.length - 1]?.disasterType}</strong>. Are you sure?
          </p>
          <button onClick={() => handleDeletePin(pins[pins.length - 1]?.id)}>Delete Pin</button>
          <button onClick={() => setIsLocationConfirmed(false)}>Okay</button>
        </div>
      )}

      {/* Pin details when a pin is selected */}
      {selectedPin && (
        <div className="pin-details">
          <p>
            Help asked at <strong>{selectedPin.address}</strong> with{" "}
            <strong>{selectedPin.disasterType}</strong>.
          </p>
          <button onClick={() => handleDeletePin(selectedPin.id)}>Delete Pin</button>
          <button onClick={() => setSelectedPin(null)}>Okay</button>
        </div>
      )}
    </>
  );
};

export default Map;