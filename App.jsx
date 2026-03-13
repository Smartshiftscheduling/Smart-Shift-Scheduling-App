import React, { useState } from 'react';

export default function App() {
  // Navigation & Session States
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [activeTab, setActiveTab] = useState(1);
  const [showProfileDrop, setShowProfileDrop] = useState(false);
  
  // Data States
  const [staffCount, setStaffCount] = useState(50);
  const [adminCode, setAdminCode] = useState('');
  const [userTitle, setUserTitle] = useState('Select Title');
  const [employeeID, setEmployeeID] = useState('');

  // Assets
  const bgImg = "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80";
  const profileImg = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80";

  // Pricing Logic
  const getPricing = (count) => {
    if (count <= 50) return { name: 'Starter', price: '1,200' };
    if (count <= 100) return { name: 'Growth', price: '1,500' };
    if (count <= 200) return { name: 'Scale', price: '2,000' };
    return { name: 'Enterprise', price: '3,000' };
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (isAdminMode) {
      if (adminCode === "ADMIN2026!") setIsLoggedIn(true);
      else alert("ACCESS DENIED: Use Code ADMIN2026!");
    } else {
      setIsLoggedIn(true);
    }
  };

  // --- VIEW 1: BUSINESS ONBOARDING ---
  if (isSignup) return (
    <div style={{minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center',backgroundImage:`linear-gradient(rgba(15,23,42,0.9),rgba(15,23,42,0.95)),url(${bgImg})`,backgroundSize:'cover',fontFamily:'sans-serif',color:'white'}}>
      <div style={{width:'550px',padding:'40px',backgroundColor:'rgba(255,255,255,0.05)',backdropFilter:'blur(25px)',borderRadius:'30px',border:'1px solid rgba(255,255,255,0.1)',textAlign:'center'}}>
        <h2 style={{color:'#f59e0b',fontSize:'10px',letterSpacing:'3px', marginBottom:'10px'}}>SMARTSHIFT ONBOARDING</h2>
        <h1 style={{fontFamily:'serif', marginBottom:'25px'}}>Business Questionnaire</h1>
        
        {/* VIDEO PLACEHOLDER */}
        <div style={{width:'100%', height:'180px', backgroundColor:'#000', borderRadius:'15px', display:'flex', alignItems:'center', justifyContent:'center', marginBottom:'30px', border:'1px solid rgba(245,158,11,0.3)', cursor:'pointer'}}>
          <div style={{textAlign:'center'}}>
            <div style={{fontSize:'32px', color:'#f59e0b'}}>▶</div>
            <span style={{fontSize:'11px', opacity:0.7, letterSpacing:'1px'}}>HOW SMARTSHIFT SIMPLIFIES SCHEDULING</span>
          </div>
        </div>

        <div style={{textAlign:'left',marginBottom:'25px'}}>
          <label style={{fontSize:'11px',opacity:0.6}}>APPROXIMATE EMPLOYEE COUNT</label>
          <input type="range" min="1" max="300" value={staffCount} onChange={(e)=>setStaffCount(e.target.value)} style={{width:'100%',accentColor:'#f59e0b', marginTop:'10px'}} />
          <p style={{fontSize:'22px',fontWeight:'bold',marginTop:'10px', color:'#f59e0b'}}>{staffCount} Employees</p>
        </div>

        <div style={{padding:'25px',backgroundColor:'rgba(245,158,11,0.08)',borderRadius:'20px',border:'1px solid rgba(245,158,11,0.3)',marginBottom:'30px', textAlign:'left'}}>
          <p style={{margin:0, fontSize:'11px', opacity:0.6}}>ANNUAL SUBSCRIPTION:</p>
          <h3 style={{margin:'5px 0', fontSize:'24px', fontFamily:'serif'}}>{getPricing(staffCount).name} Tier</h3>
          <div style={{fontSize:'36px',fontWeight:'900', color:'#f59e0b'}}>${getPricing(staffCount).price} <span style={{fontSize:'14px', opacity:0.6}}>/ YEAR</span></div>
        </div>

        <div style={{display:'flex', gap:'15px'}}>
          <button onClick={()=>setIsSignup(false)} style={{flex:1, padding:'15px', background:'none', border:'1px solid rgba(255,255,255,0.2)', color:'white', borderRadius:'10px', cursor:'pointer'}}>BACK</button>
          <button onClick={()=>setIsSignup(false)} style={{flex:2, padding:'15px', backgroundColor:'#f59e0b', color:'#0f172a', border:'none', borderRadius:'10px', fontWeight:'900', cursor:'pointer'}}>PROCEED</button>
        </div>
      </div>
    </div>
  );

  // --- VIEW 2: LOGIN ---
  if (!isLoggedIn) return (
    <div style={{minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center',backgroundImage:`linear-gradient(rgba(15,23,42,0.85),rgba(15,23,42,0.95)),url(${bgImg})`,backgroundSize:'cover',fontFamily:'sans-serif'}}>
      <div style={{display:'flex',width:'800px',height:'480px',backgroundColor:'rgba(255,255,255,0.05)',backdropFilter:'blur(25px)',borderRadius:'24px',border:'1px solid rgba(255,255,255,0.1)', boxShadow:'0 25px 50px rgba(0,0,0,0.5)'}}>
        <div style={{flex:0.4,backgroundColor:'rgba(15,23,42,0.6)',color:'white',padding:'40px',display:'flex',flexDirection:'column',justifyContent:'space-between'}}>
          <div>
            <h2 style={{color:isAdminMode?'#be123c':'#f59e0b',fontSize:'10px',letterSpacing:'3px'}}>SMARTSHIFT V4.0</h2>
            <h1 style={{fontSize:'34px',fontWeight:'900',fontStyle:'italic', marginTop:'10px'}}>{isAdminMode?'Admin':'Staff'} Portal</h1>
          </div>
          <button onClick={()=>setIsSignup(true)} style={{background:'rgba(255,255,255,0.1)',border:'1px solid rgba(255,255,255,0.2)',color:'white',padding:'12px',borderRadius:'8px',fontSize:'11px',cursor:'pointer', fontWeight:'bold'}}>NEW BUSINESS SIGNUP</button>
        </div>
        <div style={{flex:0.6,padding:'45px',display:'flex',flexDirection:'column',justifyContent:'center'}}>
          <div style={{display:'flex',gap:'10px',marginBottom:'30px'}}>
             <button onClick={()=>setIsAdminMode(false)} style={{padding:'10px 20px',borderRadius:'8px',border:'1px solid #444',background:!isAdminMode?'#f59e0b':'none',color:!isAdminMode?'#0f172a':'white',cursor:'pointer', fontWeight:'bold'}}>STAFF</button>
             <button onClick={()=>setIsAdminMode(true)} style={{padding:'10px 20px',borderRadius:'8px',border:'1px solid #444',background:isAdminMode?'#be123c':'none',color:'white',cursor:'pointer', fontWeight:'bold'}}>ADMIN</button>
          </div>
          <form onSubmit={handleLogin}>
            <input 
              type={isAdminMode ? "password" : "text"} 
              style={{width:'100%',padding:'15px 0',background:'none',border:'none',borderBottom:isAdminMode?'2px solid #be123c':'2px solid #f59e0b',outline:'none',marginBottom:'25px',color:'white',fontSize:'18px'}} 
              placeholder={isAdminMode ? "Enter Admin Code" : "Employee ID"} 
              onChange={e=>isAdminMode ? setAdminCode(e.target.value) : setEmployeeID(e.target.value)}
              required 
            />
            <button type="submit" style={{width:'100%',padding:'18px',backgroundColor:isAdminMode?'#be123c':'#f59e0b',color:'white',border:'none',borderRadius:'10px',fontWeight:'900',cursor:'pointer', letterSpacing:'1px'}}>INITIALIZE ACCESS</button>
          </form>
        </div>
      </div>
    </div>
  );

  // --- VIEW 3: DASHBOARD ---
  return (
    <div style={{minHeight:'100vh',backgroundImage:`linear-gradient(rgba(15,23,42,0.96),rgba(15,23,42,0.98)),url(${bgImg})`,backgroundSize:'cover',backgroundAttachment:'fixed',fontFamily:'serif',color:'white'}}>
      {/* HEADER */}
      <nav style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'20px 60px',backgroundColor:'rgba(15,23,42,0.85)',backdropFilter:'blur(15px)',borderBottom:isAdminMode?'1px solid rgba(190,18,60,0.4)':'1px solid rgba(245,158,11,0.2)'}}>
        <div>
          <h2 style={{margin:0,fontSize:'22px',letterSpacing:'1px',textTransform:'uppercase'}}>Alexander Rivera</h2>
          <p style={{margin:0,fontSize:'12px',color:isAdminMode?'#be123c':'#f59e0b',fontWeight:'bold',fontFamily:'sans-serif',letterSpacing:'2px'}}>{isAdminMode ? userTitle.toUpperCase() : (employeeID || 'SS-88291')}</p>
        </div>
        <div style={{position:'relative'}}>
          <img src={profileImg} onClick={()=>setShowProfileDrop(!showProfileDrop)} style={{width:'50px',height:'50px',borderRadius:'12px',border:isAdminMode?'2px solid #be123c':'2px solid #f59e0b',cursor:'pointer',objectFit:'cover'}} alt="profile" />
          {showProfileDrop && (
            <div style={{position:'absolute',right:0,top:'65px',width:'220px',backgroundColor:'#1e293b',borderRadius:'12px',padding:'15px',zIndex:100,border:isAdminMode?'1px solid #be123c':'1px solid #f59e0b',fontFamily:'sans-serif'}}>
              {isAdminMode && (
                <div style={{marginBottom:'15px'}}>
                  <label style={{fontSize:'9px',opacity:0.5}}>MANDATORY TITLE</label>
                  <select value={userTitle} onChange={(e)=>setUserTitle(e.target.value)} style={{width:'100%',background:'#0f172a',color:'white',border:'1px solid #444',padding:'5px',borderRadius:'4px',marginTop:'5px',fontSize:'12px'}}>
                    <option disabled>Select Title</option>
                    <option>Supervisor</option>
                    <option>Store Manager</option>
                    <option>Shift Lead</option>
                  </select>
                </div>
              )}
              <div style={{padding:'10px 0',fontSize:'13px',cursor:'pointer',borderBottom:'1px solid #334155'}}>Profile Edit</div>
              <div style={{padding:'10px 0',fontSize:'13px',cursor:'pointer',borderBottom:'1px solid #334155'}}>Account</div>
              {isAdminMode && <div style={{padding:'10px 0',fontSize:'13px',cursor:'pointer',borderBottom:'1px solid #334155'}}>Preferences</div>}
              <div onClick={()=>{setIsLoggedIn(false); setShowProfileDrop(false)}} style={{padding:'10px 0',fontSize:'13px',cursor:'pointer',color:'#f87171'}}>Logout</div>
            </div>
          )}
        </div>
      </nav>

      {/* DASHBOARD CONTENT */}
      <main style={{padding:'40px 60px'}}>
        <div style={{display:'flex',gap:'40px',marginBottom:'30px'}}>
          {(isAdminMode ? ['Employee Roster','Shifts','Messages'] : ['Monthly Calendar','Overtime','Swap Notes']).map((t,i)=>(
            <button key={i} onClick={()=>setActiveTab(i+1)} style={{background:'none',border:'none',color:activeTab===i+1?(isAdminMode?'#be123c':'#f59e0b'):'rgba(255,255,255,0.3)',fontSize:'14px',fontWeight:'bold',cursor:'pointer',paddingBottom:'10px',borderBottom:activeTab===i+1?`2px solid ${isAdminMode?'#be123c':'#f59e0b'}`:'none',fontFamily:'sans-serif',letterSpacing:'1px'}}>{t.toUpperCase()}</button>
          ))}
        </div>
        <div style={{backgroundColor:'rgba(255,255,255,0.02)',backdropFilter:'blur(10px)',borderRadius:'24px',padding:'40px',border:'1px solid rgba(255,255,255,0.05)',minHeight:'500px'}}>
           {/* Calendar Tab Example */}
           {activeTab === 1 && !isAdminMode && (
              <div style={{display:'grid', gridTemplateColumns:'repeat(7, 1fr)', gap:'10px'}}>
                {[...Array(31)].map((_,d)=>(
                  <div key={d} style={{height:'100px', border:'1px solid rgba(255,255,255,0.05)', borderRadius:'10px', padding:'10px', fontSize:'12px', opacity:0.5}}>
                    {d+1}
                  </div>
                ))}
              </div>
           )}
           {/* Admin Roster Example */}
           {activeTab === 1 && isAdminMode && (
              <div>
                <h3 style={{fontFamily:'serif', fontSize:'24px'}}>Workforce Overview</h3>
                <p style={{opacity:0.6}}>All employees currently assigned to this location.</p>
              </div>
           )}
        </div>
      </main>
    </div>
  );
}