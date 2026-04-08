import React from 'react';
import { format } from 'date-fns';

export default function CalendarHero({ image, date }) {
  // Mobile Network Optimization: Dynamically rewrite URL parameters array to request highly compressed versions
  // from the Unsplash edge-CDN instead of loading massive 2000px raw desktop images on phones.
  const mobileImg = image.replace(/w=\d+/, 'w=500').replace(/q=\d+/, 'q=60');
  const tabletImg = image.replace(/w=\d+/, 'w=1000').replace(/q=\d+/, 'q=70');

  return (
    <div className="wc-hero">
      <img 
        src={image} 
        srcSet={`${mobileImg} 500w, ${tabletImg} 1000w, ${image} 2000w`}
        sizes="(max-width: 600px) 500px, (max-width: 1024px) 1000px, 2000px"
        alt={`Calendar for ${format(date, 'MMMM yyyy')}`} 
        fetchPriority="high"
      />
      <div className="wc-shape-container">
        <div className="wc-year">{format(date, 'yyyy')}</div>
        <div className="wc-month-text">{format(date, 'MMMM')}</div>
      </div>
    </div>
  );
}
