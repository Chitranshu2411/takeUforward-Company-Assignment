import React, { useEffect, useState } from 'react';
import { Notebook } from 'lucide-react';

export default function GlobalNotesView() {
  const [allNotes, setAllNotes] = useState({});

  useEffect(() => {
    setAllNotes(JSON.parse(localStorage.getItem('wallCalendarNotes') || '{}'));
  }, []);

  return (
    <div style={{ padding: '60px', width: '100%', height: '100%', overflowY: 'auto' }}>
      <h1 style={{ fontSize: '32px', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '12px' }}>
        <Notebook /> Saved Notes
      </h1>
      <p style={{ color: 'var(--text-muted)', marginBottom: '40px' }}>All your calendar jottings perfectly cataloged in one place.</p>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '16px', maxWidth: '800px' }}>
        {Object.entries(allNotes).length === 0 ? (
          <div className="glass-card" style={{ padding: '24px', textAlign: 'center', color: 'var(--text-muted)' }}>
            <p>No notes saved yet. Go to Planning, pick a date and write something!</p>
          </div>
        ) : (
          Object.entries(allNotes).map(([key, text]) => {
            if (text.trim() === '') return null;
            return (
              <div key={key} className="glass-card" style={{ padding: '24px' }}>
                <div style={{ fontWeight: 'bold', marginBottom: '12px', color: 'var(--theme-primary)' }}>{key}</div>
                <p style={{ whiteSpace: 'pre-wrap', lineHeight: '1.6' }}>{text}</p>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
