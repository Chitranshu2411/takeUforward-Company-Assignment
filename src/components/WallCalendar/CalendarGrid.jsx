import React from 'react';
import { format, isSameDay, isSameMonth, isWithinInterval } from 'date-fns';

export default function CalendarGrid({ 
  calendarDays, 
  monthStart, 
  selectedRange, 
  handleMouseDown, 
  handleMouseEnter 
}) {
  return (
    <div className="wc-calendar">
      {/* Weekdays */}
      <div className="wc-weekdays">
        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((d, i) => (
          <div key={d} className={`wc-day-name ${i >= 5 ? 'weekend' : ''}`}>{d}</div>
        ))}
      </div>

      {/* Days Grid */}
      <div className="wc-days-grid">
        {calendarDays.map((day) => {
          const isCurrentMonth = isSameMonth(day, monthStart);
          const isToday = isSameDay(day, new Date());
          const isSelectedStart = selectedRange.start && isSameDay(day, selectedRange.start);
          const isSelectedEnd = selectedRange.end && isSameDay(day, selectedRange.end);
          const isSelected = isSelectedStart || isSelectedEnd;
          const inRange = selectedRange.start && selectedRange.end && 
                          isWithinInterval(day, { start: selectedRange.start, end: selectedRange.end });
                          
          // Determine if weekend for color highlighting
          const dayIndex = day.getDay();
          const isWeekend = dayIndex === 0 || dayIndex === 6;

          return (
            <div
              key={day.toString()}
              className={`wc-day-cell 
                ${isCurrentMonth ? '' : 'other-month'} 
                ${isWeekend ? 'weekend-day' : ''} 
                ${isToday ? 'today' : ''} 
                ${isSelected ? 'selected' : ''} 
                ${inRange && !isSelected ? 'in-range' : ''}
                ${isSelectedStart && selectedRange.end && !isSameDay(selectedRange.start, selectedRange.end) ? 'range-start' : ''} 
                ${isSelectedEnd && selectedRange.start && !isSameDay(selectedRange.start, selectedRange.end) ? 'range-end' : ''}
              `}
              onMouseDown={() => handleMouseDown(day)}
              onMouseEnter={() => handleMouseEnter(day)}
            >
              {format(day, 'd')}
            </div>
          );
        })}
      </div>
    </div>
  );
}
