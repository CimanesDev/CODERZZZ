
import React, { useState, useEffect, useRef } from 'react';
import { GoogleMap, Marker, useLoadScript, Autocomplete } from '@react-google-maps/api';
import axios from 'axios';
import Popup from './Popup';
import DonationPopup from './DonationPopup';
import './Map.css';

const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

const Map = ({
  isCallForHelpMode,
  setIsCallForHelpMode,
  isDonateGoodsMode,
  setIsDonateGoodsMode,
  pins,
  setPins,
}) => {
  const [markerPosition, setMarkerPosition] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [showDonationPopup, setShowDonationPopup] = useState(false);
  const [isLocationConfirmed, setIsLocationConfirmed] = useState(false);
  const [selectedPin, setSelectedPin] = useState(null);
  const [address, setAddress] = useState('');
  const [donationDetails, setDonationDetails] = useState({ goods: '', quantity: '' });
  const [mapCenter, setMapCenter] = useState(null); // Start with null, set to user's location
  const autocompleteRef = useRef(null);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: apiKey, 
    libraries: ['places'],
  });

  // Get the user's current location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          console.log('User Location:', userLocation); // Debugging
          setMarkerPosition(userLocation);
          setMapCenter(userLocation); // Center the map on the user's location
          fetchAddress(userLocation);

          // If in "Donate Goods" mode, show the donation popup immediately
          if (isDonateGoodsMode) {
            setShowDonationPopup(true);
          }
        },
        (error) => {
          console.error('Error getting user location:', error);
          // Fallback to a default location if user denies location access
          setMapCenter({ lat: 14, lng: 482 });
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
      // Fallback to a default location if geolocation is not supported
      setMapCenter({ lat: 14, lng: 482 });
    }
  }, [isCallForHelpMode, isDonateGoodsMode]);

  // Fetch address from coordinates
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

  // Handle map clicks (only for call for help mode)
  const handleMapClick = (event) => {
    if (isCallForHelpMode && !isLocationConfirmed) {
      const newPosition = {
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
      };
      setMarkerPosition(newPosition);
      setMapCenter(newPosition); // Center the map on the clicked position
      fetchAddress(newPosition);
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
        setMapCenter(newPosition); // Center the map on the searched location
        setAddress(place.formatted_address);
      }
    }
  };

  // Handle disaster selection
  const handleSelectDisaster = (disasterType) => {
    if (markerPosition) {
      const newPin = {
        id: Date.now(),
        position: markerPosition,
        type: 'help', // Pin type: help or donation
        disasterType: disasterType,
        address: address,
      };
      setPins((prevPins) => [...prevPins, newPin]);
      setShowPopup(false);
      setIsLocationConfirmed(true);
      setMarkerPosition(null);
      setAddress('');
      setIsCallForHelpMode(false); // Exit "Call for Help" mode after confirming
    }
  };

  // Handle donation submission
  const handleDonationSubmit = () => {
    if (markerPosition) {
      const newPin = {
        id: Date.now(),
        position: markerPosition,
        type: 'donation', // Pin type: help or donation
        address: address,
        goods: donationDetails.goods,
        quantity: donationDetails.quantity,
      };
      setPins((prevPins) => [...prevPins, newPin]);
      setShowDonationPopup(false);
      setMarkerPosition(null);
      setAddress('');
      setIsDonateGoodsMode(false); // Exit "Donate Goods" mode after confirming
    }
  };

  // Handle pin deletion
  const handleDeletePin = (pinId) => {
    setPins((prevPins) => prevPins.filter((pin) => pin.id !== pinId));
    setSelectedPin(null);
  };

  // Handle pin selection
  const handlePinClick = (pin) => {
    setSelectedPin(pin);
    setMapCenter(pin.position); // Center the map on the clicked pin
  };

  // Ensure only one mode is active at a time
  useEffect(() => {
    if (isCallForHelpMode) {
      setIsDonateGoodsMode(false);
      setIsLocationConfirmed(false); // Reset location confirmation when entering "Call for Help" mode
    } else if (isDonateGoodsMode) {
      setIsCallForHelpMode(false);
    }
  }, [isCallForHelpMode, isDonateGoodsMode, setIsCallForHelpMode, setIsDonateGoodsMode]);

  if (!isLoaded || !mapCenter) return <div>Loading...</div>;

  return (
    <>
      <GoogleMap
        zoom={12}
        center={mapCenter}
        mapContainerStyle={{ width: '100%', height: '100vh' }}
        onClick={isCallForHelpMode && !isLocationConfirmed ? handleMapClick : undefined}
      >
        {/* Render all pins */}
        {pins.map((pin) => (
          <Marker
            key={pin.id}
            position={pin.position}
            onClick={() => handlePinClick(pin)}
            icon={{
              url: pin.type === 'donation' ? 'http://maps.google.com/mapfiles/ms/icons/green-dot.png' : 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
            }}
          />
        ))}

        {/* Render the current marker (if not confirmed yet) */}
        {isCallForHelpMode && !isDonateGoodsMode && markerPosition && !isLocationConfirmed && (
          <Marker
            position={markerPosition}
            draggable={true}
            onDragEnd={(event) => {
              const newPosition = {
                lat: event.latLng.lat(),
                lng: event.latLng.lng(),
              };
              setMarkerPosition(newPosition);
              setMapCenter(newPosition); // Center the map on the dragged position
              fetchAddress(newPosition);
            }}
          />
        )}
      </GoogleMap>

      {/* Search Bar */}
      {isCallForHelpMode && !isDonateGoodsMode && !isLocationConfirmed && (
        <div className="search">
          <Autocomplete
            onLoad={(autocomplete) => (autocompleteRef.current = autocomplete)}
            onPlaceChanged={onPlaceChanged}
          >
            <input
              className="input"
              type="text"
              placeholder="Search for an address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </Autocomplete>
        </div>
      )}

      {/* Confirm Location Button */}
      {isCallForHelpMode && !isDonateGoodsMode && !isLocationConfirmed && (
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

      {/* Popup for donation details */}
      {showDonationPopup && (
        <DonationPopup
          address={address}
          onConfirm={handleDonationSubmit}
          onClose={() => setShowDonationPopup(false)}
          donationDetails={donationDetails}
          setDonationDetails={setDonationDetails}
        />
      )}

      {/* Pin details when a pin is selected */}
      {selectedPin && (
        <div className="pin-details">
          <p>
            {selectedPin.type === 'donation' ? (
              <>
                Donation at <strong>{selectedPin.address}</strong> with{" "}
                <strong>{selectedPin.goods}</strong> (Quantity: {selectedPin.quantity}).
              </>
            ) : (
              <>
                Help asked at <strong>{selectedPin.address}</strong> with{" "}
                <strong>{selectedPin.disasterType}</strong>.
              </>
            )}
          </p>
          <button onClick={() => handleDeletePin(selectedPin.id)}>Delete Pin</button>
          <button onClick={() => setSelectedPin(null)}>Okay</button>
        </div>
      )}
    </>
  );
};

export default Map;