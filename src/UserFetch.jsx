import React, { useEffect, useState } from "react";

// Modernized CSS-in-JS (Optimized for performance and readability)
const styles = {
  wrapper: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
    padding: "40px 20px",
    fontFamily: "'Inter', -apple-system, sans-serif",
    color: "#f8fafc",
  },
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
  },
  header: {
    textAlign: "center",
    marginBottom: "50px",
  },
  title: {
    fontSize: "clamp(2rem, 5vw, 3.5rem)",
    fontWeight: "800",
    background: "linear-gradient(to right, #38bdf8, #818cf8)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    marginBottom: "10px",
  },
  searchSection: {
    position: "sticky",
    top: "20px",
    zIndex: 100,
    background: "rgba(30, 41, 59, 0.7)",
    backdropFilter: "blur(12px)",
    padding: "20px",
    borderRadius: "24px",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    display: "flex",
    gap: "12px",
    flexWrap: "wrap",
    justifyContent: "center",
    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.3)",
    marginBottom: "40px",
  },
  input: {
    flex: "1",
    minWidth: "260px",
    padding: "12px 20px",
    borderRadius: "12px",
    border: "1px solid #334155",
    background: "#0f172a",
    color: "#fff",
    fontSize: "16px",
    outline: "none",
    transition: "border-color 0.2s",
  },
  btn: {
    padding: "12px 24px",
    borderRadius: "12px",
    border: "none",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.2s ease",
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: "24px",
  },
  card: {
    background: "rgba(255, 255, 255, 0.03)",
    border: "1px solid rgba(255, 255, 255, 0.08)",
    borderRadius: "24px",
    padding: "24px",
    transition: "transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), background 0.3s",
    cursor: "pointer",
    position: "relative",
    overflow: "hidden",
  },
  avatar: {
    width: "50px",
    height: "50px",
    borderRadius: "14px",
    background: "linear-gradient(135deg, #38bdf8, #2563eb)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
    fontSize: "18px",
    marginBottom: "20px",
  },
  badge: {
    fontSize: "12px",
    padding: "4px 10px",
    borderRadius: "20px",
    background: "rgba(56, 189, 248, 0.1)",
    color: "#38bdf8",
    fontWeight: "600",
  }
};

function UserFetch() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchUsers = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/users");
      if (!response.ok) throw new Error("Server communication failed");
      const data = await response.json();
      setUsers(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filteredUsers = users.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={styles.wrapper}>
      <div style={styles.container}>
        <header style={styles.header}>
          <h1 style={styles.title}>Network Intelligence</h1>
          <p style={{ color: "#94a3b8" }}>Real-time directory of verified personnel</p>
        </header>

        <div style={styles.searchSection}>
          <input
            style={styles.input}
            placeholder="Search by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onFocus={(e) => (e.target.style.borderColor = "#38bdf8")}
            onBlur={(e) => (e.target.style.borderColor = "#334155")}
          />
          <button 
            style={{ ...styles.btn, background: "#334155", color: "#fff" }}
            onClick={() => setSearch("")}
          >
            Clear
          </button>
          <button 
            style={{ ...styles.btn, background: "#38bdf8", color: "#0f172a" }}
            onClick={fetchUsers}
          >
            Refresh Data
          </button>
        </div>

        {loading ? (
          <div style={{ textAlign: "center", padding: "50px" }}>
            <div className="spinner"></div> {/* Add CSS spinner if desired */}
            <p>Syncing Database...</p>
          </div>
        ) : error ? (
          <div style={{ textAlign: "center", color: "#f87171" }}>{error}</div>
        ) : (
          <div style={styles.grid}>
            {filteredUsers.map((user) => (
              <div
                key={user.id}
                style={styles.card}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.03)";
                  e.currentTarget.style.background = "rgba(255, 255, 255, 0.07)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.background = "rgba(255, 255, 255, 0.03)";
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={styles.avatar}>
                    {user.name.split(" ").map(n => n[0]).join("")}
                  </div>
                  <span style={styles.badge}>ID: {user.id}</span>
                </div>

                <h3 style={{ fontSize: "20px", margin: "0 0 8px 0" }}>{user.name}</h3>
                <p style={{ color: "#94a3b8", fontSize: "14px", marginBottom: "16px" }}>
                   @{user.username}
                </p>

                <div style={{ fontSize: "14px", display: "grid", gap: "8px" }}>
                  <div style={{ display: "flex", gap: "10px" }}>
                    <span style={{ color: "#38bdf8" }}>✉️</span> {user.email}
                  </div>
                  <div style={{ display: "flex", gap: "10px" }}>
                    <span style={{ color: "#38bdf8" }}>🏢</span> {user.company.name}
                  </div>
                  <div style={{ display: "flex", gap: "10px" }}>
                    <span style={{ color: "#38bdf8" }}>📍</span> {user.address.city}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default UserFetch;