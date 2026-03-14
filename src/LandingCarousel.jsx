
// src/LandingCarousel.jsx
// Reference image: 69a7c900470b5eb327bd6bd8_image-4.webp (not used as background)
// New design: 3 separate glass cards (center: demo/pricing/signup, left: employee sign in, right: admin sign in)

import React, { useState } from 'react';

const LandingCarousel = ({ onEmployeeLogin, onAdminLogin, onSignUp }) => {
  const [focus, setFocus] = useState('main'); // 'main', 'employee', 'admin'

  return (
    <div style={styles.landingRoot}>
      <div style={styles.branding}>
        <div style={styles.brandTitle}>Smart-Shift-Scheduling</div>
        <div style={styles.slogan}>"Empowering Teams. Simplifying Shifts."</div>
      </div>
      <div style={styles.cardsRow}>
        {/* Employee Sign In Card */}
        <div
          style={{
            ...styles.glassCard,
            ...styles.sideCard,
            ...(focus === 'employee' ? styles.focusCard : {}),
            zIndex: focus === 'employee' ? 2 : 1,
          }}
          onClick={() => setFocus('employee')}
        >
          <h2 style={styles.title}>Employee Sign In</h2>
          <input type="text" placeholder="Employee ID" style={styles.input} />
          <button style={styles.button} onClick={onEmployeeLogin}>Sign In</button>
        </div>
        {/* Main Card: Demo, Pricing, Sign Up */}
        <div
          style={{
            ...styles.glassCard,
            ...(focus === 'main' ? styles.focusCard : {}),
            zIndex: focus === 'main' ? 3 : 1,
          }}
          onClick={() => setFocus('main')}
        >
          <h2 style={styles.title}>What Can Smart-Shift-Scheduling Do?</h2>
          <div style={styles.demoVideoWrap}>
            <div style={styles.demoVideo}>[Demo Video Placeholder]</div>
          </div>
          <div style={styles.pricingTitle}>Pricing</div>
          <div style={styles.pricingDesc}>Simple, transparent pricing for every business size.</div>
          <button style={styles.button} onClick={onSignUp}>New Business Sign Up</button>
        </div>
        {/* Admin Sign In Card */}
        <div
          style={{
            ...styles.glassCard,
            ...styles.sideCard,
            ...(focus === 'admin' ? styles.focusCard : {}),
            zIndex: focus === 'admin' ? 2 : 1,
          }}
          onClick={() => setFocus('admin')}
        >
          <h2 style={styles.title}>Admin Sign In</h2>
          <input type="password" placeholder="Admin Code" style={styles.input} />
          <button style={styles.button} onClick={onAdminLogin}>Admin Login</button>
        </div>
      </div>
    </div>
  );
};

export default LandingCarousel;

const styles = {
  landingRoot: {
    width: '100vw',
    height: '100vh',
    overflow: 'hidden',
    position: 'relative',
    background: 'linear-gradient(135deg, #18181b 0%, #23232b 60%, #991b1b 100%)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
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
  cardsRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 36,
    width: '100%',
    maxWidth: 1400,
    margin: '0 auto',
  },
  glassPanel: {
  background: 'linear-gradient(145deg,#0a0a0a,#050505)',
  border: '1px solid rgba(255,255,255,0.05)',
  padding: '40px',
  borderRadius: '14px',
  backdropFilter: 'blur(10px)',
  boxShadow: `
  0 0 40px rgba(153,27,27,0.15),
  inset 0 0 10px rgba(255,255,255,0.03)
  `
},

  sideCard: {
    opacity: 0.85,
    transform: 'scale(0.92)',
    filter: 'blur(0.5px)',
  },
  focusCard: {
    opacity: 1,
    transform: 'scale(1.06)',
    filter: 'none',
    boxShadow: '0 24px 80px 0 #991b1b99, 0 8px 32px 0 #fff1',
    zIndex: 3,
  },
  title: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 900,
    marginBottom: 18,
    letterSpacing: 2,
    textShadow: '0 2px 16px #991b1b88, 0 0px 2px #fff2',
    fontFamily: 'Montserrat, sans-serif',
    textTransform: 'uppercase',
  },
  demoVideoWrap: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    marginBottom: 18,
  },
  demoVideo: {
    width: 260,
    height: 146,
    background: 'linear-gradient(120deg, #991b1b 0%, #23232b 100%)',
    borderRadius: 18,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
    fontWeight: 700,
    fontSize: 18,
    boxShadow: '0 2px 12px #991b1b44',
    marginBottom: 8,
  },
  pricingTitle: {
    color: '#fff',
    fontWeight: 800,
    fontSize: 20,
    marginTop: 12,
    marginBottom: 4,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  pricingDesc: {
    color: '#e5e5e5',
    fontSize: 16,
    marginBottom: 18,
    textAlign: 'center',
    fontWeight: 500,
    letterSpacing: 1,
    textShadow: '0 1px 8px #000',
  },
  input: {
    fontSize: 18,
    padding: '12px 20px',
    marginBottom: 24,
    border: '2px solid #991b1b',
    borderRadius: 8,
    background: 'rgba(40, 40, 60, 0.85)',
    color: '#fff',
    width: 220,
    fontWeight: 700,
    outline: 'none',
    boxShadow: '0 2px 12px #991b1b44, 0 1px 8px #000',
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
    marginBottom: 8,
    boxShadow: '0 2px 16px #991b1b44, 0 1px 8px #000',
    letterSpacing: 2,
    textTransform: 'uppercase',
    transition: 'background 0.3s, color 0.3s',
  },
};
