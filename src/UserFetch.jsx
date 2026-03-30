import React, { useEffect, useState } from "react";

function UserFetch() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const fetchUsers = async (isManualRefresh = false) => {
    if (isManualRefresh) setIsRefreshing(true);
    else setLoading(true);

    setError("");

    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/users");
      if (!response.ok) throw new Error("Failed to fetch users");
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

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleRefresh = () => {
    fetchUsers(true);
  };

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.overlay}>
        <div style={styles.container}>
          <div style={styles.header}>
            <h1 style={styles.title}>👥 User Directory</h1>
            <p style={styles.subtitle}>Search, explore and manage users easily</p>
          </div>

          <div style={styles.controlPanel}>
            <div style={styles.searchWrapper}>
              <input
                type="text"
                placeholder="🔍 Search by name..."
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
                opacity: isRefreshing ? 0.8 : 1,
                transform: isRefreshing ? "scale(0.97)" : "scale(1)",
              }}
              disabled={isRefreshing}
            >
              {isRefreshing ? "⏳ Refreshing..." : "🔄 Reload"}
            </button>
          </div>

          <div style={styles.metaInfo}>
            <span>
              Showing <b>{filteredUsers.length}</b> users
            </span>
            {search && (
              <span>
                {" "}
                for "<i>{search}</i>"
              </span>
            )}
          </div>

          {loading ? (
            <div style={styles.loader}>⏳ Loading users...</div>
          ) : error ? (
            <div style={styles.error}>❌ {error}</div>
          ) : filteredUsers.length === 0 ? (
            <div style={styles.noResult}>😕 No users found</div>
          ) : (
            <div style={styles.grid}>
              {filteredUsers.map((user) => (
                <div
                  key={user.id}
                  style={styles.card}
                  onClick={() => setSelectedUser(user)}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform =
                      "translateY(-8px) scale(1.02)";
                    e.currentTarget.style.boxShadow =
                      "0 20px 45px rgba(0,0,0,0.18)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform =
                      "translateY(0px) scale(1)";
                    e.currentTarget.style.boxShadow =
                      "0 12px 30px rgba(0,0,0,0.12)";
                  }}
                >
                  <div style={styles.cardHeader}>
                    <div style={styles.avatar}>{getInitials(user.name)}</div>
                    <div>
                      <div style={styles.name}>{user.name}</div>
                      <div style={styles.username}>@{user.username}</div>
                    </div>
                  </div>

                  <div style={styles.divider} />

                  <div style={styles.details}>
                    <p><b>📧 Email:</b> {user.email}</p>
                    <p><b>🏢 Company:</b> {user.company.name}</p>
                    <p><b>🌐 Website:</b> {user.website}</p>
                    <p><b>📍 City:</b> {user.address.city}</p>
                    <p><b>📞 Phone:</b> {user.phone}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {selectedUser && (
        <div style={styles.modalOverlay} onClick={() => setSelectedUser(null)}>
          <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalAvatar}>
              {getInitials(selectedUser.name)}
            </div>
            <h2 style={styles.modalName}>{selectedUser.name}</h2>
            <p style={styles.modalText}><b>Username:</b> @{selectedUser.username}</p>
            <p style={styles.modalText}><b>Email:</b> {selectedUser.email}</p>
            <p style={styles.modalText}><b>Phone:</b> {selectedUser.phone}</p>
            <p style={styles.modalText}><b>Website:</b> {selectedUser.website}</p>
            <p style={styles.modalText}><b>Company:</b> {selectedUser.company.name}</p>
            <p style={styles.modalText}>
              <b>Address:</b> {selectedUser.address.street}, {selectedUser.address.city}
            </p>

            <button style={styles.closeBtn} onClick={() => setSelectedUser(null)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  wrapper: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #667eea, #764ba2, #6a11cb)",
    padding: "30px 20px",
    fontFamily: "'Poppins', sans-serif",
  },
  overlay: {
    background: "rgba(255,255,255,0.10)",
    backdropFilter: "blur(14px)",
    borderRadius: "24px",
    padding: "30px",
    minHeight: "95vh",
    boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
  },
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
  },
  header: {
    textAlign: "center",
    marginBottom: "30px",
  },
  title: {
    fontSize: "48px",
    fontWeight: "800",
    color: "#fff",
    marginBottom: "10px",
  },
  subtitle: {
    color: "#f0f0f0",
    fontSize: "18px",
  },
  controlPanel: {
    display: "flex",
    gap: "15px",
    marginBottom: "20px",
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  searchWrapper: {
    position: "relative",
    width: "350px",
    maxWidth: "100%",
  },
  input: {
    width: "100%",
    padding: "15px 20px",
    borderRadius: "16px",
    border: "none",
    background: "rgba(255,255,255,0.95)",
    boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.10)",
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
    background: "#ececff",
    borderRadius: "50%",
    width: "28px",
    height: "28px",
    cursor: "pointer",
    fontSize: "14px",
    color: "#666",
    fontWeight: "bold",
  },
  refreshBtn: {
    padding: "15px 24px",
    borderRadius: "16px",
    border: "none",
    background: "linear-gradient(135deg, #00c6ff, #0072ff)",
    color: "#fff",
    fontWeight: "700",
    cursor: "pointer",
    transition: "0.25s ease",
    boxShadow: "0px 10px 20px rgba(0, 114, 255, 0.28)",
    fontSize: "15px",
  },
  metaInfo: {
    marginBottom: "25px",
    color: "#fff",
    fontSize: "16px",
    textAlign: "center",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "22px",
  },
  card: {
    background: "rgba(255,255,255,0.96)",
    borderRadius: "22px",
    padding: "22px",
    boxShadow: "0 12px 30px rgba(0,0,0,0.12)",
    transition: "all 0.3s ease",
    cursor: "pointer",
    border: "1px solid rgba(255,255,255,0.4)",
  },
  cardHeader: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
  },
  avatar: {
    width: "58px",
    height: "58px",
    borderRadius: "16px",
    background: "linear-gradient(135deg, #667eea, #764ba2)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
    fontWeight: "800",
    fontSize: "22px",
    boxShadow: "0 8px 18px rgba(102,126,234,0.28)",
  },
  name: {
    fontSize: "20px",
    fontWeight: "700",
    color: "#1b2559",
  },
  username: {
    color: "#7b8db0",
    fontSize: "14px",
    marginTop: "4px",
  },
  divider: {
    height: "1px",
    backgroundColor: "#edf1f7",
    margin: "18px 0",
  },
  details: {
    fontSize: "14px",
    color: "#4b5a7a",
    lineHeight: "1.9",
  },
  loader: {
    textAlign: "center",
    padding: "80px",
    color: "#fff",
    fontSize: "22px",
    fontWeight: "600",
  },
  error: {
    textAlign: "center",
    padding: "30px",
    color: "#ffe0e0",
    fontSize: "20px",
    fontWeight: "600",
  },
  noResult: {
    textAlign: "center",
    padding: "60px",
    color: "#fff",
    fontSize: "22px",
    fontWeight: "600",
  },
  modalOverlay: {
    position: "fixed",
    inset: 0,
    backgroundColor: "rgba(0,0,0,0.45)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
    padding: "20px",
  },
  modal: {
    background: "#fff",
    borderRadius: "24px",
    padding: "30px",
    width: "100%",
    maxWidth: "500px",
    boxShadow: "0 20px 60px rgba(0,0,0,0.22)",
    textAlign: "center",
    animation: "fadeIn 0.3s ease",
  },
  modalAvatar: {
    width: "80px",
    height: "80px",
    borderRadius: "20px",
    background: "linear-gradient(135deg, #667eea, #764ba2)",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "30px",
    fontWeight: "800",
    margin: "0 auto 18px",
  },
  modalName: {
    fontSize: "28px",
    color: "#1b2559",
    marginBottom: "15px",
  },
  modalText: {
    fontSize: "16px",
    color: "#555",
    marginBottom: "10px",
    lineHeight: "1.7",
  },
  closeBtn: {
    marginTop: "20px",
    padding: "12px 24px",
    border: "none",
    borderRadius: "14px",
    background: "linear-gradient(135deg, #ff5f6d, #ffc371)",
    color: "#fff",
    fontWeight: "700",
    cursor: "pointer",
    fontSize: "15px",
  },
};

export default UserFetch;