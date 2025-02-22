// src/App.js
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Map from './components/Map';
import './App.css';

function App() {
  const [isCallForHelpMode, setIsCallForHelpMode] = useState(false);

  // Function to handle "Find Shelters" button click
  const handleFindShelters = () => {
    console.log('Find Shelters button clicked'); // Debugging
    // Pass the function to the Map component
  };

  return (
    <div style={{ display: 'flex' }}>
      <Navbar
        onCallForHelp={() => setIsCallForHelpMode(true)}
        onFindShelters={handleFindShelters} // Pass the function to Navbar
      />
      <Map
        isCallForHelpMode={isCallForHelpMode}
        setIsCallForHelpMode={setIsCallForHelpMode}
        onFindShelters={handleFindShelters} // Pass the function to Map
      />
    </div>
  );
}

export default App;