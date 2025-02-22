// src/App.js
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Map from './components/Map';
import './App.css';

function App() {
  const [isCallForHelpMode, setIsCallForHelpMode] = useState(false);

  return (
    <div style={{ display: 'flex' }}>
      <Navbar onCallForHelp={() => setIsCallForHelpMode(true)} />
      <Map isCallForHelpMode={isCallForHelpMode} setIsCallForHelpMode={setIsCallForHelpMode} />
    </div>
  );
}

export default App;