import React, { useEffect, useMemo, useState } from "react";

/* ── Toon palettes ── */
const TOONS = [
  { bg: "#FF6B6B", light: "#FFB3B3", emoji: "🦊", hat: "🎩" },
  { bg: "#4ECDC4", light: "#A8F0EC", emoji: "🐸", hat: "🌟" },
  { bg: "#FFE66D", light: "#FFF5B7", emoji: "🐱", hat: "🎀" },
  { bg: "#A29BFE", light: "#D8D5FF", emoji: "🐰", hat: "🎈" },
  { bg: "#FD79A8", light: "#FFB8D1", emoji: "🦄", hat: "✨" },
  { bg: "#6C5CE7", light: "#B2A9F7", emoji: "🦉", hat: "🔮" },
  { bg: "#00B894", light: "#81ECEC", emoji: "🐊", hat: "🌿" },
  { bg: "#E17055", light: "#FAB1A0", emoji: "🦁", hat: "👑" },
  { bg: "#FDCB6E", light: "#FFEAA7", emoji: "🐼", hat: "🎭" },
  { bg: "#74B9FF", light: "#C7E8FF", emoji: "🐳", hat: "🎪" },
];

const FLOATERS = ["⭐", "💫", "🌈", "✨", "🎈", "🌟", "🎉", "🦋", "🌸", "🍭"];

const css = `
@import url('https://fonts.googleapis.com/css2?family=Boogaloo&family=Nunito:wght@400;600;700;800;900&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --black: #1a1a2e;
  --outline: 3px solid #1a1a2e;
  --outline-thick: 4px solid #1a1a2e;
  --outline-xl: 5px solid #1a1a2e;
  --shadow: 5px 5px 0px #1a1a2e;
  --shadow-lg: 8px 8px 0px #1a1a2e;
  --shadow-sm: 3px 3px 0px #1a1a2e;
  --bg-page: #FFF9E6;
  --bg-dots: radial-gradient(circle, #e8dfc7 1.5px, transparent 1.5px);
  --yellow: #FFE66D;
  --pink: #FF6B9D;
  --blue: #74B9FF;
  --green: #55EFC4;
  --red: #FF7675;
  --purple: #A29BFE;
}

.ct-root.dark {
  --black: #f5f5f5;
  --bg-page: #111827;
  --bg-dots: radial-gradient(circle, rgba(255,255,255,0.07) 1.2px, transparent 1.2px);
}

html { scroll-behavior: smooth; }

.ct-root {
  min-height: 100vh;
  background-color: var(--bg-page);
  background-image: var(--bg-dots);
  background-size: 24px 24px;
  font-family: 'Nunito', sans-serif;
  overflow-x: hidden;
  position: relative;
}

.ct-root.dark .ct-card,
.ct-root.dark .ct-modal,
.ct-root.dark .ct-search-input,
.ct-root.dark .ct-stat-bubble,
.ct-root.dark .ct-modal-field {
  background: #1f2937 !important;
  color: #f5f5f5 !important;
}

.ct-root.dark .ct-card-name,
.ct-root.dark .ct-modal-name,
.ct-root.dark .ct-title,
.ct-root.dark .ct-results-bar,
.ct-root.dark .ct-loader-text,
.ct-root.dark .ct-empty-text,
.ct-root.dark .ct-field-text,
.ct-root.dark .ct-modal-field-value {
  color: #f5f5f5 !important;
}

.ct-root.dark .ct-subtitle,
.ct-root.dark .ct-empty-sub,
.ct-root.dark .ct-card-username,
.ct-root.dark .ct-modal-handle {
  color: #d1d5db !important;
}

@keyframes float {
  0%,100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}
@keyframes pop-in {
  0% { transform: scale(0) rotate(-10deg); opacity: 0; }
  70% { transform: scale(1.15) rotate(3deg); }
  100% { transform: scale(1) rotate(0deg); opacity: 1; }
}
@keyframes spin-in {
  from { transform: rotate(-180deg) scale(0); opacity: 0; }
  to { transform: rotate(0deg) scale(1); opacity: 1; }
}
@keyframes boing {
  0%,100% { transform: scale(1); }
  25% { transform: scale(1.3, 0.7); }
  50% { transform: scale(0.8, 1.3); }
  75% { transform: scale(1.1, 0.9); }
}
@keyframes wiggle {
  0%,100% { transform: rotate(0deg); }
  25% { transform: rotate(-5deg); }
  75% { transform: rotate(5deg); }
}

.ct-root {
  padding-bottom: 40px;
}

.ct-floater {
  position: fixed;
  pointer-events: none;
  font-size: 32px;
  animation: float 6s ease-in-out infinite;
  opacity: 0.12;
  z-index: 0;
  user-select: none;
}

.ct-hero {
  position: relative;
  background: linear-gradient(135deg, #ff6b9d, #ff8fab);
  border-bottom: var(--outline-xl);
  padding: 48px 48px 80px;
  overflow: hidden;
}

.ct-hero-inner {
  position: relative;
  z-index: 1;
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 32px;
  flex-wrap: wrap;
}

.ct-title {
  font-family: 'Boogaloo', cursive;
  font-size: clamp(52px, 8vw, 96px);
  color: #fff;
  text-shadow: 5px 5px 0px #1a1a2e;
  line-height: 0.95;
  margin-bottom: 12px;
}

.ct-title span {
  color: var(--yellow);
  display: inline-block;
  animation: wiggle 2s ease-in-out infinite;
}

.ct-subtitle {
  font-size: 18px;
  color: rgba(255,255,255,0.95);
  font-weight: 700;
  max-width: 360px;
  line-height: 1.5;
  background: rgba(0,0,0,0.15);
  border-radius: 16px;
  padding: 10px 16px;
  border: 2px solid rgba(255,255,255,0.3);
}

.ct-top-actions {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.ct-pill-btn {
  background: #fff;
  border: var(--outline);
  border-radius: 18px;
  padding: 12px 18px;
  font-weight: 900;
  cursor: pointer;
  box-shadow: var(--shadow);
  transition: 0.2s;
}

.ct-pill-btn:hover {
  transform: translate(-3px,-3px);
  box-shadow: var(--shadow-lg);
}

.ct-stat-row {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}

.ct-stat-bubble {
  background: #fff;
  border: var(--outline-thick);
  border-radius: 20px;
  padding: 14px 24px;
  box-shadow: var(--shadow);
  text-align: center;
  animation: pop-in 0.5s ease both;
}

.ct-stat-num {
  font-family: 'Boogaloo', cursive;
  font-size: 36px;
  color: #1a1a2e;
}

.ct-stat-label {
  font-size: 11px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #888;
}

.ct-search-wrap {
  max-width: 1200px;
  margin: -32px auto 0;
  padding: 0 48px;
  position: relative;
  z-index: 10;
}

.ct-search-panel {
  background: var(--yellow);
  border: var(--outline-xl);
  border-radius: 24px;
  box-shadow: var(--shadow-lg);
  padding: 20px 24px;
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
}

.ct-search-input {
  flex: 1;
  min-width: 220px;
  background: #fff;
  border: var(--outline);
  border-radius: 14px;
  padding: 12px 16px;
  font-size: 16px;
  font-weight: 700;
  outline: none;
  box-shadow: var(--shadow-sm);
}

.ct-clear-btn, .ct-refresh-btn, .ct-sort-btn {
  border: var(--outline);
  cursor: pointer;
  box-shadow: var(--shadow-sm);
  font-weight: 900;
  transition: 0.2s;
}

.ct-clear-btn {
  background: var(--red);
  color: white;
  border-radius: 50%;
  width: 38px; height: 38px;
}

.ct-refresh-btn, .ct-sort-btn {
  border-radius: 14px;
  padding: 12px 18px;
}

.ct-refresh-btn {
  background: #1a1a2e;
  color: var(--yellow);
}

.ct-sort-btn {
  background: white;
  color: #1a1a2e;
}

.ct-refresh-btn:hover, .ct-sort-btn:hover, .ct-clear-btn:hover {
  transform: translate(-2px,-2px);
  box-shadow: var(--shadow);
}

.ct-body {
  max-width: 1200px;
  margin: 48px auto 0;
  padding: 0 48px;
}

.ct-results-bar {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 32px;
  font-size: 16px;
  font-weight: 800;
  color: #1a1a2e;
  flex-wrap: wrap;
}

.ct-results-pill {
  background: #1a1a2e;
  color: var(--yellow);
  border-radius: 100px;
  padding: 4px 14px;
  font-family: 'Boogaloo', cursive;
  font-size: 20px;
}

.ct-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 28px;
}

.ct-card {
  background: #fff;
  border: var(--outline-thick);
  border-radius: 28px;
  overflow: hidden;
  box-shadow: var(--shadow-lg);
  cursor: pointer;
  animation: pop-in 0.5s ease both;
  transition: transform 0.15s ease, box-shadow 0.15s ease;
  position: relative;
}

.ct-card:hover {
  transform: translate(-5px,-5px) rotate(-1deg);
  box-shadow: 12px 12px 0px #1a1a2e;
}

.ct-fav-btn {
  position: absolute;
  top: 14px;
  left: 14px;
  z-index: 5;
  border: var(--outline);
  background: white;
  border-radius: 50%;
  width: 42px;
  height: 42px;
  font-size: 20px;
  cursor: pointer;
  box-shadow: var(--shadow-sm);
}

.ct-card-band {
  height: 100px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: var(--outline-thick);
}

.ct-card-emoji {
  font-size: 52px;
}

.ct-card-id {
  position: absolute;
  top: 10px; right: 12px;
  background: rgba(0,0,0,0.25);
  color: #fff;
  font-size: 11px;
  font-weight: 900;
  padding: 3px 10px;
  border-radius: 100px;
}

.ct-avatar {
  position: absolute;
  bottom: -28px;
  left: 24px;
  width: 56px; height: 56px;
  border-radius: 50%;
  border: var(--outline-thick);
  background: #fff;
  display: flex; align-items: center; justify-content: center;
  font-family: 'Boogaloo', cursive;
  font-size: 22px;
  color: #1a1a2e;
  box-shadow: var(--shadow-sm);
}

.ct-card-body {
  padding: 36px 22px 22px;
}

.ct-card-name {
  font-family: 'Boogaloo', cursive;
  font-size: 24px;
  color: #1a1a2e;
  margin-bottom: 2px;
}

.ct-card-username {
  font-size: 12px;
  font-weight: 800;
  color: #aaa;
  margin-bottom: 16px;
}

.ct-card-divider {
  height: 3px;
  border-radius: 100px;
  margin-bottom: 16px;
  border: none;
}

.ct-field {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
  font-size: 13px;
  font-weight: 700;
}

.ct-field-icon {
  width: 30px; height: 30px;
  border-radius: 10px;
  border: 2px solid #1a1a2e;
  display: flex; align-items: center; justify-content: center;
  font-size: 14px;
  box-shadow: 2px 2px 0 #1a1a2e;
}

.ct-field-text {
  color: #555;
  font-size: 13px;
  word-break: break-word;
}

.ct-card-footer {
  margin-top: 16px;
  padding-top: 14px;
  border-top: 3px dashed rgba(0,0,0,0.1);
  display: flex;
  align-items: center;
  gap: 8px;
}

.ct-city-tag {
  font-family: 'Boogaloo', cursive;
  font-size: 15px;
  color: #fff;
  border: 2px solid #1a1a2e;
  border-radius: 100px;
  padding: 3px 12px;
  box-shadow: 2px 2px 0 #1a1a2e;
}

.ct-peek-btn {
  margin-left: auto;
  background: var(--yellow);
  border: 2px solid #1a1a2e;
  border-radius: 12px;
  padding: 5px 14px;
  font-family: 'Boogaloo', cursive;
  font-size: 15px;
  cursor: pointer;
  box-shadow: var(--shadow-sm);
}

.ct-loader, .ct-empty {
  text-align: center;
  padding: 80px 20px;
}

.ct-loader-text, .ct-empty-text {
  font-family: 'Boogaloo', cursive;
  font-size: 32px;
  color: #1a1a2e;
  margin-top: 10px;
}

.ct-empty-sub {
  font-size: 16px;
  font-weight: 700;
  color: #888;
  margin-top: 8px;
}

.ct-modal-bg {
  position: fixed; inset: 0;
  background: rgba(26,26,46,0.7);
  display: flex; align-items: center; justify-content: center;
  z-index: 1000;
  padding: 20px;
  backdrop-filter: blur(4px);
}

.ct-modal {
  background: #fff;
  border: var(--outline-xl);
  border-radius: 32px;
  width: 100%; max-width: 520px;
  overflow: hidden;
  box-shadow: 12px 12px 0px #1a1a2e;
  animation: spin-in 0.35s ease;
}

.ct-modal-band {
  height: 160px;
  display: flex; align-items: center; justify-content: center;
  flex-direction: column;
  gap: 8px;
  border-bottom: var(--outline-xl);
  position: relative;
}

.ct-modal-emoji {
  font-size: 64px;
  animation: float 3s ease-in-out infinite;
}

.ct-modal-hat {
  font-size: 28px;
}

.ct-modal-close {
  position: absolute;
  top: 14px; right: 14px;
  background: #fff;
  border: var(--outline);
  border-radius: 50%;
  width: 36px; height: 36px;
  cursor: pointer;
  font-size: 18px;
  font-weight: 900;
}

.ct-modal-body { padding: 28px 32px 32px; }

.ct-modal-name {
  font-family: 'Boogaloo', cursive;
  font-size: 32px;
  color: #1a1a2e;
  margin-bottom: 2px;
}

.ct-modal-handle {
  font-size: 14px;
  font-weight: 800;
  color: #bbb;
  margin-bottom: 24px;
}

.ct-modal-fields {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-bottom: 24px;
}

.ct-modal-field {
  border: var(--outline);
  border-radius: 16px;
  padding: 12px 14px;
  box-shadow: var(--shadow-sm);
  background: #FAFAFA;
}

.ct-modal-field.full { grid-column: span 2; }

.ct-modal-field-label {
  font-size: 10px;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: #aaa;
  margin-bottom: 4px;
}

.ct-modal-field-value {
  font-size: 13px;
  font-weight: 700;
  color: #1a1a2e;
  line-height: 1.4;
}

.ct-modal-close-btn {
  width: 100%;
  padding: 16px;
  border: var(--outline-thick);
  border-radius: 18px;
  font-family: 'Boogaloo', cursive;
  font-size: 22px;
  color: #fff;
  cursor: pointer;
  box-shadow: var(--shadow);
}

@media (max-width: 700px) {
  .ct-hero { padding: 36px 20px 64px; }
  .ct-search-wrap, .ct-body { padding: 0 16px; }
  .ct-modal-fields { grid-template-columns: 1fr; }
  .ct-modal-field.full { grid-column: span 1; }
}
`;

function getInitials(name) {
  return name.split(" ").map((w) => w[0]).join("").toUpperCase();
}

function useDebounce(value, delay = 350) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debounced;
}

export default function UserFetch() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [darkMode, setDarkMode] = useState(false);
  const [favorites, setFavorites] = useState(() => {
    return JSON.parse(localStorage.getItem("toon-favorites")) || [];
  });

  const debouncedSearch = useDebounce(search, 300);

  const fetchUsers = async (manual = false) => {
    manual ? setIsRefreshing(true) : setLoading(true);
    setError("");
    try {
      const res = await fetch("https://jsonplaceholder.typicode.com/users");
      if (!res.ok) throw new Error("Oops! Something went wrong 😵");
      setUsers(await res.json());
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    localStorage.setItem("toon-favorites", JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    const closeOnEsc = (e) => {
      if (e.key === "Escape") setSelectedUser(null);
    };
    window.addEventListener("keydown", closeOnEsc);
    return () => window.removeEventListener("keydown", closeOnEsc);
  }, []);

  const getToon = (id) => TOONS[(id - 1) % TOONS.length];

  const filtered = useMemo(() => {
    return [...users]
      .filter((u) =>
        u.name.toLowerCase().includes(debouncedSearch.toLowerCase())
      )
      .sort((a, b) =>
        sortOrder === "asc"
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name)
      );
  }, [users, debouncedSearch, sortOrder]);

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]
    );
  };

  return (
    <div className={`ct-root ${darkMode ? "dark" : ""}`}>
      <style>{css}</style>

      {FLOATERS.map((f, i) => (
        <div
          key={i}
          className="ct-floater"
          style={{
            left: `${(i * 11) % 95}%`,
            top: `${(i * 17 + 5) % 90}%`,
            animationDelay: `${i * 0.7}s`,
            fontSize: `${24 + (i % 3) * 12}px`,
          }}
        >
          {f}
        </div>
      ))}

      <div className="ct-hero">
        <div className="ct-hero-inner">
          <div>
            <div className="ct-title">
              TOON<br /><span>SQUAD!</span>
            </div>
            <p className="ct-subtitle">
              🎉 Your favourite cartoon crew — now smarter, faster & cooler!
            </p>
          </div>

          <div className="ct-top-actions">
            <button className="ct-pill-btn" onClick={() => setDarkMode(!darkMode)}>
              {darkMode ? "☀️ Light" : "🌙 Dark"}
            </button>
            <button className="ct-pill-btn" onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}>
              {sortOrder === "asc" ? "🔼 A-Z" : "🔽 Z-A"}
            </button>
          </div>

          <div className="ct-stat-row">
            <div className="ct-stat-bubble">
              <div className="ct-stat-num">{users.length || "?"}</div>
              <div className="ct-stat-label">Characters</div>
            </div>
            <div className="ct-stat-bubble">
              <div className="ct-stat-num">{filtered.length}</div>
              <div className="ct-stat-label">Visible</div>
            </div>
            <div className="ct-stat-bubble">
              <div className="ct-stat-num">{favorites.length}</div>
              <div className="ct-stat-label">Favorites</div>
            </div>
          </div>
        </div>
      </div>

      <div className="ct-search-wrap">
        <div className="ct-search-panel">
          <input
            className="ct-search-input"
            type="text"
            placeholder="🔍 Find your fave character..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {search && (
            <button className="ct-clear-btn" onClick={() => setSearch("")}>✕</button>
          )}
          <button className="ct-sort-btn" onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}>
            {sortOrder === "asc" ? "A-Z" : "Z-A"}
          </button>
          <button
            className="ct-refresh-btn"
            onClick={() => fetchUsers(true)}
            disabled={isRefreshing}
          >
            {isRefreshing ? "⏳ Loading..." : "🔄 Reload"}
          </button>
        </div>
      </div>

      <div className="ct-body">
        {!loading && !error && (
          <div className="ct-results-bar">
            <span className="ct-results-pill">{filtered.length}</span>
            characters found
            {search && <> matching <strong>"{search}"</strong></>}
            ⭐
          </div>
        )}

        {loading ? (
          <div className="ct-loader">
            <div style={{ fontSize: "60px" }}>🎬</div>
            <div className="ct-loader-text">Loading awesome characters...</div>
          </div>
        ) : error ? (
          <div className="ct-empty">
            <div style={{ fontSize: "72px" }}>😵</div>
            <div className="ct-empty-text">Oops! Something broke!</div>
            <div className="ct-empty-sub">{error}</div>
          </div>
        ) : filtered.length === 0 ? (
          <div className="ct-empty">
            <div style={{ fontSize: "72px" }}>🔭</div>
            <div className="ct-empty-text">No characters found!</div>
            <div className="ct-empty-sub">Try a different name 😄</div>
          </div>
        ) : (
          <div className="ct-grid">
            {filtered.map((user, i) => {
              const toon = getToon(user.id);
              const isFav = favorites.includes(user.id);

              return (
                <div
                  key={user.id}
                  className="ct-card"
                  style={{ animationDelay: `${i * 60}ms` }}
                  onClick={() => setSelectedUser(user)}
                >
                  <button
                    className="ct-fav-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(user.id);
                    }}
                  >
                    {isFav ? "❤️" : "🤍"}
                  </button>

                  <div className="ct-card-band" style={{ background: toon.bg }}>
                    <span className="ct-card-emoji">{toon.emoji}</span>
                    <div className="ct-card-id">#{String(user.id).padStart(2, "0")}</div>
                    <div className="ct-avatar" style={{ borderColor: toon.bg, color: toon.bg }}>
                      {getInitials(user.name)}
                    </div>
                  </div>

                  <div className="ct-card-body">
                    <div className="ct-card-name">{user.name}</div>
                    <div className="ct-card-username">👾 @{user.username}</div>

                    <hr className="ct-card-divider" style={{ background: toon.light }} />

                    <div className="ct-field">
                      <div className="ct-field-icon" style={{ background: toon.light, borderColor: toon.bg }}>📧</div>
                      <span className="ct-field-text">{user.email}</span>
                    </div>
                    <div className="ct-field">
                      <div className="ct-field-icon" style={{ background: toon.light, borderColor: toon.bg }}>🏢</div>
                      <span className="ct-field-text">{user.company.name}</span>
                    </div>
                    <div className="ct-field">
                      <div className="ct-field-icon" style={{ background: toon.light, borderColor: toon.bg }}>📞</div>
                      <span className="ct-field-text">{user.phone}</span>
                    </div>

                    <div className="ct-card-footer">
                      <div className="ct-city-tag" style={{ background: toon.bg }}>
                        📍 {user.address.city}
                      </div>
                      <button className="ct-peek-btn" style={{ background: toon.light }}>
                        Peek! 👀
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {selectedUser && (() => {
        const toon = getToon(selectedUser.id);
        return (
          <div className="ct-modal-bg" onClick={() => setSelectedUser(null)}>
            <div className="ct-modal" onClick={(e) => e.stopPropagation()}>
              <div className="ct-modal-band" style={{ background: toon.bg }}>
                <span className="ct-modal-hat">{toon.hat}</span>
                <span className="ct-modal-emoji">{toon.emoji}</span>
                <button className="ct-modal-close" onClick={() => setSelectedUser(null)}>✕</button>
              </div>

              <div className="ct-modal-body">
                <div className="ct-modal-name">{selectedUser.name}</div>
                <div className="ct-modal-handle">👾 @{selectedUser.username}</div>

                <div className="ct-modal-fields">
                  <div className="ct-modal-field">
                    <div className="ct-modal-field-label">📧 Email</div>
                    <div className="ct-modal-field-value">{selectedUser.email}</div>
                  </div>
                  <div className="ct-modal-field">
                    <div className="ct-modal-field-label">📞 Phone</div>
                    <div className="ct-modal-field-value">{selectedUser.phone}</div>
                  </div>
                  <div className="ct-modal-field">
                    <div className="ct-modal-field-label">🏢 Studio</div>
                    <div className="ct-modal-field-value">{selectedUser.company.name}</div>
                  </div>
                  <div className="ct-modal-field">
                    <div className="ct-modal-field-label">🌐 Website</div>
                    <div className="ct-modal-field-value">{selectedUser.website}</div>
                  </div>
                  <div className="ct-modal-field full">
                    <div className="ct-modal-field-label">📍 Home Base</div>
                    <div className="ct-modal-field-value">
                      {selectedUser.address.street}, {selectedUser.address.suite}, {selectedUser.address.city} — {selectedUser.address.zipcode}
                    </div>
                  </div>
                  <div className="ct-modal-field full">
                    <div className="ct-modal-field-label">🎭 Catchphrase</div>
                    <div className="ct-modal-field-value">"{selectedUser.company.catchPhrase}"</div>
                  </div>
                </div>

                <button
                  className="ct-modal-close-btn"
                  style={{ background: toon.bg }}
                  onClick={() => setSelectedUser(null)}
                >
                  See ya later! {toon.emoji}
                </button>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
}