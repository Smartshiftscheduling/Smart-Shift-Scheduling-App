import React, { useState } from 'react';
import SmartShiftLogo from '../SmartShiftLogo.svg';
import SchedulingBoard from './SchedulingBoard';

const adminRoles = [
  'Supervisor',
  'Foreman',
  'Shift Lead',
  'Manager',
  'Assistant Manager',
  'General Manager',
  'District Manager',
];

const employeesSample = [
  { name: 'Jane Doe', type: 'Full Time', id: '10001' },
  { name: 'John Smith', type: 'Part Time', id: '10002' },
  { name: 'Alex Lee', type: 'Seasonal', id: '10003' },
];

const staff = [
  { id:"john", name:"John", availability:["mon","tue","wed"] },
  { id:"sarah", name:"Sarah", availability:["mon","thu","fri"] },
  { id:"mike", name:"Mike", availability:["tue","wed","fri"] }
];

const shifts = [
  { id:"s1", day:"mon", start:9, end:17, hours:8 },
  { id:"s2", day:"tue", start:9, end:17, hours:8 },
  { id:"s3", day:"wed", start:9, end:17, hours:8 },
  { id:"s4", day:"thu", start:9, end:17, hours:8 },
  { id:"s5", day:"fri", start:9, end:17, hours:8 }
];

export default function AdminDashboard({ adminName = 'Admin User', adminRole = 'Manager', profilePic, agent }) {
  const [role, setRole] = useState(adminRole);
  const [dropdown, setDropdown] = useState(false);
  const [hours, setHours] = useState('');
  const [monthHours, setMonthHours] = useState('');
  const [overtime, setOvertime] = useState('');
  const [message, setMessage] = useState('');
  const [recipient, setRecipient] = useState('all');
  const [notifications, setNotifications] = useState([
    'Shift swap request: Jane Doe',
    'Schedule approval needed: John Smith',
  ]);

  return (
    <div style={styles.root}>
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.headerLeft}>
          <div style={styles.adminName}>{adminName}</div>
          <div style={styles.adminRole}>{role}</div>
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
              <div style={styles.dropdownItem}>Account Settings</div>
              <div style={styles.dropdownItem}>Profile</div>
              <div style={styles.dropdownItem} onClick={() => window.location.reload()}>Logout</div>
            </div>
          )}
        </div>
      </div>
      {/* Main Content */}
      <div style={styles.main}>
        {/* Section 1: Employees */}
        <div style={styles.section}>
          <div style={styles.sectionTitle}>Employees</div>
          <div style={styles.employeeList}>
            {employeesSample.map(emp => (
              <div key={emp.id} style={styles.employeeCard}>
                <div style={styles.empName}>{emp.name}</div>
                <div style={styles.empType}>{emp.type}</div>
                <div style={styles.empId}>#{emp.id}</div>
              </div>
            ))}
          </div>
        </div>
        {/* Section 2: Hours & Overtime */}
        <div style={styles.section}>
          <div style={styles.sectionTitle}>Hours Management</div>
          <input
            style={styles.input}
            type="text"
            placeholder="Available hours this week"
            value={hours}
            onChange={e => setHours(e.target.value)}
          />
          <input
            style={styles.input}
            type="text"
            placeholder="Set available hours for month (e.g. 160)"
            value={monthHours}
            onChange={e => setMonthHours(e.target.value)}
          />
          <input
            style={styles.input}
            type="text"
            placeholder="Overtime hours available"
            value={overtime}
            onChange={e => setOvertime(e.target.value)}
          />
        </div>
        {/* Section 3: Messaging & Notifications */}
        <div style={styles.section}>
          <div style={styles.sectionTitle}>Messaging & Notifications</div>
          <select style={styles.input} value={recipient} onChange={e => setRecipient(e.target.value)}>
            <option value="all">All Employees</option>
            {employeesSample.map(emp => (
              <option key={emp.id} value={emp.id}>{emp.name}</option>
            ))}
          </select>
          <textarea
            style={{ ...styles.input, minHeight: 60 }}
            placeholder="Type message..."
            value={message}
            onChange={e => setMessage(e.target.value)}
          />
          <button style={styles.button}>Send Message</button>
          <div style={styles.notificationsTitle}>Notifications</div>
          <ul style={styles.notificationsList}>
            {notifications.map((n, i) => (
              <li key={i} style={styles.notificationItem}>{n}</li>
            ))}
          </ul>
        </div>
        {/* Section 4: Scheduling Board */}
        <div style={styles.section}>
          <SchedulingBoard
            staff={staff}
            shifts={shifts}
            agent={agent}
          />
        </div>
      </div>
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
    boxShadow: '0 8px 48px #991b1b33',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '32px 48px 16px 48px',
    borderBottom: '2px solid #991b1b88',
    background: 'rgba(30,30,40,0.92)',
    boxShadow: '0 4px 32px #991b1b44, 0 1.5px 0 #fff2',
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
  },
  headerLeft: { display: 'flex', flexDirection: 'column', alignItems: 'flex-start' },
  adminName: { fontWeight: 900, fontSize: 28, color: '#fff', letterSpacing: 1, marginBottom: 2 },
  adminRole: { fontWeight: 700, fontSize: 16, color: '#991b1b', letterSpacing: 1 },
  headerCenter: { fontWeight: 900, fontSize: 24, color: '#fff', letterSpacing: 2, textShadow: '0 2px 12px #991b1b88' },
  headerRight: { position: 'relative' },
  profilePic: { width: 56, height: 56, borderRadius: '50%', border: '2px solid #991b1b', cursor: 'pointer', boxShadow: '0 2px 12px #991b1b44' },
  dropdownMenu: { position: 'absolute', top: 60, right: 0, background: '#23232b', border: '1px solid #991b1b', borderRadius: 8, boxShadow: '0 2px 12px #991b1b44', zIndex: 10 },
  dropdownItem: { padding: '12px 32px', color: '#fff', cursor: 'pointer', fontWeight: 700, borderBottom: '1px solid #991b1b22' },
  main: { display: 'flex', flex: 1, padding: '40px 48px', gap: 32, justifyContent: 'space-between' },
  section: {
    background: 'linear-gradient(120deg, rgba(30,30,40,0.98) 60%, #991b1b22 100%)',
    borderRadius: 24,
    boxShadow: '0 8px 32px #991b1b33, 0 2px 16px #fff1',
    padding: 32,
    minWidth: 320,
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    margin: 8,
    border: '2px solid #991b1b44',
    backdropFilter: 'blur(8px)',
  },
  sectionTitle: {
    fontWeight: 900,
    fontSize: 22,
    color: '#fff',
    marginBottom: 18,
    letterSpacing: 1,
    textShadow: '0 2px 12px #991b1b88, 0 1px 0 #fff2',
    textTransform: 'uppercase',
    borderLeft: '6px solid #991b1b',
    paddingLeft: 12,
  },
  employeeList: { width: '100%', display: 'flex', flexDirection: 'column', gap: 16 },
  employeeCard: {
    background: 'rgba(35,35,43,0.98)',
    borderRadius: 12,
    padding: '16px 20px',
    boxShadow: '0 4px 16px #991b1b33, 0 1px 4px #fff1',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    border: '1.5px solid #991b1b44',
    marginBottom: 4,
  },
  empName: { fontWeight: 700, fontSize: 18, color: '#fff' },
  empType: { fontWeight: 500, fontSize: 14, color: '#991b1b', marginBottom: 2 },
  empId: { fontWeight: 700, fontSize: 14, color: '#fff', opacity: 0.7 },
  input: {
    width: '100%',
    fontSize: 16,
    padding: '12px 16px',
    borderRadius: 8,
    border: '2px solid #991b1b',
    background: 'rgba(24,24,27,0.95)',
    color: '#fff',
    marginBottom: 16,
    fontWeight: 700,
    outline: 'none',
    boxShadow: '0 1px 6px #991b1b33',
    transition: 'border 0.3s, box-shadow 0.3s',
  },
  button: {
    background: 'linear-gradient(90deg, #991b1b 0%, #23232b 100%)',
    color: '#fff',
    fontWeight: 900,
    fontSize: 16,
    padding: '12px 32px',
    border: 'none',
    borderRadius: 8,
    cursor: 'pointer',
    marginTop: 8,
    boxShadow: '0 4px 16px #991b1b44, 0 1px 4px #fff1',
    letterSpacing: 1,
    textTransform: 'uppercase',
    transition: 'background 0.3s, color 0.3s',
  },
  notificationsTitle: { fontWeight: 900, fontSize: 16, color: '#fff', marginTop: 24, marginBottom: 8, letterSpacing: 1 },
  notificationsList: { listStyle: 'none', padding: 0, margin: 0 },
  notificationItem: {
    background: 'linear-gradient(90deg, #991b1b 60%, #23232b 100%)',
    color: '#fff',
    borderRadius: 8,
    padding: '8px 16px',
    marginBottom: 8,
    fontWeight: 700,
    fontSize: 14,
    boxShadow: '0 2px 8px #991b1b44',
    border: '1.5px solid #991b1b44',
  },
};
