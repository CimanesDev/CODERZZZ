import React from 'react';
import './StartingPage.css';
import logo from './SalbaB.png';
import victim from './victim.png';
import responder from './responder.png';

const StartingPage = ({ onSelectRole }) => {
  return (
    <div className="starting-page">
      {/* Logo and Title */}
      <div className="header">
        <img src={logo} alt="SalbaBida Logo" className="logo" />
        <h1>SalbaBida</h1>
      </div>

      {/* Cards Container */}
      <div className="cards-container">
        {/* Victim Card */}
        <div className="card" onClick={() => onSelectRole('victim')}>
          <img src={victim} alt="Victim" className="card-image" />
          <h2>Biktima</h2>
          <p>Nangangailangan ka ba ng tulong?</p>
        </div>

        {/* Responder Card */}
        <div className="card" onClick={() => onSelectRole('responder')}>
          <img src={responder} alt="Responder" className="card-image" />
          <h2>Tutulong</h2>
          <p>May kakayahan ka bang tumulong?</p>
        </div>
      </div>
    </div>
  );
};

export default StartingPage;