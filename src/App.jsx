import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ScheduleBuilder from './admin/ScheduleBuilder';

const App = () => {
  const [activeTab, setActiveTab] = useState('admin');

  const styles = {
    appContainer: {
      minHeight: '100vh',
      backgroundColor: '#000000', // True Black to match logo background
      backgroundImage: 'radial-gradient(circle at top right, #1a1a1a, #000000)',
      color: '#ffffff',
      fontFamily: '"Playfair Display", serif', // Matches the elegant logo style
      padding: '20px'
    },
    logoContainer: {
      textAlign: 'center',
      padding: '20px 0',
      marginBottom: '20px'
    },
    logoImg: {
      height: '80px', // Adjust based on your preference
      marginBottom: '10px'
    },
    nav: {
      display: 'flex',
      justifyContent: 'center',
      gap: '15px',
      marginBottom: '40px'
    },
    navBtn: (active) => ({
      padding: '12px 28px',
      borderRadius: '4px',
      border: active ? '1px solid #d4af37' : '1px solid rgba(255,255,255,0.1)',
      backgroundColor: active ? 'rgba(212, 175, 55, 0.1)' : 'transparent',
      color: active ? '#d4af37' : '#999',
      cursor: 'pointer',
      fontSize: '0.8rem',
      letterSpacing: '0.2em',
      textTransform: 'uppercase',
      transition: 'all 0.4s ease'
    }),
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '25px',
      maxWidth: '1100px',
      margin: '0 auto'
    },
    glassPanel: {
      background: 'rgba(10, 10, 10, 0.8)',
      border: '1px solid rgba(212, 175, 55, 0.2)', // Subtle Gold Border
      borderRadius: '2px', // Sharper, more executive corners
      padding: '40px',
      boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
      position: 'relative'
    },
    panelLabel: {
      fontSize: '0.65rem',
      color: '#d4af37', // Branding Gold
      textTransform: 'uppercase',
      letterSpacing: '0.3em',
      marginBottom: '20px',
      display: 'block'
    },
    bigStat: {
      fontSize: '4rem',
      fontWeight: '300',
      color: '#ffffff',
      lineHeight: '1'
    }
  };

  return (
    <div style={styles.appContainer}>
      {/* BRANDING SECTION */}
      <div style={styles.logoContainer}>
        <img src="/src/assets/smart logo.png" alt="Smart Shift Logo" style={styles.logoImg} />
      </div>

      <nav style={styles.nav}>
        {['staff', 'admin', 'system'].map((tab) => (
          <button 
            key={tab} 
            style={styles.navBtn(activeTab === tab)}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </nav>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.5 }}
        >
          {activeTab === 'admin' ? (
            <div style={styles.grid}>
              {/* Panel 1 */}
              <div style={styles.glassPanel}>
                <span style={styles.panelLabel}>Active Units</span>
                <div style={styles.bigStat}>12</div>
              </div>

              {/* Panel 2 */}
              <div style={styles.glassPanel}>
                <span style={styles.panelLabel}>Operational Capacity</span>
                <div style={styles.bigStat}>88<span style={{fontSize: '1.5rem'}}>%</span></div>
              </div>

              {/* Panel 3 */}
              <div style={styles.glassPanel}>
                <span style={styles.panelLabel}>System Integrity</span>
                <div style={{...styles.bigStat, color: '#d4af37'}}>SECURE</div>
              </div>

              {/* Panel 4: The Scheduler */}
              <div style={styles.glassPanel}>
                <span style={styles.panelLabel}>Shift Management</span>
                <ScheduleBuilder />
              </div>
            </div>
          ) : (
            <div style={{textAlign: 'center', marginTop: '100px'}}>
              <h2 style={{letterSpacing: '0.5em', fontWeight: '200'}}>ACCESSING {activeTab.toUpperCase()}...</h2>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default App;