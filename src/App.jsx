import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ScheduleBuilder from './ScheduleBuilder';
import LandingCarousel from './LandingCarousel';

const App = () => {
  const [activeTab, setActiveTab] = useState(0);

  const styles = {
    appContainer: {
      minHeight: '100vh',
      backgroundColor: '#0f172a',
      color: '#f8fafc',
      fontFamily: '"Inter", sans-serif',
      padding: '20px'
    },
    nav: {
      display: 'flex',
      gap: '10px',
      marginBottom: '30px',
      justifyContent: 'center'
    },
    navBtn: (active) => ({
      padding: '10px 20px',
      borderRadius: '8px',
      border: 'none',
      cursor: 'pointer',
      backgroundColor: active ? '#3b82f6' : '#1e293b',
      color: 'white',
      transition: 'all 0.3s ease'
    }),
    carouselPage: {
      maxWidth: '1200px',
      margin: '0 auto'
    },
    adminGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '20px'
    },
    glassPanel: {
      background: 'rgba(30, 41, 59, 0.7)',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      borderRadius: '16px',
      padding: '24px',
      minHeight: '150px'
    },
    panelLabel: {
      fontSize: '0.875rem',
      color: '#94a3b8',
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
      marginBottom: '10px'
    },
    bigStat: {
      fontSize: '2.5rem',
      fontWeight: 'bold',
      color: '#3b82f6'
    },
    statSub: {
      fontSize: '1rem',
      color: '#64748b',
      marginLeft: '8px'
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 0: // STAFF PORTAL
        return (
          <div style={styles.carouselPage}>
            <div style={styles.glassPanel}>
              <div style={styles.panelLabel}>Staff Portal</div>
              <motion.div 
                style={styles.bigStat}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                WELCOME <span style={styles.statSub}>BACK</span>
              </motion.div>
              <LandingCarousel />
            </div>
          </div>
        );

      case 1: // ADMIN DASHBOARD
        return (
          <div style={styles.carouselPage}>
            <div style={styles.adminGrid}>
              {/* PANEL 1 */}
              <div style={styles.glassPanel}>
                <div style={styles.panelLabel}>Active Workforce</div>
                <motion.div 
                  style={styles.bigStat}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  12 <span style={styles.statSub}>UNITS</span>
                </motion.div>
              </div>

              {/* PANEL 2 */}
              <div style={styles.glassPanel}>
                <div style={styles.panelLabel}>Operations</div>
                <motion.div 
                  style={styles.bigStat}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  08 <span style={styles.statSub}>ACTIVE</span>
                </motion.div>
              </div>

              {/* PANEL 3 */}
              <div style={styles.glassPanel}>
                <div style={styles.panelLabel}>System Health</div>
                <div style={{ color: '#4ade80', fontSize: '1.5rem', marginTop: '10px' }}>
                  ● 99.9% <span style={styles.statSub}>UPTIME</span>
                </div>
              </div>

              {/* PANEL 4: Scheduling Board */}
              <div style={styles.glassPanel}>
                <div style={styles.panelLabel}>Scheduling Board</div>
                <div style={{ marginTop: '15px' }}>
                  <ScheduleBuilder />
                </div>
              </div>
            </div>
          </div>
        );

      case 2: // SYSTEM STATUS
        return (
          <div style={styles.carouselPage}>
            <div style={styles.glassPanel}>
              <div style={styles.panelLabel}>System Logs</div>
              <p>All modules operational. No critical errors found.</p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div style={styles.appContainer}>
      <nav style={styles.nav}>
        <button 
          style={styles.navBtn(activeTab === 0)} 
          onClick={() => setActiveTab(0)}
        >
          Staff
        </button>
        <button 
          style={styles.navBtn(activeTab === 1)} 
          onClick={() => setActiveTab(1)}
        >
          Admin
        </button>
        <button 
          style={styles.navBtn(activeTab === 2)} 
          onClick={() => setActiveTab(2)}
        >
          System
        </button>
      </nav>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -10 }}
          transition={{ duration: 0.3 }}
        >
          {renderContent()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default App;