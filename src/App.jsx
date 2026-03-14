
import React, { useState } from 'react';
import useAgent from './ai/useAgent';
import LandingCarousel from './LandingCarousel';
import AdminDashboard from './admin/AdminDashboard';
import EmployeeDashboard from './employee/EmployeeDashboard';

const App = () => {

  const [view, setView] = useState('landing');
  const [activeTab, setActiveTab] = useState(0);

  // AI Agent integration
  const agent = useAgent();
  const [aiInput, setAiInput] = useState('');
  const [aiOutput, setAiOutput] = useState('');
  const [aiMode, setAiMode] = useState('question'); // 'question', 'schedule', 'optimize'

  // Tutorial modal state
  const [showTutorial, setShowTutorial] = useState(false);
  const [tutorialStep, setTutorialStep] = useState(0);

  const tabs = [
    { id: 0, label: 'STAFF' },
    { id: 1, label: 'ADMIN' },
    { id: 2, label: 'SYSTEM' }
  ];

  // Track which dashboard to show: 'admin', 'employee', or null
  const [dashboardType, setDashboardType] = useState(null);
  if (view === 'landing') {
    return (
      <LandingCarousel
        onEmployeeLogin={() => {
          setDashboardType('employee');
          setView('dashboard');
          setShowTutorial(true);
          setTutorialStep(0);
        }}
        onAdminLogin={() => {
          setDashboardType('admin');
          setView('dashboard');
          setShowTutorial(true);
          setTutorialStep(0);
        }}
        onSignUp={() => {
          alert('Sign up flow coming soon!');
        }}
      />
    );
  }

  if (dashboardType === 'admin') {
    return <AdminDashboard adminName="Jordan Maxwell" adminRole="General Manager" />;
  }
  if (dashboardType === 'employee') {
    return <EmployeeDashboard />;
  }

  return (
    <div style={styles.dashboard}>
      {/* Tutorial Modal */}
      {showTutorial && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.7)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ background: '#18181b', color: '#fff', padding: 40, borderRadius: 8, minWidth: 340, maxWidth: 400, textAlign: 'center', boxShadow: '0 8px 32px #000' }}>
            <div style={{ marginBottom: 24, fontWeight: 'bold', fontSize: 18 }}>Tutorial</div>
            <div style={{ marginBottom: 24 }}>{agent.getTutorialSteps()[tutorialStep]}</div>
            <div>
              <button
                style={{ marginRight: 12, padding: '8px 18px', background: '#991b1b', color: '#fff', border: 'none', fontWeight: 'bold', cursor: 'pointer' }}
                onClick={() => {
                  if (tutorialStep < agent.getTutorialSteps().length - 1) setTutorialStep(tutorialStep + 1);
                  else setShowTutorial(false);
                }}
              >{tutorialStep < agent.getTutorialSteps().length - 1 ? 'Next' : 'Finish'}</button>
              {tutorialStep > 0 && (
                <button
                  style={{ padding: '8px 18px', background: '#333', color: '#fff', border: 'none', fontWeight: 'bold', cursor: 'pointer' }}
                  onClick={() => setTutorialStep(tutorialStep - 1)}
                >Back</button>
              )}
            </div>
          </div>
        </div>
      )}
      <nav style={styles.nav}>
        <div style={styles.logoText}>SMARTSHIFT <span style={{color: '#991b1b'}}>PRO</span></div>
        <div style={styles.tabContainer}>
          {tabs.map((tab) => (
            <div 
              key={tab.id} 
              onClick={() => setActiveTab(tab.id)}
              style={{
                ...styles.tabItem,
                color: activeTab === tab.id ? '#991b1b' : '#4b5563',
                borderBottom: activeTab === tab.id ? '3px solid #991b1b' : '3px solid transparent'
              }}
            >
              {tab.label}
            </div>
          ))}
        </div>
        <button onClick={() => setView('landing')} style={styles.logoutBtn}>EXIT</button>
      </nav>

      <div style={styles.carouselViewport}>
        <div style={{
          ...styles.carouselSlider,
          transform: `translateX(-${activeTab * 100}vw)` 
        }}>
          {/* TAB 0: STAFF */}
          <div style={styles.carouselPage}>
             <div style={styles.glassPanel}>
                <div style={styles.panelLabel}>Staff Portal</div>
                <div style={styles.bigStat}>08:00 <span style={styles.statSub}>READY</span></div>
             </div>
          </div>

          {/* TAB 1: ADMIN */}
          <div style={styles.carouselPage}>
             <div style={styles.adminGrid}>
                <div style={styles.glassPanel}>
                  <div style={styles.panelLabel}>Active Workforce</div>
                  <div style={styles.bigStat}>12 <span style={styles.statSub}>UNITS</span></div>
                </div>
                <div style={styles.glassPanel}>
                  <div style={styles.panelLabel}>Operations</div>
                  <div style={styles.actionGrid}>
                    <div style={styles.iconAction}>Personnel</div>
                    <div style={styles.iconAction}>Scheduling</div>
                  </div>
                </div>
             </div>
          </div>

          {/* TAB 2: SYSTEM */}
          <div style={styles.carouselPage}>
            <div style={styles.glassPanel}>
              <div style={styles.panelLabel}>AI Agent Console</div>
              <div style={{ marginBottom: 16 }}>
                <select value={aiMode} onChange={e => setAiMode(e.target.value)} style={{ marginRight: 8 }}>
                  <option value="question">Q&A</option>
                  <option value="schedule">Auto-Schedule</option>
                  <option value="optimize">Optimize Allocation</option>
                </select>
                <input
                  type="text"
                  placeholder={aiMode === 'question' ? 'Ask a question...' : aiMode === 'schedule' ? 'Enter shift/staff data' : 'Enter allocation data'}
                  value={aiInput}
                  onChange={e => setAiInput(e.target.value)}
                  style={{ width: 220, marginRight: 8 }}
                />
                <button
                  style={{ background: '#991b1b', color: '#fff', border: 'none', padding: '8px 16px', fontWeight: 'bold', cursor: 'pointer' }}
                  onClick={() => {
                    let result;
                    if (aiMode === 'question') {
                      result = agent.answerQuestion(aiInput);
                      setAiOutput(result);
                    } else if (aiMode === 'schedule') {
                      let data;
                      try { data = JSON.parse(aiInput); } catch { data = {}; }
                      result = agent.autoSchedule(data.shifts || [], data.staff || [], data.constraints || {});
                      setAiOutput(JSON.stringify(result));
                    } else if (aiMode === 'optimize') {
                      let data;
                      try { data = JSON.parse(aiInput); } catch { data = {}; }
                      result = agent.optimizeAllocation(data.staff || [], data.shifts || [], data.preferences || {});
                      setAiOutput(JSON.stringify(result));
                    }
                  }}
                >RUN</button>
                <button
                  style={{ background: '#333', color: '#fff', border: 'none', padding: '8px 16px', fontWeight: 'bold', marginLeft: 8, cursor: 'pointer' }}
                  onClick={() => setAiOutput(agent.generateFeatureVideo())}
                >Generate Feature Video</button>
                <button
                  style={{ background: '#222', color: '#fff', border: 'none', padding: '8px 16px', fontWeight: 'bold', marginLeft: 8, cursor: 'pointer' }}
                  onClick={() => { setShowTutorial(true); setTutorialStep(0); }}
                >Show Tutorial</button>
              </div>
              <div style={{ background: '#18181b', color: '#fff', padding: 12, minHeight: 40, border: '1px solid #333', fontSize: 13 }}>
                {aiOutput || 'AI output will appear here.'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  landingPage: { height: '100vh', background: 'radial-gradient(circle, #1a1a1a 0%, #000 100%)', display: 'flex', justifyContent: 'center', alignItems: 'center' },
  glassSign: { background: 'rgba(20, 20, 20, 0.8)', padding: '60px', textAlign: 'center', width: '380px', border: '1px solid #333', boxShadow: '0 50px 100px rgba(0,0,0,0.9)' },
  accentBar: { width: '50px', height: '3px', background: '#991b1b', margin: '0 auto 30px' },
  mainTitle: { color: '#fff', letterSpacing: '10px', fontSize: '26px', fontWeight: '900' },
  auroraInput: { background: 'transparent', border: 'none', borderBottom: '2px solid #333', color: '#991b1b', fontSize: '32px', textAlign: 'center', width: '100%', marginBottom: '40px', outline: 'none' },
  auroraButton: { background: '#991b1b', color: '#fff', width: '100%', padding: '18px', border: 'none', fontWeight: '900', cursor: 'pointer' },
  dashboard: { height: '100vh', background: '#050505', color: '#fff', overflow: 'hidden', display: 'flex', flexDirection: 'column' },
  nav: { height: '90px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 60px', background: '#000', borderBottom: '1px solid #1a1a1a' },
  tabContainer: { display: 'flex', gap: '50px', height: '100%' },
  tabItem: { display: 'flex', alignItems: 'center', cursor: 'pointer', fontSize: '11px', fontWeight: '900', letterSpacing: '2px', transition: '0.4s' },
  carouselViewport: { flex: 1, width: '100vw', overflow: 'hidden' },
  carouselSlider: { display: 'flex', width: '300vw', height: '100%', transition: 'transform 0.8s cubic-bezier(0.19, 1, 0.22, 1)' },
  carouselPage: { width: '100vw', height: '100%', padding: '60px', boxSizing: 'border-box' },
  adminGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', maxWidth: '1200px' },
  glassPanel: { background: '#0a0a0a', border: '1px solid #1a1a1a', padding: '40px', boxShadow: '10px 10px 30px rgba(0,0,0,0.5)' },
  panelLabel: { color: '#4b5563', fontSize: '10px', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '20px' },
  bigStat: { fontSize: '50px', fontWeight: '900', color: '#fff' },
  statSub: { fontSize: '14px', color: '#991b1b' },
  actionGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' },
  iconAction: { background: '#0f0f0f', padding: '20px', textAlign: 'center', fontSize: '10px', border: '1px solid #1a1a1a' },
  logoutBtn: { background: 'none', border: '1px solid #333', color: '#4b5563', padding: '8px 20px', cursor: 'pointer' },
  logoText: { fontWeight: '900', letterSpacing: '4px', fontSize: '20px' }
};

export default App;