import React, { useState } from 'react';

const App = () => {
  const [view, setView] = useState('landing'); // landing, staff, admin
  const [idInput, setIdInput] = useState('');
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  // Authentication Logic
  const handleLogin = () => {
    if (idInput === 'ADMIN-MASTER') {
      setView('admin');
    } else if (idInput.length >= 4) {
      setView('staff');
    } else {
      alert("Please enter a valid 4-digit ID or Admin Code");
    }
  };

  // --- UI COMPONENTS ---

  const Navigation = ({ userRole }) => (
    <nav style={styles.nav}>
      <div style={styles.logo}>SMARTSHIFT V4.0</div>
      <div style={styles.navRight}>
        <span style={styles.roleBadge}>{userRole}</span>
        <div style={styles.profileArea}>
          <img 
            src="https://via.placeholder.com/40" 
            alt="Profile" 
            style={styles.profilePic} 
            onClick={() => setShowProfileMenu(!showProfileMenu)}
          />
          {showProfileMenu && (
            <div style={styles.dropdown}>
              <div style={styles.dropItem}>My Profile</div>
              <div style={styles.dropItem}>Settings</div>
              <div style={styles.dropItem} onClick={() => setView('landing')}>Logout</div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );

  const Calendar = () => (
    <div style={styles.calendarCard}>
      <h3 style={{color: '#fff', marginBottom: '15px'}}>March 2026</h3>
      <div style={styles.calendarGrid}>
        {['S','M','T','W','T','F','S'].map(d => <div key={d} style={styles.dayHeader}>{d}</div>)}
        {[...Array(31)].map((_, i) => (
          <div key={i} style={styles.daySlot}>
            {i + 1}
            {i === 14 && <div style={styles.shiftDot} />}
          </div>
        ))}
      </div>
    </div>
  );

  // --- VIEWS ---

  if (view === 'landing') {
    return (
      <div style={styles.landingContainer}>
        <div style={styles.loginCard}>
          <h1>Staff Portal</h1>
          <input 
            type="password" 
            placeholder="Employee ID" 
            style={styles.input}
            value={idInput}
            onChange={(e) => setIdInput(e.target.value)}
          />
          <button style={styles.button} onClick={handleLogin}>INITIALIZE ACCESS</button>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.dashboardContainer}>
      <Navigation userRole={view === 'admin' ? 'ADMINISTRATOR' : 'STAFF MEMBER'} />
      
      <div style={styles.mainContent}>
        <div style={styles.leftCol}>
          <h2>{view === 'admin' ? 'Business Overview' : 'My Schedule'}</h2>
          <div style={styles.statusCard}>
            {view === 'admin' ? (
              <div>
                <p>Active Employees: 12</p>
                <p>Open Shifts: 4</p>
              </div>
            ) : (
              <div>
                <p>Next Shift: Tomorrow 08:00 AM</p>
                <p>Total Hours (Week): 32.5</p>
              </div>
            )}
          </div>
          <button style={styles.actionBtn}>
            {view === 'admin' ? '+ Create New Shift' : 'Clock In'}
          </button>
        </div>

        <div style={styles.rightCol}>
          <Calendar />
        </div>
      </div>
    </div>
  );
};

// --- STYLING (The Look) ---
const styles = {
  landingContainer: { height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#0f172a' },
  loginCard: { background: '#1e293b', padding: '40px', borderRadius: '12px', textAlign: 'center', boxShadow: '0 10px 25px rgba(0,0,0,0.5)' },
  input: { padding: '12px', width: '250px', borderRadius: '6px', border: '1px solid #334155', marginBottom: '20px', display: 'block', background: '#0f172a', color: '#fff' },
  button: { background: '#f59e0b', color: '#000', padding: '12px 24px', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' },
  dashboardContainer: { minHeight: '100vh', background: '#0f172a', color: '#fff' },
  nav: { height: '70px', background: '#1e293b', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 30px', borderBottom: '1px solid #334155' },
  navRight: { display: 'flex', alignItems: 'center', gap: '20px' },
  profilePic: { width: '40px', height: '40px', borderRadius: '50%', cursor: 'pointer', border: '2px solid #f59e0b' },
  profileArea: { position: 'relative' },
  dropdown: { position: 'absolute', top: '50px', right: '0', background: '#1e293b', border: '1px solid #334155', borderRadius: '8px', width: '150px', overflow: 'hidden', zIndex: 100 },
  dropItem: { padding: '12px', fontSize: '14px', cursor: 'pointer', borderBottom: '1px solid #334155' },
  mainContent: { padding: '30px', display: 'flex', gap: '30px' },
  leftCol: { flex: 2 },
  rightCol: { flex: 1 },
  calendarCard: { background: '#1e293b', padding: '20px', borderRadius: '12px', border: '1px solid #334155' },
  calendarGrid: { display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '5px' },
  dayHeader: { textAlign: 'center', fontSize: '12px', color: '#94a3b8', paddingBottom: '10px' },
  daySlot: { height: '35px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', background: '#0f172a', borderRadius: '4px', position: 'relative' },
  shiftDot: { width: '6px', height: '6px', background: '#f59e0b', borderRadius: '50%', position: 'absolute', bottom: '4px' },
  statusCard: { background: '#1e293b', padding: '20px', borderRadius: '12px', marginBottom: '20px' },
  actionBtn: { padding: '15px 30px', borderRadius: '8px', border: 'none', background: '#f59e0b', fontWeight: 'bold', cursor: 'pointer' },
  roleBadge: { background: '#334155', padding: '4px 12px', borderRadius: '20px', fontSize: '12px' },
  logo: { fontWeight: 'bold', fontSize: '18px', color: '#f59e0b' }
};

export default App;
