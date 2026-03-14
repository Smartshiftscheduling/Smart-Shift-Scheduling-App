import React, { useState } from 'react';
import SmartShiftLogo from '../SmartShiftLogo.svg';

const employeeSample = {
  name: 'Jane Doe',
  position: 'Cashier',
  id: '10001',
};

const shiftsSample = [
  { date: '2026-03-15', shifts: ['8am-4pm', '4pm-12am'] },
  { date: '2026-03-16', shifts: ['8am-4pm'] },
  { date: '2026-03-17', shifts: ['12pm-8pm'] },
  { date: '2026-03-18', shifts: ['8am-4pm', '4pm-12am'] },
  { date: '2026-03-19', shifts: ['8am-4pm'] },
  { date: '2026-03-20', shifts: ['12pm-8pm'] },
  { date: '2026-03-21', shifts: ['8am-4pm'] },
];

function getMonthDays(year, month) {
  const date = new Date(year, month, 1);
  const days = [];
  while (date.getMonth() === month) {
    days.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }
  return days;
}

export default function EmployeeDashboard({ profilePic }) {
  const [dropdown, setDropdown] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [theme, setTheme] = useState('dark');
  const [notifications] = useState([
    'Overtime hours posted',
    'Shift swap approved',
    'New message from Admin',
  ]);
  const today = new Date();
  const days = getMonthDays(today.getFullYear(), today.getMonth());
  const shiftsByDate = Object.fromEntries(shiftsSample.map(s => [s.date, s.shifts]));

  return (
    <div style={{ ...styles.root, background: theme === 'dark' ? 'linear-gradient(135deg, #2a2a3a 0%, #3a3a4a 60%, #4a90e2 100%)' : '#f5f5f5', color: theme === 'dark' ? '#fff' : '#333' }}>
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.headerLeft}>
          <div style={styles.empName}>{employeeSample.name}</div>
          <div style={styles.empRole}>{employeeSample.position}</div>
          <div style={styles.empId}>#{employeeSample.id}</div>
        </div>
        <div style={styles.headerCenter}>Smart-Shift-Scheduling</div>
        <div style={styles.headerRight}>
          <img
            src={profilePic || SmartShiftLogo}
            alt="Profile"
            style={styles.profilePic}
            onClick={() => setDropdown(!dropdown)}
          />
          {dropdown && (
            <div style={styles.dropdownMenu}>
              <div style={styles.dropdownItem}>Account Profile</div>
              <div style={styles.dropdownItem} onClick={() => setSettingsOpen(true)}>Settings</div>
              <div style={styles.dropdownItem} onClick={() => window.location.reload()}>Logout</div>
            </div>
          )}
        </div>
      </div>
      {/* Main Content */}
      <div style={styles.mainContent}>
        {/* Calendar Section - Left */}
        <div style={styles.calendarSection}>
          <div style={styles.calendarTitle}>Your Schedule</div>
          <div style={styles.calendarGrid}>
            {days.map((day, idx) => {
              const dateStr = day.toISOString().slice(0, 10);
              return (
                <div key={dateStr} style={styles.calendarDay}>
                  <div style={styles.dayNum}>{day.getDate()}</div>
                  <div style={styles.shiftsList}>
                    {(shiftsByDate[dateStr] || []).map((shift, i) => (
                      <div key={i} style={styles.shiftItem}>{shift}</div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        {/* Right Section */}
        <div style={styles.rightSection}>
          <div style={styles.section}>
            <div style={styles.sectionTitle}>Quick Actions</div>
            <button style={styles.actionButton}>Request Time Off</button>
            <button style={styles.actionButton}>Swap Shift</button>
            <button style={styles.actionButton}>View Pay Stub</button>
          </div>
          <div style={styles.section}>
            <div style={styles.sectionTitle}>Messages</div>
            <div style={styles.messageList}>
              <div style={styles.messageItem}>New schedule posted for next week</div>
              <div style={styles.messageItem}>Overtime opportunity available</div>
              <div style={styles.messageItem}>Team meeting reminder</div>
            </div>
          </div>
        </div>
      </div>
      {/* Settings Modal */}
      {settingsOpen && (
        <div style={styles.settingsModalOverlay} onClick={() => setSettingsOpen(false)}>
          <div style={styles.settingsModal} onClick={e => e.stopPropagation()}>
            <div style={styles.settingsTitle}>Settings</div>
            <div style={styles.settingsSection}>Notifications</div>
            <ul style={styles.notificationsList}>
              {notifications.map((n, i) => (
                <li key={i} style={styles.notificationItem}>{n}</li>
              ))}
            </ul>
            <div style={styles.settingsSection}>Theme</div>
            <div style={{ display: 'flex', gap: 16, marginBottom: 24 }}>
              <button style={{ ...styles.themeButton, background: theme === 'dark' ? '#991b1b' : '#eee', color: theme === 'dark' ? '#fff' : '#991b1b' }} onClick={() => setTheme('dark')}>Dark</button>
              <button style={{ ...styles.themeButton, background: theme === 'light' ? '#991b1b' : '#eee', color: theme === 'light' ? '#fff' : '#991b1b' }} onClick={() => setTheme('light')}>Light</button>
            </div>
            <button style={styles.closeButton} onClick={() => setSettingsOpen(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  root: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #2a2a3a 0%, #3a3a4a 60%, #4a90e2 100%)',
    color: '#fff',
    fontFamily: 'Montserrat, sans-serif',
    display: 'flex',
    flexDirection: 'column',
    boxShadow: '0 8px 48px #4a90e233',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '32px 48px 16px 48px',
    borderBottom: '2px solid #4a90e288',
    background: 'rgba(42,42,58,0.92)',
    boxShadow: '0 4px 32px #4a90e244, 0 1.5px 0 #fff2',
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
  },
  headerLeft: { display: 'flex', flexDirection: 'column', alignItems: 'flex-start' },
  empName: { fontWeight: 900, fontSize: 28, color: '#fff', letterSpacing: 1, marginBottom: 2 },
  empRole: { fontWeight: 700, fontSize: 16, color: '#4a90e2', letterSpacing: 1 },
  empId: { fontWeight: 700, fontSize: 14, color: '#fff', opacity: 0.7 },
  headerCenter: { fontWeight: 900, fontSize: 24, color: '#fff', letterSpacing: 2, textShadow: '0 2px 12px #4a90e288' },
  headerRight: { position: 'relative' },
  profilePic: { width: 56, height: 56, borderRadius: '50%', border: '2px solid #4a90e2', cursor: 'pointer', boxShadow: '0 2px 12px #4a90e244' },
  dropdownMenu: { position: 'absolute', top: 60, right: 0, background: '#3a3a4a', border: '1px solid #4a90e2', borderRadius: 8, boxShadow: '0 2px 12px #4a90e244', zIndex: 10 },
  dropdownItem: { padding: '12px 32px', color: '#fff', cursor: 'pointer', fontWeight: 700, borderBottom: '1px solid #4a90e222' },
  mainContent: { display: 'flex', flex: 1, padding: '40px 48px', gap: 32, alignItems: 'flex-start' },
  calendarSection: { flex: 3, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', maxWidth: '70%' },
  calendarTitle: {
    fontWeight: 900,
    fontSize: 24,
    color: '#fff',
    marginBottom: 18,
    letterSpacing: 1,
    textShadow: '0 2px 12px #4a90e288, 0 1px 0 #fff2',
    textTransform: 'uppercase',
    borderLeft: '6px solid #4a90e2',
    paddingLeft: 12,
  },
  calendarGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(7, 1fr)',
    gap: 18,
    width: '100%',
    background: 'linear-gradient(120deg, rgba(42,42,58,0.98) 60%, #4a90e222 100%)',
    borderRadius: 24,
    boxShadow: '0 8px 32px #4a90e233, 0 2px 16px #fff1',
    padding: 24,
    border: '2px solid #4a90e244',
    backdropFilter: 'blur(8px)',
  },
  calendarDay: {
    background: 'rgba(58,58,74,0.98)',
    borderRadius: 12,
    padding: '12px 8px',
    minHeight: 80,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    boxShadow: '0 4px 16px #4a90e233, 0 1px 4px #fff1',
    border: '1.5px solid #4a90e244',
    marginBottom: 4,
  },
  dayNum: { fontWeight: 900, fontSize: 18, color: '#fff', marginBottom: 6 },
  shiftsList: { display: 'flex', flexDirection: 'column', gap: 4 },
  shiftItem: {
    background: 'linear-gradient(90deg, #4a90e2 60%, #3a3a4a 100%)',
    color: '#fff',
    borderRadius: 6,
    padding: '2px 8px',
    fontWeight: 700,
    fontSize: 13,
    marginBottom: 2,
    boxShadow: '0 2px 8px #4a90e244',
    border: '1.5px solid #4a90e244',
  },
  rightSection: { flex: 1, display: 'flex', flexDirection: 'column', gap: 24 },
  section: {
    background: 'linear-gradient(120deg, rgba(42,42,58,0.98) 60%, #4a90e222 100%)',
    borderRadius: 24,
    boxShadow: '0 8px 32px #4a90e233, 0 2px 16px #fff1',
    padding: 24,
    border: '2px solid #4a90e244',
    backdropFilter: 'blur(8px)',
  },
  sectionTitle: {
    fontWeight: 900,
    fontSize: 20,
    color: '#fff',
    marginBottom: 16,
    letterSpacing: 1,
    textShadow: '0 2px 12px #4a90e288, 0 1px 0 #fff2',
    textTransform: 'uppercase',
    borderLeft: '4px solid #4a90e2',
    paddingLeft: 8,
  },
  actionButton: {
    background: 'linear-gradient(90deg, #4a90e2 0%, #3a3a4a 100%)',
    color: '#fff',
    fontWeight: 900,
    fontSize: 14,
    padding: '10px 20px',
    border: 'none',
    borderRadius: 8,
    cursor: 'pointer',
    marginBottom: 12,
    boxShadow: '0 4px 16px #4a90e244, 0 1px 4px #fff1',
    letterSpacing: 1,
    textTransform: 'uppercase',
    transition: 'background 0.3s, color 0.3s',
    width: '100%',
  },
  messageList: { display: 'flex', flexDirection: 'column', gap: 8 },
  messageItem: {
    background: 'linear-gradient(90deg, #4a90e2 60%, #3a3a4a 100%)',
    color: '#fff',
    borderRadius: 8,
    padding: '8px 12px',
    fontWeight: 700,
    fontSize: 13,
    boxShadow: '0 2px 8px #4a90e244',
    border: '1.5px solid #4a90e244',
  },
  settingsModalOverlay: { position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.7)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' },
  settingsModal: {
    background: 'linear-gradient(120deg, #3a3a4a 80%, #4a90e222 100%)',
    color: '#fff',
    borderRadius: 16,
    padding: 36,
    minWidth: 340,
    maxWidth: 400,
    textAlign: 'center',
    boxShadow: '0 8px 32px #4a90e244, 0 2px 8px #fff1',
    border: '2px solid #4a90e244',
    backdropFilter: 'blur(8px)',
  },
  settingsTitle: { fontWeight: 900, fontSize: 20, marginBottom: 18, letterSpacing: 1 },
  settingsSection: { fontWeight: 700, fontSize: 15, color: '#4a90e2', margin: '18px 0 8px 0', letterSpacing: 1 },
  notificationsList: { listStyle: 'none', padding: 0, margin: 0 },
  notificationItem: {
    background: 'linear-gradient(90deg, #4a90e2 60%, #3a3a4a 100%)',
    color: '#fff',
    borderRadius: 8,
    padding: '8px 16px',
    marginBottom: 8,
    fontWeight: 700,
    fontSize: 14,
    boxShadow: '0 2px 8px #4a90e244',
    border: '1.5px solid #4a90e244',
  },
  themeButton: { fontWeight: 900, fontSize: 15, padding: '8px 24px', border: 'none', borderRadius: 8, cursor: 'pointer', boxShadow: '0 1px 6px #4a90e244', letterSpacing: 1, textTransform: 'uppercase', transition: 'background 0.3s, color 0.3s' },
  closeButton: { background: '#4a90e2', color: '#fff', fontWeight: 900, fontSize: 15, padding: '8px 24px', border: 'none', borderRadius: 8, cursor: 'pointer', marginTop: 18, boxShadow: '0 1px 6px #4a90e244', letterSpacing: 1, textTransform: 'uppercase', transition: 'background 0.3s, color 0.3s' },
};
