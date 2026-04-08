import React, { useState } from 'react';
import { Check, Trash2 } from 'lucide-react';

export default function CalendarNotes({ noteText, onNoteChange, onSaveNote, onDeleteNote }) {
  const [justSaved, setJustSaved] = useState(false);
  const lines = Array.from({ length: 7 }).map((_, i) => i);

  const handleSave = () => {
    if (onSaveNote) {
      onSaveNote();
      setJustSaved(true);
      setTimeout(() => setJustSaved(false), 2000);
    }
  };

  return (
    <div className="wc-notes">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h3 style={{ margin: 0 }}>Notes</h3>
        <div style={{ display: 'flex', gap: '8px' }}>
          {noteText.trim().length > 0 && (
            <button 
              onClick={onDeleteNote}
              className="wc-clear-btn"
              title="Delete Note"
            >
              <Trash2 size={12} strokeWidth={2} /> Clear
            </button>
          )}
          <button 
            onClick={handleSave} 
            className={`wc-save-btn ${justSaved ? 'saved' : ''}`}
            title="Save Note"
          >
            {justSaved ? <><Check size={12} strokeWidth={3} /> Saved</> : 'Save'}
          </button>
        </div>
      </div>
      <div className="wc-lines">
        <textarea 
          className="notes-textarea"
          value={noteText}
          onChange={onNoteChange}
          placeholder=" "
        />
        {lines.map((l) => <div key={l} className="wc-line"></div>)}
      </div>
    </div>
  );
}
