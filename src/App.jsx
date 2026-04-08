import React, { useState, useEffect } from 'react';
import Sidebar from './components/layout/Sidebar';
import HeaderMobile from './components/layout/HeaderMobile';
import WallCalendar from './components/WallCalendar/WallCalendar';
import WorkspaceView from './components/views/WorkspaceView';
import GlobalNotesView from './components/views/GlobalNotesView';
import SettingsView from './components/views/SettingsView';

function App() {
  const [theme, setTheme] = useState('light');
  const [activeView, setActiveView] = useState('Planning');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <div className="app-container" style={{ overflow: 'hidden', height: '100vh', display: 'flex' }}>
      <Sidebar activeItem={activeView} setActiveItem={setActiveView} theme={theme} toggleTheme={toggleTheme} />
      
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
        <HeaderMobile activeView={activeView} setActiveView={setActiveView} theme={theme} toggleTheme={toggleTheme} />
        
        {/* Dynamic Views wrapper */}
        <div style={{ flex: 1, display: 'flex', background: 'var(--bg-color)', overflowY: 'hidden' }}>
          {activeView === 'Planning' && <WallCalendar />}
          {activeView === 'Workspace' && <WorkspaceView setActiveView={setActiveView} />}
          {activeView === 'Notes' && <GlobalNotesView />}
          {activeView === 'Settings' && <SettingsView />}
        </div>
      </main>
    </div>
  );
}

export default App;
