import React, { useEffect, useState } from "react";

function UserFetch() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  // Fetch users using useEffect
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  // Filter users by name
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  // Clear search
  const clearFilter = () => {
    setSearch("");
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>User Directory</h1>

      <div style={styles.searchBox}>
        <input
          type="text"
          placeholder="Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={styles.input}
        />
        <button onClick={clearFilter} style={styles.button}>
          Clear Filter
        </button>
      </div>

      <p style={styles.count}>Showing {filteredUsers.length} users</p>

      <div style={styles.cardContainer}>
        {filteredUsers.map((user) => (
          <div key={user.id} style={styles.card}>
            <h2 style={styles.name}>{user.name}</h2>
            <p style={styles.text}>
              <strong>Email:</strong> {user.email}
            </p>
            <p style={styles.text}>
              <strong>Company:</strong> {user.company.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    backgroundColor: "#f4f4f4",
    padding: "30px",
    fontFamily: "Georgia, serif",
  },
  heading: {
    textAlign: "center",
    fontSize: "52px",
    fontWeight: "bold",
    marginBottom: "30px",
    color: "#111",
  },
  searchBox: {
    display: "flex",
    justifyContent: "center",
    gap: "15px",
    marginBottom: "20px",
    flexWrap: "wrap",
  },
  input: {
    padding: "12px 15px",
    width: "260px",
    fontSize: "20px",
    borderRadius: "6px",
    border: "1px solid #bbb",
    outline: "none",
  },
  button: {
    padding: "12px 20px",
    fontSize: "20px",
    borderRadius: "6px",
    border: "1px solid #aaa",
    backgroundColor: "#eee",
    cursor: "pointer",
    transition: "0.3s",
  },
  count: {
    textAlign: "center",
    fontSize: "20px",
    marginBottom: "30px",
    color: "#555",
  },
  cardContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "25px",
  },
  card: {
    backgroundColor: "#fff",
    padding: "25px",
    borderRadius: "12px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    border: "1px solid #ddd",
    transition: "0.3s",
  },
  name: {
    fontSize: "28px",
    marginBottom: "20px",
    color: "#222",
  },
  text: {
    fontSize: "18px",
    marginBottom: "15px",
    lineHeight: "1.5",
    color: "#333",
  },
};

export default UserFetch;