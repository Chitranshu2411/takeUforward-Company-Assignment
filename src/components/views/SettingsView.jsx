import React from 'react';
import { Trash2 } from 'lucide-react';

export default function SettingsView() {
  const handleClear = () => {
    if(window.confirm('Warning: This will delete ALL calendar notes permanently. Proceed?')) {
      localStorage.removeItem('wallCalendarNotes');
      alert('Local storage data cleared!');
    }
  };

  return (
    <div style={{ padding: '60px', width: '100%', height: '100%', overflowY: 'auto' }}>
      <h1 style={{ fontSize: '32px', marginBottom: '40px' }}>Settings</h1>
      
      <div className="glass-card" style={{ padding: '32px', maxWidth: '600px' }}>
         <h2 style={{ fontSize: '20px', marginBottom: '16px' }}>Data Management</h2>
         <p style={{ color: 'var(--text-muted)', marginBottom: '24px', lineHeight: '1.5' }}>
           Your calendar notes are securely saved in this local browser directly. If you want to wipe the slate clean, you can reset all calendar notes uniformly below.
         </p>
         <button 
           className="btn-primary" 
           onClick={handleClear}
           style={{ background: '#e53935', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
         >
           <Trash2 size={16} /> Delete All Calendar Notes
         </button>
      </div>
    </div>
  );
}
