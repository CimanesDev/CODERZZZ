import React, { useState } from 'react';
import StartingPage from './components/StartingPage';
import Navbar from './components/Navbar';
import Map from './components/Map';
import EmergencyContactsPopup from './components/EmergencyContactsPopup';
import ChecklistPopup from './components/ChecklistPopup';
import ResponderView from './components/ResponderView';
import './App.css';

function App() {
  const [isCallForHelpMode, setIsCallForHelpMode] = useState(false);
  const [isDonateGoodsMode, setIsDonateGoodsMode] = useState(false);
  const [role, setRole] = useState(null);
  const [pins, setPins] = useState([]);
  const [showEmergencyContacts, setShowEmergencyContacts] = useState(false);
  const [showChecklist, setShowChecklist] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State for sidebar visibility

  const handleSelectRole = (selectedRole) => {
    setRole(selectedRole);
  };

  const handleBack = () => {
    setRole(null);
  };

  const handleViewAllRequests = () => {
    setIsSidebarOpen(!isSidebarOpen); // Toggle sidebar visibility
  };

  const renderContent = () => {
    if (!role) {
      return <StartingPage onSelectRole={handleSelectRole} />;
    } else if (role === 'victim') {
      return (
        <>
          <Navbar
            onCallForHelp={() => setIsCallForHelpMode(true)}
            onDonateGoods={() => setIsDonateGoodsMode(true)}
            onBack={handleBack}
            onEmergencyContacts={() => setShowEmergencyContacts(true)}
            onChecklist={() => setShowChecklist(true)}
            role={role} // Pass role to Navbar
          />
          <Map
            isCallForHelpMode={isCallForHelpMode}
            setIsCallForHelpMode={setIsCallForHelpMode}
            isDonateGoodsMode={isDonateGoodsMode}
            setIsDonateGoodsMode={setIsDonateGoodsMode}
            pins={pins}
            setPins={setPins}
          />
          {showEmergencyContacts && (
            <EmergencyContactsPopup onClose={() => setShowEmergencyContacts(false)} />
          )}
          {showChecklist && (
            <ChecklistPopup onClose={() => setShowChecklist(false)} />
          )}
        </>
      );
    } else if (role === 'responder') {
      return (
        <>
          <Navbar
            onBack={handleBack}
            role={role} // Pass role to Navbar
            onViewAllRequests={handleViewAllRequests} // Pass sidebar toggle function
          />
          <ResponderView pins={pins} isSidebarOpen={isSidebarOpen} />
        </>
      );
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: role === 'victim' ? 'row' : 'column' }}>
      {renderContent()}
    </div>
  );
}

export default App;