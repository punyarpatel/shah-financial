import React, { useEffect, useMemo, useState } from "react";

/* ---------- CONFIG ---------- */
const USERS_API = "https://jsonplaceholder.typicode.com/users";

/* ---------- HOOK: DEBOUNCE ---------- */
function useDebounce(value, delay = 300) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debounced;
}

/* ---------- MAIN ---------- */
export default function UserFetch() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState("asc");
  const [dark, setDark] = useState(false);
  const [showFavOnly, setShowFavOnly] = useState(false);
  const [selected, setSelected] = useState(null);

  const [favorites, setFavorites] = useState(() =>
    JSON.parse(localStorage.getItem("fav")) || []
  );

  const debouncedSearch = useDebounce(search);

  /* ---------- FETCH ---------- */
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await fetch(USERS_API);
      if (!res.ok) throw new Error("API failed");
      setUsers(await res.json());
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    localStorage.setItem("fav", JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    const esc = (e) => e.key === "Escape" && setSelected(null);
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, []);

  /* ---------- FILTER ---------- */
  const processed = useMemo(() => {
    let data = [...users];

    if (debouncedSearch)
      data = data.filter((u) =>
        u.name.toLowerCase().includes(debouncedSearch.toLowerCase())
      );

    if (showFavOnly)
      data = data.filter((u) => favorites.includes(u.id));

    data.sort((a, b) =>
      sort === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name)
    );

    return data;
  }, [users, debouncedSearch, sort, showFavOnly, favorites]);

  /* ---------- PAGINATION ---------- */
  const perPage = 4;
  const totalPages = Math.ceil(processed.length / perPage);
  const current = processed.slice((page - 1) * perPage, page * perPage);

  /* ---------- FUNCTIONS ---------- */
  const toggleFav = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  /* ---------- UI ---------- */
  return (
    <div style={{ ...styles.app, background: dark ? "#111" : "#f5f5f5" }}>
      <h1 style={styles.title}>🚀 GOD LEVEL USER DIRECTORY</h1>

      {/* CONTROLS */}
      <div style={styles.controls}>
        <input
          placeholder="Search..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          style={styles.input}
        />

        <button onClick={() => setSort(sort === "asc" ? "desc" : "asc")}>
          {sort === "asc" ? "A-Z" : "Z-A"}
        </button>

        <button onClick={() => setShowFavOnly(!showFavOnly)}>
          {showFavOnly ? "All" : "Favorites"}
        </button>

        <button onClick={() => setDark(!dark)}>
          {dark ? "Light" : "Dark"}
        </button>

        <button onClick={fetchUsers}>Reload</button>
      </div>

      {/* DATA */}
      {loading ? (
        <h2>Loading...</h2>
      ) : error ? (
        <h2>{error}</h2>
      ) : (
        <>
          <div style={styles.grid}>
            {current.map((u) => (
              <div key={u.id} style={styles.card}>
                <button onClick={() => toggleFav(u.id)}>
                  {favorites.includes(u.id) ? "❤️" : "🤍"}
                </button>

                <h3>{u.name}</h3>
                <p>{u.email}</p>
                <p>{u.company.name}</p>

                <button onClick={() => setSelected(u)}>View</button>
              </div>
            ))}
          </div>

          {/* PAGINATION */}
          <div style={styles.pagination}>
            <button disabled={page === 1} onClick={() => setPage(page - 1)}>
              Prev
            </button>

            <span>
              {page} / {totalPages}
            </span>

            <button
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
            >
              Next
            </button>
          </div>
        </>
      )}

      {/* MODAL */}
      {selected && (
        <div style={styles.modalBg} onClick={() => setSelected(null)}>
          <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
            <h2>{selected.name}</h2>
            <p>Email: {selected.email}</p>
            <p>Phone: {selected.phone}</p>
            <p>Website: {selected.website}</p>
            <button onClick={() => setSelected(null)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------- STYLES ---------- */
const styles = {
  app: {
    minHeight: "100vh",
    padding: "30px",
    fontFamily: "Arial",
  },
  title: {
    textAlign: "center",
    marginBottom: "20px",
  },
  controls: {
    display: "flex",
    gap: "10px",
    justifyContent: "center",
    marginBottom: "20px",
    flexWrap: "wrap",
  },
  input: {
    padding: "10px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
    gap: "15px",
  },
  card: {
    padding: "15px",
    background: "white",
    borderRadius: "10px",
  },
  pagination: {
    textAlign: "center",
    marginTop: "20px",
  },
  modalBg: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    background: "white",
    padding: "20px",
    borderRadius: "10px",
  },
};