import React, { useState } from 'react';
import { Menu, Sun, Moon, Calendar, LayoutDashboard, Notebook, Settings, X } from 'lucide-react';

export default function HeaderMobile({ activeView, setActiveView, theme, toggleTheme }) {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { name: 'Workspace', icon: LayoutDashboard },
    { name: 'Planning', icon: Calendar },
    { name: 'Notes', icon: Notebook },
    { name: 'Settings', icon: Settings },
  ];

  const handleNav = (name) => {
    setActiveView(name);
    setIsOpen(false);
  }

  return (
    <>
      <header className="mobile-header">
        <div className="brand" style={{ marginBottom: 0, fontSize: '20px', display: 'flex', alignItems: 'center' }}>
          <Menu 
            size={24} 
            style={{ marginRight: '16px', color: 'var(--text-main)', cursor: 'pointer' }} 
            onClick={() => setIsOpen(true)}
          />
          <Calendar size={22} color="var(--theme-primary)" style={{ marginRight: '8px' }} />
          <span>Aura</span>
        </div>
        <button 
          onClick={toggleTheme} 
          style={{ 
            background: 'transparent', 
            border: 'none', 
            color: 'var(--text-main)',
            cursor: 'pointer'
          }}
        >
          {theme === 'light' ? <Moon size={24} /> : <Sun size={24} />}
        </button>
      </header>

      {/* Mobile Navigation Drawer */}
      {isOpen && (
        <div style={{ position: 'fixed', inset: 0, background: 'var(--bg-color)', zIndex: 9999, display: 'flex', flexDirection: 'column' }}>
           <div style={{ display: 'flex', justifyContent: 'space-between', padding: '20px 24px', borderBottom: '1px solid var(--border-color)', alignItems: 'center' }}>
             <div className="brand" style={{ margin: 0, fontSize: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Calendar size={24} color="var(--theme-primary)" />
                <span>Menu</span>
             </div>
             <X size={28} onClick={() => setIsOpen(false)} style={{ cursor: 'pointer', color: 'var(--text-main)' }} />
           </div>

           <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {menuItems.map(item => {
                const Icon = item.icon;
                return (
                  <div 
                    key={item.name}
                    onClick={() => handleNav(item.name)}
                    style={{ 
                      display: 'flex', alignItems: 'center', gap: '16px', padding: '16px 20px', 
                      background: activeView === item.name ? 'var(--theme-primary-light)' : 'var(--paper-bg)',
                      color: activeView === item.name ? 'var(--theme-primary)' : 'var(--text-main)',
                      borderRadius: '12px', fontSize: '16px', fontWeight: '600',
                      boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
                    }}
                  >
                    <Icon size={22} />
                    {item.name}
                  </div>
                )
              })}
           </div>
        </div>
      )}
    </>
  );
}
