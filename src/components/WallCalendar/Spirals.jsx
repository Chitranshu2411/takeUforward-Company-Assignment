import React from 'react';

export default function Spirals() {
  const spirals = Array.from({ length: 34 }).map((_, i) => i);
  
  return (
    <>
      <div className="hanging-hook">
        <svg viewBox="0 0 100 100" fill="none" stroke="#222" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M50 10 L50 30 M50 30 L20 80 M50 30 L80 80" />
          <circle cx="50" cy="15" r="5" fill="#444" stroke="none" />
        </svg>
      </div>
      <div className="spirals-container">
        {spirals.map(i => <div key={i} className="spiral" />)}
      </div>
    </>
  );
}
