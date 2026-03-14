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
    <div style={{ ...styles.root, background: theme === 'dark' ? styles.root.background : '#fff', color: theme === 'dark' ? '#fff' : '#222' }}>
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
      {/* Calendar */}
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
    background: 'linear-gradient(135deg, #18181b 0%, #23232b 60%, #991b1b 100%)',
    color: '#fff',
    fontFamily: 'Montserrat, sans-serif',
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '32px 48px 16px 48px',
    borderBottom: '2px solid #991b1b44',
    background: 'rgba(30,30,40,0.85)',
    boxShadow: '0 2px 16px #991b1b22',
  },
  headerLeft: { display: 'flex', flexDirection: 'column', alignItems: 'flex-start' },
  empName: { fontWeight: 900, fontSize: 28, color: '#fff', letterSpacing: 1, marginBottom: 2 },
  empRole: { fontWeight: 700, fontSize: 16, color: '#991b1b', letterSpacing: 1 },
  empId: { fontWeight: 700, fontSize: 14, color: '#fff', opacity: 0.7 },
  headerCenter: { fontWeight: 900, fontSize: 24, color: '#fff', letterSpacing: 2, textShadow: '0 2px 12px #991b1b88' },
  headerRight: { position: 'relative' },
  profilePic: { width: 56, height: 56, borderRadius: '50%', border: '2px solid #991b1b', cursor: 'pointer', boxShadow: '0 2px 12px #991b1b44' },
  dropdownMenu: { position: 'absolute', top: 60, right: 0, background: '#23232b', border: '1px solid #991b1b', borderRadius: 8, boxShadow: '0 2px 12px #991b1b44', zIndex: 10 },
  dropdownItem: { padding: '12px 32px', color: '#fff', cursor: 'pointer', fontWeight: 700, borderBottom: '1px solid #991b1b22' },
  calendarSection: { flex: 1, padding: '40px 48px', display: 'flex', flexDirection: 'column', alignItems: 'center' },
  calendarTitle: { fontWeight: 900, fontSize: 22, color: '#fff', marginBottom: 18, letterSpacing: 1, textShadow: '0 2px 8px #991b1b44' },
  calendarGrid: { display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 18, width: '100%', maxWidth: 900, background: 'rgba(30,30,40,0.92)', borderRadius: 24, boxShadow: '0 2px 16px #991b1b22', padding: 24 },
  calendarDay: { background: '#23232b', borderRadius: 12, padding: '12px 8px', minHeight: 80, display: 'flex', flexDirection: 'column', alignItems: 'center', boxShadow: '0 2px 8px #991b1b22' },
  dayNum: { fontWeight: 900, fontSize: 18, color: '#fff', marginBottom: 6 },
  shiftsList: { display: 'flex', flexDirection: 'column', gap: 4 },
  shiftItem: { background: '#991b1b', color: '#fff', borderRadius: 6, padding: '2px 8px', fontWeight: 700, fontSize: 13, marginBottom: 2, boxShadow: '0 1px 4px #991b1b44' },
  settingsModalOverlay: { position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.7)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' },
  settingsModal: { background: '#23232b', color: '#fff', borderRadius: 16, padding: 36, minWidth: 340, maxWidth: 400, textAlign: 'center', boxShadow: '0 8px 32px #991b1b44' },
  settingsTitle: { fontWeight: 900, fontSize: 20, marginBottom: 18, letterSpacing: 1 },
  settingsSection: { fontWeight: 700, fontSize: 15, color: '#991b1b', margin: '18px 0 8px 0', letterSpacing: 1 },
  notificationsList: { listStyle: 'none', padding: 0, margin: 0 },
  notificationItem: { background: '#991b1b', color: '#fff', borderRadius: 8, padding: '8px 16px', marginBottom: 8, fontWeight: 700, fontSize: 14, boxShadow: '0 1px 6px #991b1b44' },
  themeButton: { fontWeight: 900, fontSize: 15, padding: '8px 24px', border: 'none', borderRadius: 8, cursor: 'pointer', boxShadow: '0 1px 6px #991b1b44', letterSpacing: 1, textTransform: 'uppercase', transition: 'background 0.3s, color 0.3s' },
  closeButton: { background: '#991b1b', color: '#fff', fontWeight: 900, fontSize: 15, padding: '8px 24px', border: 'none', borderRadius: 8, cursor: 'pointer', marginTop: 18, boxShadow: '0 1px 6px #991b1b44', letterSpacing: 1, textTransform: 'uppercase', transition: 'background 0.3s, color 0.3s' },
};
