// src/LandingCarousel.jsx
import React, { useState, useRef } from 'react';
import SmartShiftLogo from './SmartShiftLogo.svg';

const landingTabs = [
  { id: 0, label: 'Overview & Sign Up' },
  { id: 1, label: 'Employee Sign On' },
  { id: 2, label: 'Admin Sign On' }
];

export default function LandingCarousel({ onEmployeeLogin, onAdminLogin, onSignUp }) {
  const [activeTab, setActiveTab] = useState(0);
  const touchStartX = useRef(null);

  // Handle swipe
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    if (deltaX > 60 && activeTab > 0) setActiveTab(activeTab - 1);
    else if (deltaX < -60 && activeTab < 2) setActiveTab(activeTab + 1);
    touchStartX.current = null;
  };

  return (
    <div style={styles.carouselRoot} onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
      <div style={{ ...styles.carouselSlider, transform: `translateX(-${activeTab * 100}vw)` }}>
        {/* Tab 1: Overview & Sign Up */}
        <div style={styles.carouselPage}>
          <img src={SmartShiftLogo} alt="Smart Shift Logo" style={{ width: 120, height: 120, marginBottom: 24, filter: 'drop-shadow(0 4px 24px #991b1b88)' }} />
          <h2 style={styles.title}>Welcome to Smart Shift Scheduling</h2>
          <p style={styles.desc}>Effortlessly manage shifts, staff, and operations with AI-powered tools.</p>
          <button style={styles.button} onClick={onSignUp}>New Business Sign Up</button>
        </div>
        {/* Tab 2: Employee Sign On */}
        <div style={styles.carouselPage}>
          <img src={SmartShiftLogo} alt="Smart Shift Logo" style={{ width: 80, height: 80, marginBottom: 18, filter: 'drop-shadow(0 2px 12px #991b1b88)' }} />
          <h2 style={styles.title}>Employee Sign On</h2>
          <input type="text" placeholder="Employee ID" style={styles.input} />
          <button style={styles.button} onClick={onEmployeeLogin}>Sign In</button>
        </div>
        {/* Tab 3: Admin Sign On */}
        <div style={styles.carouselPage}>
          <img src={SmartShiftLogo} alt="Smart Shift Logo" style={{ width: 80, height: 80, marginBottom: 18, filter: 'drop-shadow(0 2px 12px #991b1b88)' }} />
          <h2 style={styles.title}>Admin Sign On</h2>
          <input type="password" placeholder="Admin Code" style={styles.input} />
          <button style={styles.button} onClick={onAdminLogin}>Admin Login</button>
        </div>
      </div>
      <div style={styles.tabDots}>
        {landingTabs.map((tab, idx) => (
          <span
            key={tab.id}
            style={{ ...styles.dot, background: activeTab === idx ? '#991b1b' : '#444' }}
            onClick={() => setActiveTab(idx)}
          />
        ))}
      </div>
    </div>
  );
}

const styles = {
  carouselRoot: {
    width: '100vw',
    height: '100vh',
    overflow: 'hidden',
    position: 'relative',
    background: 'linear-gradient(135deg, #18181b 0%, #23232b 60%, #991b1b 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  carouselSlider: {
    display: 'flex',
    width: '300vw',
    height: '100%',
    transition: 'transform 0.8s cubic-bezier(0.19, 1, 0.22, 1)',
  },
  carouselPage: {
    width: '100vw',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    boxSizing: 'border-box',
    padding: 40,
    background: 'rgba(30, 30, 40, 0.7)',
    boxShadow: '0 12px 48px 0 #000a, 0 2px 24px 0 #991b1b55',
    borderRadius: 32,
    margin: 24,
    backdropFilter: 'blur(18px)',
    border: '2px solid #991b1b44',
  },
  title: {
    color: '#fff',
    fontSize: 40,
    fontWeight: 900,
    marginBottom: 18,
    letterSpacing: 2,
    textShadow: '0 2px 16px #991b1b88, 0 0px 2px #fff2',
    fontFamily: 'Montserrat, sans-serif',
    textTransform: 'uppercase',
  },
  desc: {
    color: '#e5e5e5',
    fontSize: 20,
    marginBottom: 36,
    textAlign: 'center',
    maxWidth: 440,
    fontWeight: 500,
    letterSpacing: 1,
    textShadow: '0 1px 8px #000',
  },
  input: {
    fontSize: 22,
    padding: '14px 24px',
    marginBottom: 28,
    border: '2px solid #991b1b',
    borderRadius: 8,
    background: 'rgba(40, 40, 60, 0.85)',
    color: '#fff',
    width: 280,
    fontWeight: 700,
    outline: 'none',
    boxShadow: '0 2px 12px #991b1b44, 0 1px 8px #000',
    transition: 'border 0.3s, box-shadow 0.3s',
  },
  button: {
    background: 'linear-gradient(90deg, #991b1b 0%, #23232b 100%)',
    color: '#fff',
    fontWeight: 900,
    fontSize: 20,
    padding: '14px 38px',
    border: 'none',
    borderRadius: 8,
    cursor: 'pointer',
    marginBottom: 16,
    boxShadow: '0 2px 16px #991b1b44, 0 1px 8px #000',
    letterSpacing: 2,
    textTransform: 'uppercase',
    transition: 'background 0.3s, color 0.3s',
  },
  tabDots: {
    position: 'absolute',
    bottom: 48,
    left: 0,
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    gap: 16,
  },
  dot: {
    width: 18,
    height: 18,
    borderRadius: '50%',
    display: 'inline-block',
    cursor: 'pointer',
    transition: 'background 0.3s, box-shadow 0.3s',
    boxShadow: '0 2px 8px #991b1b44',
    border: '2px solid #991b1b',
    background: '#23232b',
  },
};
