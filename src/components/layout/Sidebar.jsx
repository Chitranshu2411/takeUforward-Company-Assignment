import React from 'react';
import { Calendar, LayoutDashboard, Settings, Notebook, Sun, Moon } from 'lucide-react';

export default function Sidebar({ activeItem, setActiveItem, theme, toggleTheme }) {
  const menuItems = [
    { name: 'Workspace', icon: LayoutDashboard },
    { name: 'Planning', icon: Calendar },
    { name: 'Notes', icon: Notebook },
    { name: 'Settings', icon: Settings },
  ];

  return (
    <aside className="sidebar">
      <div className="brand">
        <Calendar size={28} color="var(--theme-primary)" />
        <span>Aura</span>
      </div>
      
      <nav style={{ flex: 1 }}>
        <ul className="nav-links">
          {menuItems.map(item => {
            const Icon = item.icon;
            return (
              <li 
                key={item.name} 
                onClick={() => setActiveItem(item.name)}
                className={`nav-item ${activeItem === item.name ? 'active' : ''}`}
              >
                <Icon size={20} />
                <span>{item.name}</span>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="theme-toggle" style={{ marginTop: 'auto' }}>
        <div 
          className="nav-item" 
          onClick={toggleTheme}
          style={{ justifyContent: 'space-between' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            <span>{theme === 'light' ? 'Dark Mode' : 'Light Mode'}</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
