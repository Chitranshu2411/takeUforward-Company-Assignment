import React, { useState, useEffect } from 'react';
import { 
  format, addMonths, subMonths, isBefore, 
  startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval 
} from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { MONTHS_DATA } from '../../constants/months';

import Spirals from './Spirals';
import CalendarHero from './CalendarHero';
import CalendarNotes from './CalendarNotes';
import CalendarGrid from './CalendarGrid';

import './WallCalendar.css'; // Note: Must ensure CSS is here

export default function WallCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date('2026-01-01')); 
  const [selectedRange, setSelectedRange] = useState({ start: null, end: null });
  const [dragStart, setDragStart] = useState(null);
  const [flipKey, setFlipKey] = useState(Date.now());
  const [noteText, setNoteText] = useState('');

  // Theming and Images
  const monthIndex = currentDate.getMonth();
  const currentMonthData = MONTHS_DATA[monthIndex];
  
  const isReferenceMatch = currentDate.getFullYear() === 2026 && monthIndex === 0;
  const activeImage = isReferenceMatch 
    ? 'https://images.unsplash.com/photo-1522163182402-834f871fd851?q=80&w=2000&auto=format&fit=crop' 
    : currentMonthData.imageUrl;
  const activeColor = isReferenceMatch ? '#0ba3e0' : currentMonthData.colorPrimary;

  // Calendar Engine
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const startDate = startOfWeek(monthStart, { weekStartsOn: 1 }); 
  const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 });
  const calendarDays = eachDayOfInterval({ start: startDate, end: endDate });

  // Persistence (Notes tracking)
  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem('wallCalendarNotes') || '{}');
    const key = selectedRange.start ? format(selectedRange.start, 'yyyy-MM-dd') : format(monthStart, 'yyyy-MM');
    setNoteText(savedNotes[key] || '');
  }, [selectedRange.start, currentDate.getFullYear(), currentDate.getMonth()]);

  const handleNoteChange = (e) => {
    setNoteText(e.target.value);
  };

  const handleSaveNote = () => {
    const key = selectedRange.start ? format(selectedRange.start, 'yyyy-MM-dd') : format(monthStart, 'yyyy-MM');
    const savedNotes = JSON.parse(localStorage.getItem('wallCalendarNotes') || '{}');
    savedNotes[key] = noteText;
    localStorage.setItem('wallCalendarNotes', JSON.stringify(savedNotes));
  };

  const handleDeleteNote = () => {
    setNoteText('');
    const key = selectedRange.start ? format(selectedRange.start, 'yyyy-MM-dd') : format(monthStart, 'yyyy-MM');
    const savedNotes = JSON.parse(localStorage.getItem('wallCalendarNotes') || '{}');
    delete savedNotes[key];
    localStorage.setItem('wallCalendarNotes', JSON.stringify(savedNotes));
  };

  // Interactions
  const navigateMonth = (direction) => {
    setCurrentDate(direction === 'next' ? addMonths(currentDate, 1) : subMonths(currentDate, 1));
    setFlipKey(Date.now());
  };

  const handleMouseDown = (day) => {
    setDragStart(day);
    setSelectedRange({ start: day, end: day });
  };

  const handleMouseEnter = (day) => {
    if (dragStart) {
      if (isBefore(day, dragStart)) {
        setSelectedRange({ start: day, end: dragStart });
      } else {
        setSelectedRange({ start: dragStart, end: day });
      }
    }
  };

  const handleMouseUp = () => setDragStart(null);

  return (
    <div className="wall-calendar-wrapper" style={{ '--theme-primary': activeColor }}>
      <button className="wc-nav prev" onClick={() => navigateMonth('prev')}><ChevronLeft size={24}/></button>
      <button className="wc-nav next" onClick={() => navigateMonth('next')}><ChevronRight size={24}/></button>

      <div className="wall-calendar" onMouseLeave={handleMouseUp} onMouseUp={handleMouseUp}>
        <Spirals />

        <div key={flipKey} className="page-flip-anim">
          <CalendarHero image={activeImage} date={currentDate} />

          <div className="wc-bottom">
            <CalendarNotes 
              noteText={noteText} 
              onNoteChange={handleNoteChange} 
              onSaveNote={handleSaveNote}
              onDeleteNote={handleDeleteNote}
            />
            <CalendarGrid 
              calendarDays={calendarDays} 
              monthStart={monthStart} 
              selectedRange={selectedRange} 
              handleMouseDown={handleMouseDown} 
              handleMouseEnter={handleMouseEnter} 
            />
          </div>
        </div>
      </div>
    </div>
  );
}
