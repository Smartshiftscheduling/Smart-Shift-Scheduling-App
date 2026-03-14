// src/LandingCarousel.jsx
import React, { useState, useRef } from 'react';
// Reference image: 69a7c900470b5eb327bd6bd8_image-4.webp (not used as background)

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
      <div style={styles.centerWrap}>
        <div style={styles.branding}>
          <div style={styles.brandTitle}>Smart-Shift-Scheduling</div>
          <div style={styles.slogan}>"Empowering Teams. Simplifying Shifts."</div>
        </div>
        <div style={styles.glassCard}>
          <div style={styles.tabBar}>
            {landingTabs.map((tab, idx) => (
              <button
                key={tab.id}
                style={{
                  ...styles.tabButton,
                  background: activeTab === idx ? 'linear-gradient(90deg, #991b1b 60%, #23232b 100%)' : 'rgba(40,40,60,0.5)',
                  color: activeTab === idx ? '#fff' : '#bbb',
                  boxShadow: activeTab === idx ? '0 2px 12px #991b1b44' : 'none',
                  border: activeTab === idx ? '2px solid #991b1b' : '2px solid transparent',
                }}
                onClick={() => setActiveTab(idx)}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <div style={{ ...styles.carouselSlider, transform: `translateX(-${activeTab * 100}%)` }}>
            {/* Tab 1: Overview & Sign Up */}
            <div style={styles.carouselPage}>
              <h2 style={styles.title}>Overview & Sign Up</h2>
              <p style={styles.desc}>Effortlessly manage shifts, staff, and operations with AI-powered tools.</p>
              <button style={styles.button} onClick={onSignUp}>New Business Sign Up</button>
            </div>
            {/* Tab 2: Employee Sign On */}
            <div style={styles.carouselPage}>
              <h2 style={styles.title}>Employee Sign On</h2>
              <input type="text" placeholder="Employee ID" style={styles.input} />
              <button style={styles.button} onClick={onEmployeeLogin}>Sign In</button>
            </div>
            {/* Tab 3: Admin Sign On */}
            <div style={styles.carouselPage}>
              <h2 style={styles.title}>Admin Sign On</h2>
              <input type="password" placeholder="Admin Code" style={styles.input} />
              <button style={styles.button} onClick={onAdminLogin}>Admin Login</button>
            </div>
          </div>
        </div>
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
  centerWrap: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100vw',
    height: '100vh',
  },
  branding: {
    textAlign: 'center',
    marginBottom: 32,
  },
  brandTitle: {
    color: '#fff',
    fontSize: 44,
    fontWeight: 900,
    letterSpacing: 3,
    textShadow: '0 2px 16px #991b1b88, 0 0px 2px #fff2',
    fontFamily: 'Montserrat, sans-serif',
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  slogan: {
    color: '#e5e5e5',
    fontSize: 22,
    fontWeight: 600,
    letterSpacing: 1,
    textShadow: '0 1px 8px #000',
    fontStyle: 'italic',
    marginBottom: 0,
  },
  glassCard: {
    background: 'rgba(30, 30, 40, 0.85)',
    borderRadius: 36,
    boxShadow: '0 16px 64px 0 #000b, 0 4px 32px 0 #991b1b66',
    border: '2.5px solid #991b1b55',
    backdropFilter: 'blur(22px)',
    padding: 0,
    minWidth: 420,
    maxWidth: 440,
    minHeight: 440,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    position: 'relative',
    overflow: 'hidden',
    margin: '0 auto',
  },
  tabBar: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 18,
    width: '100%',
    padding: '32px 0 18px 0',
    background: 'none',
    zIndex: 2,
  },
  tabButton: {
    fontWeight: 900,
    fontSize: 16,
    padding: '12px 32px',
    borderRadius: 32,
    border: '2px solid transparent',
    outline: 'none',
    cursor: 'pointer',
    background: 'rgba(40,40,60,0.5)',
    color: '#bbb',
    boxShadow: 'none',
    letterSpacing: 1,
    transition: 'all 0.25s cubic-bezier(0.19, 1, 0.22, 1)',
    marginBottom: 0,
  },
  carouselSlider: {
    display: 'flex',
    width: '300%',
    height: '100%',
    transition: 'transform 0.8s cubic-bezier(0.19, 1, 0.22, 1)',
  },
  carouselPage: {
    width: '100%',
    minWidth: 420,
    maxWidth: 440,
    minHeight: 420,
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    boxSizing: 'border-box',
    padding: 40,
    position: 'relative',
    background: 'none',
  },
  title: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 900,
    marginBottom: 18,
    letterSpacing: 2,
    textShadow: '0 2px 16px #991b1b88, 0 0px 2px #fff2',
    fontFamily: 'Montserrat, sans-serif',
    textTransform: 'uppercase',
  },
  desc: {
    color: '#e5e5e5',
    fontSize: 18,
    marginBottom: 36,
    textAlign: 'center',
    maxWidth: 340,
    fontWeight: 500,
    letterSpacing: 1,
    textShadow: '0 1px 8px #000',
  },
  input: {
    fontSize: 20,
    padding: '14px 24px',
    marginBottom: 28,
    border: '2px solid #991b1b',
    borderRadius: 8,
    background: 'rgba(40, 40, 60, 0.85)',
    color: '#fff',
    width: 260,
    fontWeight: 700,
    outline: 'none',
    boxShadow: '0 2px 12px #991b1b44, 0 1px 8px #000',
    transition: 'border 0.3s, box-shadow 0.3s',
  },
  button: {
    background: 'linear-gradient(90deg, #991b1b 0%, #23232b 100%)',
    color: '#fff',
    fontWeight: 900,
    fontSize: 18,
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
    bottom: 32,
    left: 0,
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    gap: 16,
    zIndex: 3,
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
