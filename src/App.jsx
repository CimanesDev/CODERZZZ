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
  const [role, setRole] = useState(null); // 'victim' or 'responder'
  const [pins, setPins] = useState([]); // Stores all pins (help and donation)
  const [showEmergencyContacts, setShowEmergencyContacts] = useState(false);
  const [showChecklist, setShowChecklist] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Controls sidebar visibility in ResponderView

  // Handle role selection (Victim or Responder)
  const handleSelectRole = (selectedRole) => {
    setRole(selectedRole);
  };

  // Handle back button (return to role selection)
  const handleBack = () => {
    setRole(null);
    setIsCallForHelpMode(false);
    setIsDonateGoodsMode(false);
    setShowEmergencyContacts(false);
    setShowChecklist(false);
    setIsSidebarOpen(false);
  };

  // Toggle sidebar visibility in ResponderView
  const handleViewAllRequests = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Render the appropriate content based on the role
  const renderContent = () => {
    if (!role) {
      // Show StartingPage if no role is selected
      return <StartingPage onSelectRole={handleSelectRole} />;
    } else if (role === 'victim') {
      // Victim View
      return (
        <>
          <Navbar
            onCallForHelp={() => setIsCallForHelpMode(true)}
            onDonateGoods={() => setIsDonateGoodsMode(true)}
            onBack={handleBack}
            onEmergencyContacts={() => setShowEmergencyContacts(true)}
            onChecklist={() => setShowChecklist(true)}
            role={role}
          />
          <Map
            isCallForHelpMode={isCallForHelpMode}
            setIsCallForHelpMode={setIsCallForHelpMode}
            isDonateGoodsMode={isDonateGoodsMode}
            setIsDonateGoodsMode={setIsDonateGoodsMode}
            pins={pins}
            setPins={setPins}
            role={role} // Pass role to Map
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
      // Responder View
      return (
        <>
          <Navbar
            onBack={handleBack}
            onDonateGoods={() => setIsDonateGoodsMode(true)} // Add donation functionality for responders
            role={role}
            onViewAllRequests={handleViewAllRequests}
          />
          <ResponderView pins={pins} isSidebarOpen={isSidebarOpen} />
          {isDonateGoodsMode && (
            <Map
              isCallForHelpMode={false}
              setIsCallForHelpMode={setIsCallForHelpMode}
              isDonateGoodsMode={isDonateGoodsMode}
              setIsDonateGoodsMode={setIsDonateGoodsMode}
              pins={pins}
              setPins={setPins}
              role={role} // Pass role to Map
            />
          )}
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