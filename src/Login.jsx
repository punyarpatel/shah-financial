import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

function App() {
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  
  // NEW STATE: For dynamic status updates
  const [statusText, setStatusText] = useState("Initializing...");
  const [sessionTime, setSessionTime] = useState(0);

  // Handle Login with dynamic status updates
  const handleLogin = (e) => {
    if (e) e.preventDefault();
    setErrorMessage("");

    if (loginId.trim().length < 3) {
      setErrorMessage("Input is too short (min 3 chars)");
      return;
    }

    setIsLoading(true);
    
    // Simulate a sequence of status updates
    setStatusText("Connecting to Secure Server...");
    
    setTimeout(() => setStatusText("Encrypting Handshake..."), 600);
    setTimeout(() => setStatusText("Finalizing Authorization..."), 1200);

    setTimeout(() => {
      setIsLoading(false);
      setIsLoggedIn(true);
      setStatusText("Authorization Active");
      setSessionTime(0); // Reset timer
    }, 1800);
  };

  // Timer Effect: Increases session time every second when logged in
  useEffect(() => {
    let interval;
    if (isLoggedIn) {
      interval = setInterval(() => {
        setSessionTime((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isLoggedIn]);

  const handleLogout = () => {
    setIsLoggedIn(false);
    setLoginId("");
    setPassword("");
    setStatusText("Initializing...");
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } }
  };

  return (
    <div style={styles.appContainer}>
      <AnimatePresence mode="wait">
        {!isLoggedIn ? (
          <motion.div key="login" variants={cardVariants} initial="hidden" animate="visible" exit="exit" style={styles.glassCard}>
            <form onSubmit={handleLogin}>
              <header style={styles.header}>
                <h1 style={styles.brandTitle}>Login / Signup</h1>
              </header>

              {errorMessage && <p style={styles.errorText}>{errorMessage}</p>}

              <div style={styles.inputGroup}>
                <label style={styles.label}>Login ID</label>
                <input type="text" value={loginId} onChange={(e) => setLoginId(e.target.value)} style={styles.input} placeholder="Enter your ID" required />
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>Password</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} style={styles.input} placeholder="••••••••" required />
              </div>

              <motion.button
                type="submit"
                disabled={isLoading}
                whileHover={isLoading ? {} : { scale: 1.02, backgroundColor: "#a855f7" }}
                whileTap={isLoading ? {} : { scale: 0.98 }}
                style={styles.loginButton}
              >
                {isLoading ? (
                   <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                     <div style={styles.loaderSpinner}></div>
                     <span style={{fontSize: '12px', fontWeight: '400'}}>{statusText}</span>
                   </div>
                ) : "Login"}
              </motion.button>

              
            </form>
          </motion.div>
        ) : (
          <motion.div key="success" variants={cardVariants} initial="hidden" animate="visible" exit="exit" style={styles.glassCard}>
            <div style={styles.successState}>
              <div style={styles.avatarGradient}>{loginId.charAt(0).toUpperCase()}</div>
              <h2 style={styles.cardTitle}>Login Successful</h2>
              <p style={styles.cardSubtitle}>User ID: <span style={{color: '#a855f7'}}>{loginId}</span></p>
              
              {/* UPDATED STATUS BADGE */}
              <div style={styles.statusBadge}>
                <span className="pulse-dot" style={styles.statusDot}></span>
                <div style={{textAlign: 'left'}}>
                    <div style={{fontWeight: '700', fontSize: '11px', textTransform: 'uppercase'}}>{statusText}</div>
                    <div style={{fontSize: '10px', opacity: 0.8}}>Session: {sessionTime}s</div>
                </div>
              </div>

              <motion.button 
                onClick={handleLogout} 
                whileHover={{ scale: 1.05, background: "#ef4444", color: "white" }}
                style={styles.logoutButton}
              >
                End Session
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const styles = {
  appContainer: {
    fontFamily: "'Inter', sans-serif",
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#0f172a",
    backgroundImage: `radial-gradient(at 0% 0%, #1e1b4b 0, transparent 50%), radial-gradient(at 100% 100%, #312e81 0, transparent 50%)`,
  },
  glassCard: {
    background: "rgba(255, 255, 255, 0.03)",
    backdropFilter: "blur(20px)",
    borderRadius: "24px",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    padding: "40px",
    width: "100%",
    maxWidth: "380px",
    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
    color: "white",
  },
  header: { textAlign: "center", marginBottom: "30px" },
  brandTitle: { fontSize: "32px", fontWeight: "800", margin: 0, color: "white" },
  brandSubtitle: { fontSize: "14px", color: "#94a3b8", marginTop: "4px" },
  errorText: { color: "#f87171", fontSize: "12px", textAlign: "center", marginBottom: "15px" },
  inputGroup: { marginBottom: "18px" },
  label: { display: "block", fontSize: "12px", color: "#cbd5e1", marginBottom: "6px" },
  input: {
    width: "100%",
    padding: "12px",
    borderRadius: "10px",
    background: "rgba(255, 255, 255, 0.05)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    color: "white",
    fontSize: "15px",
    outline: "none",
    boxSizing: "border-box"
  },
  loginButton: {
    width: "100%",
    padding: "14px",
    background: "linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%)",
    color: "white",
    border: "none",
    borderRadius: "10px",
    fontWeight: "600",
    cursor: "pointer",
    marginTop: "10px"
  },
  linksRow: { display: "flex", justifyContent: "space-between", marginTop: "20px", fontSize: "11px", color: "#64748b" },
  successState: { textAlign: "center" },
  avatarGradient: {
    width: "60px", height: "60px", background: "linear-gradient(135deg, #a855f7 0%, #ec4899 100%)",
    color: "white", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: "24px", fontWeight: "bold", margin: "0 auto 15px"
  },
  cardTitle: { fontSize: "20px", fontWeight: "700", margin: "0 0 5px" },
  cardSubtitle: { fontSize: "14px", color: "#94a3b8", marginBottom: "25px" },
  statusBadge: {
    display: "inline-flex",
    alignItems: "center",
    gap: "12px",
    backgroundColor: "rgba(34, 197, 94, 0.05)",
    border: "1px solid rgba(34, 197, 94, 0.1)",
    color: "#4ade80",
    padding: "10px 16px",
    borderRadius: "12px",
    marginBottom: "30px",
  },
  statusDot: { width: "8px", height: "8px", background: "#22c55e", borderRadius: "50%" },
  logoutButton: { width: "100%", padding: "10px", background: "rgba(255,255,255,0.05)", color: "#94a3b8", border: "none", borderRadius: "8px", cursor: "pointer" },
  loaderSpinner: { width: "16px", height: "16px", border: "2px solid rgba(255,255,255,0.3)", borderRadius: "50%", borderTopColor: "white", animation: "spin 0.8s linear infinite" }
};

if (typeof document !== 'undefined') {
  const styleTag = document.createElement('style');
  styleTag.textContent = `
    @keyframes spin { to { transform: rotate(360deg); } }
    @keyframes pulse { 0% { box-shadow: 0 0 0 0px rgba(34, 197, 94, 0.4); } 70% { box-shadow: 0 0 0 10px rgba(34, 197, 94, 0); } 100% { box-shadow: 0 0 0 0px rgba(34, 197, 94, 0); } }
    .pulse-dot { animation: pulse 2s infinite; }
    input:focus { border-color: #a855f7 !important; background: rgba(255, 255, 255, 0.08) !important; }
  `;
  document.head.appendChild(styleTag);
}

export default App;