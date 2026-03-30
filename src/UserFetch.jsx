import React, { useEffect, useState } from "react";

function UserFetch() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Optimized Fetch: keeps the search state intact
  const fetchUsers = async (isManualRefresh = false) => {
    if (isManualRefresh) setIsRefreshing(true);
    else setLoading(true);
    
    setError("");

    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/users");
      if (!response.ok) throw new Error("Failed to sync directory");
      const data = await response.json();
      setUsers(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Filter logic remains reactive to the 'search' state
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  // New Refresh Logic: Does NOT call setSearch("")
  const handleRefresh = () => {
    fetchUsers(true); 
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.container}>
        <div style={styles.header}>
          <h1 style={styles.title}>Personnel Directory</h1>
          <p style={styles.subtitle}>Management Interface v2.4</p>
        </div>

        <div style={styles.controlPanel}>
          <div style={styles.searchWrapper}>
            <input
              type="text"
              placeholder="Filter by name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={styles.input}
            />
            {search && (
              <button onClick={() => setSearch("")} style={styles.clearBadge}>
                ✕
              </button>
            )}
          </div>

          <button 
            onClick={handleRefresh} 
            style={{
              ...styles.refreshBtn,
              opacity: isRefreshing ? 0.7 : 1,
              transform: isRefreshing ? "scale(0.95)" : "scale(1)"
            }}
            disabled={isRefreshing}
          >
            {isRefreshing ? "⏳ Syncing..." : "🔄 Refresh Data"}
          </button>
        </div>

        <div style={styles.metaInfo}>
          <span>Showing <b>{filteredUsers.length}</b> results</span>
          {search && <span> for "<i>{search}</i>"</span>}
        </div>

        {loading ? (
          <div style={styles.loader}>Initial Loading...</div>
        ) : (
          <div style={styles.grid}>
            {filteredUsers.map((user) => (
              <div key={user.id} style={styles.card}>
                <div style={styles.cardHeader}>
                  <div style={styles.avatar}>{user.name[0]}</div>
                  <div>
                    <div style={styles.name}>{user.name}</div>
                    <div style={styles.username}>@{user.username}</div>
                  </div>
                </div>
                <div style={styles.divider} />
                <div style={styles.details}>
                  <p><b>Email:</b> {user.email}</p>
                  <p><b>Company:</b> {user.company.name}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// Updated Modern Styles
const styles = {
  wrapper: {
    minHeight: "100vh",
    backgroundColor: "#f4f7fe",
    padding: "40px 20px",
    fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
  },
  container: {
    maxWidth: "1100px",
    margin: "0 auto",
  },
  header: {
    marginBottom: "30px",
  },
  title: {
    fontSize: "32px",
    fontWeight: "800",
    color: "#1b2559",
    margin: 0,
  },
  subtitle: {
    color: "#a3aed0",
    fontSize: "16px",
    marginTop: "5px",
  },
  controlPanel: {
    display: "flex",
    gap: "15px",
    marginBottom: "20px",
    alignItems: "center",
  },
  searchWrapper: {
    position: "relative",
    flex: 1,
  },
  input: {
    width: "100%",
    padding: "15px 20px",
    borderRadius: "15px",
    border: "none",
    backgroundColor: "#fff",
    boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.05)",
    fontSize: "16px",
    outline: "none",
    color: "#1b2559",
  },
  clearBadge: {
    position: "absolute",
    right: "15px",
    top: "50%",
    transform: "translateY(-50%)",
    border: "none",
    background: "#f4f7fe",
    borderRadius: "50%",
    width: "25px",
    height: "25px",
    cursor: "pointer",
    fontSize: "12px",
    color: "#a3aed0",
  },
  refreshBtn: {
    padding: "15px 25px",
    borderRadius: "15px",
    border: "none",
    backgroundColor: "#4318FF",
    color: "#fff",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "0.2s all ease",
    boxShadow: "0px 10px 20px rgba(67, 24, 255, 0.2)",
  },
  metaInfo: {
    marginBottom: "25px",
    color: "#707eae",
    fontSize: "14px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
    gap: "20px",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: "20px",
    padding: "20px",
    boxShadow: "0px 18px 40px rgba(112, 144, 176, 0.12)",
    border: "1px solid transparent",
    transition: "border 0.3s ease",
  },
  cardHeader: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
  },
  avatar: {
    width: "50px",
    height: "50px",
    borderRadius: "12px",
    backgroundColor: "#F4F7FE",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#4318FF",
    fontWeight: "800",
    fontSize: "20px",
  },
  name: {
    fontSize: "18px",
    fontWeight: "bold",
    color: "#1b2559",
  },
  username: {
    color: "#a3aed0",
    fontSize: "14px",
  },
  divider: {
    height: "1px",
    backgroundColor: "#f4f7fe",
    margin: "15px 0",
  },
  details: {
    fontSize: "14px",
    color: "#707eae",
    lineHeight: "1.8",
  },
  loader: {
    textAlign: "center",
    padding: "100px",
    color: "#a3aed0",
    fontSize: "18px",
  }
};

export default UserFetch;