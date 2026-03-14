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