import React, { useEffect, useState } from "react";

function UserFetch() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        return response.json();
      })
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  const clearFilter = () => {
    setSearch("");
  };

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div style={styles.container}>
      <div style={styles.overlay}>
        <h1 style={styles.heading}>👥 User Directory</h1>
        <p style={styles.subheading}>
          Search and explore user information easily
        </p>

        <div style={styles.searchBox}>
          <input
            type="text"
            placeholder="🔍 Search by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={styles.input}
          />
          <button onClick={clearFilter} style={styles.button}>
            Clear Filter
          </button>
        </div>

        <p style={styles.count}>Showing {filteredUsers.length} users</p>

        {loading && <h2 style={styles.message}>⏳ Loading users...</h2>}
        {error && <h2 style={styles.error}>❌ {error}</h2>}

        {!loading && !error && filteredUsers.length === 0 && (
          <h2 style={styles.message}>😕 No users found</h2>
        )}

        <div style={styles.cardContainer}>
          {!loading &&
            !error &&
            filteredUsers.map((user) => (
              <div
                key={user.id}
                style={styles.card}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-8px) scale(1.02)";
                  e.currentTarget.style.boxShadow =
                    "0 12px 30px rgba(0,0,0,0.18)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0) scale(1)";
                  e.currentTarget.style.boxShadow =
                    "0 6px 18px rgba(0,0,0,0.12)";
                }}
              >
                <div style={styles.avatar}>{getInitials(user.name)}</div>

                <h2 style={styles.name}>{user.name}</h2>

                <p style={styles.text}>
                  <strong>📧 Email:</strong> {user.email}
                </p>
                <p style={styles.text}>
                  <strong>🏢 Company:</strong> {user.company.name}
                </p>
                <p style={styles.text}>
                  <strong>🌐 Website:</strong> {user.website}
                </p>
                <p style={styles.text}>
                  <strong>📍 City:</strong> {user.address.city}
                </p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #667eea, #764ba2)",
    padding: "30px",
    fontFamily: "'Poppins', sans-serif",
  },
  overlay: {
    backgroundColor: "rgba(255,255,255,0.12)",
    backdropFilter: "blur(10px)",
    borderRadius: "20px",
    padding: "30px",
    minHeight: "90vh",
  },
  heading: {
    textAlign: "center",
    fontSize: "48px",
    fontWeight: "700",
    color: "#fff",
    marginBottom: "10px",
  },
  subheading: {
    textAlign: "center",
    fontSize: "18px",
    color: "#f1f1f1",
    marginBottom: "30px",
  },
  searchBox: {
    display: "flex",
    justifyContent: "center",
    gap: "15px",
    marginBottom: "20px",
    flexWrap: "wrap",
  },
  input: {
    padding: "14px 18px",
    width: "300px",
    fontSize: "18px",
    borderRadius: "12px",
    border: "none",
    outline: "none",
    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
  },
  button: {
    padding: "14px 22px",
    fontSize: "17px",
    borderRadius: "12px",
    border: "none",
    background: "linear-gradient(135deg, #ff9966, #ff5e62)",
    color: "#fff",
    fontWeight: "600",
    cursor: "pointer",
    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
    transition: "0.3s ease",
  },
  count: {
    textAlign: "center",
    fontSize: "20px",
    color: "#fff",
    marginBottom: "30px",
    fontWeight: "500",
  },
  message: {
    textAlign: "center",
    color: "#fff",
    marginBottom: "20px",
  },
  error: {
    textAlign: "center",
    color: "#ffcccc",
    marginBottom: "20px",
  },
  cardContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "25px",
  },
  card: {
    background: "rgba(255,255,255,0.95)",
    padding: "25px",
    borderRadius: "18px",
    boxShadow: "0 6px 18px rgba(0,0,0,0.12)",
    transition: "all 0.3s ease",
    border: "1px solid rgba(255,255,255,0.3)",
  },
  avatar: {
    width: "65px",
    height: "65px",
    borderRadius: "50%",
    background: "linear-gradient(135deg, #667eea, #764ba2)",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "22px",
    fontWeight: "bold",
    marginBottom: "18px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
  },
  name: {
    fontSize: "26px",
    marginBottom: "18px",
    color: "#222",
  },
  text: {
    fontSize: "17px",
    marginBottom: "12px",
    lineHeight: "1.6",
    color: "#444",
  },
};

export default UserFetch;