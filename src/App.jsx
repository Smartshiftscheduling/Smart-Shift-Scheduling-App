import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ScheduleBuilder from './admin/ScheduleBuilder';

const App = () => {
  const [activeTab, setActiveTab] = useState('admin');

  const styles = {
    appContainer: {
      minHeight: '100vh',
      backgroundColor: '#000000',
      backgroundImage: 'radial-gradient(circle at top right, #111111, #000000)',
      color: '#ffffff',
      fontFamily: '"Times New Roman", Times, serif',
      padding: '20px'
    },
    logoSection: {
      textAlign: 'center',
      padding: '30px 0'
    },
    logoImg: {
      height: '100px',
      filter: 'drop-shadow(0 0 10px rgba(212, 175, 55, 0.3))'
    },
    nav: {
      display: 'flex',
      justifyContent: 'center',
      gap: '20px',
      marginBottom: '50px'
    },
    navBtn: (active) => ({
      padding: '10px 30px',
      backgroundColor: 'transparent',
      color: active ? '#d4af37' : '#666',
      border: 'none',
      borderBottom: active ? '2px solid #d4af37' : '2px solid transparent',
      cursor: 'pointer',
      fontSize: '0.9rem',
      letterSpacing: '0.3em',
      textTransform: 'uppercase',
      transition: 'all 0.4s ease'
    }),
    grid: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '30px',
      maxWidth: '1200px',
      margin: '0 auto'
    },
    goldCard: {
      background: 'rgba(10, 10, 10, 0.9)',
      border: '1px solid rgba(212, 175, 55, 0.15)',
      borderRadius: '4px',
      padding: '40px',
      boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
      position: 'relative'
    },
    cardLabel: {
      fontSize: '0.7rem',
      color: '#d4af37',
      letterSpacing: '0.4em',
      textTransform: 'uppercase',
      marginBottom: '20px',
      display: 'block'
    },
    statValue: {
      fontSize: '4.5rem',
      fontWeight: '300',
      color: '#ffffff'
    }
  };

  return (
    <div style={styles.appContainer}>
      <div style={styles.logoSection}>
        <img src="/src/assets/smart logo.png" alt="Smart Shift" style={styles.logoImg} />
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
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.6 }}
        >
          {activeTab === 'admin' ? (
            <div style={styles.grid}>
              <div style={styles.goldCard}>
                <span style={styles.cardLabel}>Personnel Active</span>
                <div style={styles.statValue}>12</div>
              </div>

              <div style={styles.goldCard}>
                <span style={styles.cardLabel}>Security Level</span>
                <div style={{...styles.statValue, color: '#d4af37'}}>MAX</div>
              </div>

              <div style={styles.goldCard}>
                <span style={styles.cardLabel}>System Health</span>
                <div style={styles.statValue}>99<span style={{fontSize: '1.5rem'}}>%</span></div>
              </div>

              <div style={styles.goldCard}>
                <span style={styles.cardLabel}>Schedule Control</span>
                <div style={{marginTop: '20px'}}>
                   <ScheduleBuilder />
                </div>
              </div>
            </div>
          ) : (
            <div style={{textAlign: 'center', marginTop: '100px', letterSpacing: '0.5em', color: '#666'}}>
               UNAUTHORIZED ACCESS RESTRICTED
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default App;