import React, { useState } from "react";

function App() {
  const [username, setUsername] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    if (username.trim() === "") {
      alert("Please enter username");
      return;
    }
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername("");
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Web Technology Lab - Exp 8</h1>

      {!isLoggedIn ? (
        <div style={styles.card}>
          <h2>Sign In</h2>

          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={styles.input}
            placeholder="Enter your name"
          />

          <button onClick={handleLogin} style={styles.button}>
            Log In
          </button>
        </div>
      ) : (
        <div style={styles.card}>
          <h2>
            Hello there, {username}! 👋
          </h2>
          <p>You have successfully logged in.</p>

          <button onClick={handleLogout} style={styles.logout}>
            Log Out
          </button>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    textAlign: "center",
    minHeight: "100vh",
    background: "linear-gradient(to right, #141e30, #243b55)",
    color: "white",
    paddingTop: "50px",
  },
  header: {
    marginBottom: "40px",
    fontSize: "32px",
  },
  card: {
    background: "white",
    color: "black",
    padding: "30px",
    borderRadius: "12px",
    width: "320px",
    margin: "auto",
    boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
  },
  input: {
    width: "100%",
    padding: "10px",
    margin: "15px 0",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },
  button: {
    width: "100%",
    padding: "10px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "16px",
  },
  logout: {
    marginTop: "15px",
    padding: "10px",
    backgroundColor: "#f44336",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
};

export default App;