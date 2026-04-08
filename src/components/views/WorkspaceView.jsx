import React, { useState, useEffect } from 'react';
import { CheckCircle, Calendar as CalendarIcon, Trash2, Plus, ArrowRight } from 'lucide-react';

export default function WorkspaceView({ setActiveView }) {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [upcomingEvents, setUpcomingEvents] = useState([]);

  useEffect(() => {
    // 1. Load Standalone Todos
    setTodos(JSON.parse(localStorage.getItem('auraTodos') || '[]'));
    
    // 2. Load Calendar Notes to find upcoming agenda based on dates
    const calNotes = JSON.parse(localStorage.getItem('wallCalendarNotes') || '{}');
    const upcoming = [];
    
    // Get today's bare date string to compare (e.g., 2026-04-07)
    const today = new Date();
    // Use local timezone formatting hack to safely compare YYYY-MM-DD
    const todayStr = today.getFullYear() + '-' + String(today.getMonth() + 1).padStart(2,'0') + '-' + String(today.getDate()).padStart(2,'0');

    Object.entries(calNotes).forEach(([key, text]) => {
      if(text.trim() === '') return;
      // Is a proper daily note key: yyyy-MM-dd
      if(key.match(/^\d{4}-\d{2}-\d{2}$/)) {
        if(key >= todayStr) {
          upcoming.push({ dateStr: key, text: text });
        }
      }
    });

    // Sort upcoming ascending
    upcoming.sort((a,b) => a.dateStr.localeCompare(b.dateStr));
    setUpcomingEvents(upcoming.slice(0, 5)); // Limit to first 5
  }, []);

  const handleAddTodo = (e) => {
    e.preventDefault();
    if(!newTodo.trim()) return;
    const updated = [...todos, { id: Date.now(), text: newTodo, done: false }];
    setTodos(updated);
    setNewTodo('');
    localStorage.setItem('auraTodos', JSON.stringify(updated));
  };

  const toggleTodo = (id) => {
    const updated = todos.map(t => t.id === id ? {...t, done: !t.done} : t);
    setTodos(updated);
    localStorage.setItem('auraTodos', JSON.stringify(updated));
  };

  const deleteTodo = (id) => {
    const updated = todos.filter(t => t.id !== id);
    setTodos(updated);
    localStorage.setItem('auraTodos', JSON.stringify(updated));
  };

  const completedCount = todos.filter(t => t.done).length;
  const totalCount = todos.length;
  const progressText = totalCount === 0 ? "0 / 0" : `${completedCount} / ${totalCount}`;

  return (
    <div style={{ padding: '60px 40px', width: '100%', height: '100%', overflowY: 'auto' }}>
      <h1 style={{ fontSize: '32px', marginBottom: '8px' }}>Welcome to your Workspace</h1>
      <p style={{ color: 'var(--text-muted)', marginBottom: '40px' }}>Your daily active tasks and calendar highlights.</p>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
        
        {/* Left Column: Quick To-Do List */}
        <div className="glass-card" style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ fontSize: '18px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <CheckCircle size={20} color="var(--theme-primary)" /> Daily Task List
            </h3>
            <span style={{ fontSize: '14px', fontWeight: 'bold', color: 'var(--theme-primary)', background: 'var(--theme-primary-light)', padding: '4px 12px', borderRadius: '12px' }}>
              {progressText} Done
            </span>
          </div>

          <form onSubmit={handleAddTodo} style={{ display: 'flex', gap: '8px' }}>
            <input 
              type="text" 
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              placeholder="Add a new task..." 
              style={{ flex: 1, padding: '10px 16px', borderRadius: '8px', border: '1px solid var(--border-color)', outline: 'none', background: 'transparent', color: 'var(--text-main)', fontSize: '14px' }}
            />
            <button type="submit" className="btn-primary" style={{ padding: '10px' }} title="Add Task"><Plus size={20} /></button>
          </form>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: '300px', overflowY: 'auto', paddingRight: '8px' }}>
            {todos.length === 0 && <p style={{ color: 'var(--text-muted)', fontSize: '14px', fontStyle: 'italic' }}>No pending tasks right now. Great job!</p>}
            
            {todos.map(todo => (
              <div key={todo.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px', background: 'var(--border-color)', borderRadius: '8px', transition: 'all 0.2s' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', flex: 1, opacity: todo.done ? 0.5 : 1 }} onClick={() => toggleTodo(todo.id)}>
                   <div style={{ width: '20px', height: '20px', borderRadius: '4px', border: `2px solid ${todo.done ? 'var(--theme-primary)' : 'var(--text-muted)'}`, background: todo.done ? 'var(--theme-primary)' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                     {todo.done && <CheckCircle size={14} color="white" />}
                   </div>
                   <span style={{ fontSize: '14px', textDecoration: todo.done ? 'line-through' : 'none' }}>{todo.text}</span>
                </div>
                <button onClick={() => deleteTodo(todo.id)} style={{ background: 'transparent', border: 'none', color: '#e53935', cursor: 'pointer', opacity: 0.6 }} className="delete-btn-hover">
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
        
        {/* Right Column: Upcoming Calendar Synopsis */}
        <div className="glass-card" style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <h3 style={{ fontSize: '18px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <CalendarIcon size={20} color="var(--theme-primary)" /> Upcoming Agenda
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', flex: 1 }}>
            {upcomingEvents.length === 0 ? (
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '16px', color: 'var(--text-muted)', textAlign: 'center', padding: '20px' }}>
                <p>Your calendar is clear. You have no upcoming plans attached to specific dates!</p>
                <button onClick={() => setActiveView('Planning')} className="btn-primary" style={{ background: 'var(--theme-primary)', fontSize: '14px' }}>
                  Open Planner
                </button>
              </div>
            ) : (
              <>
                {upcomingEvents.map(evt => {
                   const displayDate = new Date(evt.dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' });
                   return (
                    <div key={evt.dateStr} style={{ display: 'flex', gap: '16px', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: '50px' }}>
                         <span style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 'bold' }}>{new Date(evt.dateStr).toLocaleDateString('en-US', { month: 'short', timeZone: 'UTC' })}</span>
                         <span style={{ fontSize: '20px', color: 'var(--theme-primary)', fontWeight: '800' }}>{new Date(evt.dateStr).getUTCDate()}</span>
                      </div>
                      <div style={{ flex: 1, fontSize: '14px', color: 'var(--text-main)', lineHeight: '1.4' }}>
                         {evt.text.length > 80 ? evt.text.slice(0, 80) + '...' : evt.text}
                      </div>
                    </div>
                   )
                })}
                <button onClick={() => setActiveView('Planning')} style={{ background: 'transparent', border: 'none', color: 'var(--theme-primary)', display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer', marginTop: 'auto', fontWeight: '600', padding: '8px 0' }}>
                  View full calendar <ArrowRight size={16} />
                </button>
              </>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
