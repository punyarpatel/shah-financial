import React, { useEffect, useState } from "react";

/* ─── Per-user gradient palettes ─── */
const PALETTES = [
  { from: "#f953c6", to: "#b91d73", shadow: "rgba(249,83,198,0.35)" },
  { from: "#4facfe", to: "#00f2fe", shadow: "rgba(79,172,254,0.35)" },
  { from: "#43e97b", to: "#38f9d7", shadow: "rgba(67,233,123,0.35)" },
  { from: "#fa709a", to: "#fee140", shadow: "rgba(250,112,154,0.35)" },
  { from: "#a18cd1", to: "#fbc2eb", shadow: "rgba(161,140,209,0.35)" },
  { from: "#ffecd2", to: "#fcb69f", shadow: "rgba(252,182,159,0.35)" },
  { from: "#667eea", to: "#764ba2", shadow: "rgba(102,126,234,0.35)" },
  { from: "#11998e", to: "#38ef7d", shadow: "rgba(17,153,142,0.35)" },
  { from: "#f7971e", to: "#ffd200", shadow: "rgba(247,151,30,0.35)" },
  { from: "#ee0979", to: "#ff6a00", shadow: "rgba(238,9,121,0.35)" },
];

const css = `
@import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,400;0,700;1,400&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --bg: #f0f2f8;
  --surface: #ffffff;
  --text-primary: #12132a;
  --text-secondary: #6b7099;
  --text-muted: #a8adc7;
  --border: rgba(0,0,0,0.07);
  --radius: 24px;
}

.ud-root {
  min-height: 100vh;
  background: var(--bg);
  font-family: 'Plus Jakarta Sans', sans-serif;
  color: var(--text-primary);
  padding-bottom: 80px;
}

.ud-hero {
  position: relative;
  overflow: hidden;
  padding: 70px 60px 100px;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
}

.ud-hero::before {
  content: '';
  position: absolute;
  width: 600px; height: 600px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(102,126,234,0.25) 0%, transparent 70%);
  top: -200px; right: -100px;
  pointer-events: none;
}

.ud-hero::after {
  content: '';
  position: absolute;
  width: 400px; height: 400px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(249,83,198,0.15) 0%, transparent 70%);
  bottom: -150px; left: 40px;
  pointer-events: none;
}

.ud-hero-inner {
  position: relative;
  z-index: 1;
  max-width: 1200px;
  margin: 0 auto;
}

.ud-tag {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: rgba(255,255,255,0.08);
  border: 1px solid rgba(255,255,255,0.12);
  border-radius: 100px;
  padding: 6px 16px;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.6);
  margin-bottom: 24px;
}

.ud-tag-dot {
  width: 6px; height: 6px;
  border-radius: 50%;
  background: #43e97b;
  box-shadow: 0 0 8px #43e97b;
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.5; transform: scale(0.8); }
}

.ud-title {
  font-family: 'Fraunces', serif;
  font-size: clamp(40px, 6vw, 72px);
  font-weight: 700;
  color: #fff;
  line-height: 1.05;
  letter-spacing: -0.02em;
  margin-bottom: 16px;
}

.ud-title em {
  font-style: italic;
  background: linear-gradient(90deg, #f953c6, #4facfe);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.ud-subtitle {
  font-size: 16px;
  color: rgba(255,255,255,0.45);
  font-weight: 400;
  max-width: 400px;
  line-height: 1.6;
}

.ud-stats {
  display: flex;
  gap: 12px;
  margin-top: 48px;
  flex-wrap: wrap;
}

.ud-stat {
  background: rgba(255,255,255,0.07);
  border: 1px solid rgba(255,255,255,0.1);
  backdrop-filter: blur(8px);
  border-radius: 16px;
  padding: 16px 24px;
}

.ud-stat-num {
  font-family: 'Fraunces', serif;
  font-size: 28px;
  font-weight: 700;
  color: #fff;
  line-height: 1;
  margin-bottom: 4px;
}

.ud-stat-label {
  font-size: 11px;
  color: rgba(255,255,255,0.35);
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.ud-search-section {
  max-width: 1200px;
  margin: -36px auto 0;
  padding: 0 60px;
  position: relative;
  z-index: 10;
}

.ud-search-card {
  background: var(--surface);
  border-radius: 20px;
  padding: 20px 24px;
  box-shadow: 0 20px 60px rgba(0,0,0,0.12);
  display: flex;
  align-items: center;
  gap: 16px;
}

.ud-search-icon { color: var(--text-muted); font-size: 18px; flex-shrink: 0; }

.ud-search-input {
  flex: 1;
  border: none;
  outline: none;
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 15px;
  color: var(--text-primary);
  background: transparent;
}

.ud-search-input::placeholder { color: var(--text-muted); }

.ud-search-clear {
  background: #f0f2f8;
  border: none;
  border-radius: 50%;
  width: 28px; height: 28px;
  cursor: pointer;
  color: var(--text-secondary);
  font-size: 14px;
  display: flex; align-items: center; justify-content: center;
  transition: background 0.2s;
}

.ud-search-clear:hover { background: #e0e3ef; }

.ud-divider-v {
  width: 1px;
  height: 32px;
  background: var(--border);
  flex-shrink: 0;
}

.ud-refresh {
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: #fff;
  border: none;
  border-radius: 14px;
  padding: 12px 22px;
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  white-space: nowrap;
  transition: opacity 0.2s, transform 0.2s;
  box-shadow: 0 8px 20px rgba(102,126,234,0.3);
}

.ud-refresh:hover:not(:disabled) { opacity: 0.9; transform: translateY(-1px); }
.ud-refresh:disabled { opacity: 0.5; cursor: not-allowed; }

.ud-body {
  max-width: 1200px;
  margin: 40px auto 0;
  padding: 0 60px;
}

.ud-results-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 28px;
}

.ud-results-text {
  font-size: 13px;
  color: var(--text-muted);
  font-weight: 500;
}

.ud-results-text b { color: var(--text-primary); }

.ud-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(310px, 1fr));
  gap: 24px;
}

.ud-card {
  background: var(--surface);
  border-radius: var(--radius);
  overflow: hidden;
  box-shadow: 0 4px 24px rgba(0,0,0,0.06);
  border: 1px solid var(--border);
  cursor: pointer;
  transition: transform 0.3s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.3s ease;
  animation: cardIn 0.5s ease both;
}

@keyframes cardIn {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}

.ud-card:hover {
  transform: translateY(-8px) scale(1.01);
  box-shadow: 0 24px 48px rgba(0,0,0,0.12);
}

.ud-card-strip {
  height: 120px;
  position: relative;
  display: flex;
  align-items: flex-end;
  padding: 0 24px 0;
}

.ud-card-avatar {
  width: 64px; height: 64px;
  border-radius: 18px;
  display: flex; align-items: center; justify-content: center;
  font-family: 'Fraunces', serif;
  font-size: 24px;
  font-weight: 700;
  color: #fff;
  border: 3px solid #fff;
  box-shadow: 0 8px 24px rgba(0,0,0,0.15);
  transform: translateY(50%);
  flex-shrink: 0;
  position: relative;
  z-index: 2;
}

.ud-card-id-badge {
  margin-left: auto;
  background: rgba(0,0,0,0.25);
  backdrop-filter: blur(4px);
  border-radius: 100px;
  padding: 4px 10px;
  font-size: 10px;
  color: rgba(255,255,255,0.8);
  letter-spacing: 0.1em;
  font-weight: 600;
  margin-bottom: 12px;
}

.ud-card-body { padding: 44px 24px 24px; }

.ud-card-name {
  font-family: 'Fraunces', serif;
  font-size: 20px;
  font-weight: 700;
  color: var(--text-primary);
  letter-spacing: -0.01em;
  margin-bottom: 2px;
}

.ud-card-username {
  font-size: 12px;
  color: var(--text-muted);
  font-weight: 500;
  margin-bottom: 20px;
}

.ud-card-divider {
  height: 1px;
  background: var(--border);
  margin-bottom: 16px;
}

.ud-card-field {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  margin-bottom: 10px;
  font-size: 13px;
}

.ud-card-field-icon {
  width: 28px; height: 28px;
  border-radius: 8px;
  background: #f0f2f8;
  display: flex; align-items: center; justify-content: center;
  font-size: 13px;
  flex-shrink: 0;
  margin-top: -1px;
}

.ud-card-field-label {
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--text-muted);
  font-weight: 600;
  margin-bottom: 1px;
}

.ud-card-field-value {
  color: var(--text-secondary);
  font-weight: 500;
  line-height: 1.4;
  word-break: break-all;
}

.ud-card-footer {
  margin-top: 18px;
  padding-top: 16px;
  border-top: 1px solid var(--border);
  display: flex;
  align-items: center;
  gap: 8px;
}

.ud-card-city-pill {
  border-radius: 100px;
  padding: 5px 12px;
  font-size: 11px;
  font-weight: 600;
  color: #fff;
}

.ud-view-btn {
  margin-left: auto;
  background: none;
  border: 1px solid var(--border);
  border-radius: 10px;
  padding: 6px 14px;
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 12px;
  font-weight: 600;
  color: var(--text-secondary);
  cursor: pointer;
  transition: all 0.2s;
}

.ud-view-btn:hover { background: #f0f2f8; color: var(--text-primary); }

.ud-modal-bg {
  position: fixed; inset: 0;
  background: rgba(12,13,30,0.65);
  backdrop-filter: blur(6px);
  display: flex; align-items: center; justify-content: center;
  z-index: 1000;
  padding: 20px;
  animation: bgIn 0.25s ease;
}

@keyframes bgIn { from { opacity: 0; } to { opacity: 1; } }

.ud-modal {
  background: var(--surface);
  border-radius: 28px;
  width: 100%; max-width: 480px;
  overflow: hidden;
  box-shadow: 0 40px 80px rgba(0,0,0,0.25);
  animation: modalIn 0.35s cubic-bezier(0.34,1.56,0.64,1);
}

@keyframes modalIn {
  from { opacity: 0; transform: scale(0.88) translateY(20px); }
  to   { opacity: 1; transform: scale(1) translateY(0); }
}

.ud-modal-strip {
  height: 140px;
  position: relative;
  display: flex; align-items: center; justify-content: center;
}

.ud-modal-avatar {
  width: 80px; height: 80px;
  border-radius: 22px;
  border: 4px solid #fff;
  box-shadow: 0 12px 30px rgba(0,0,0,0.2);
  display: flex; align-items: center; justify-content: center;
  font-family: 'Fraunces', serif;
  font-size: 32px;
  font-weight: 700;
  color: #fff;
}

.ud-modal-close-x {
  position: absolute;
  top: 14px; right: 14px;
  background: rgba(0,0,0,0.2);
  border: none;
  border-radius: 50%;
  width: 32px; height: 32px;
  color: #fff;
  font-size: 16px;
  cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  transition: background 0.2s;
}

.ud-modal-close-x:hover { background: rgba(0,0,0,0.35); }

.ud-modal-body { padding: 28px 32px 32px; }

.ud-modal-name {
  font-family: 'Fraunces', serif;
  font-size: 26px;
  font-weight: 700;
  color: var(--text-primary);
  letter-spacing: -0.02em;
  margin-bottom: 2px;
}

.ud-modal-handle {
  font-size: 13px;
  color: var(--text-muted);
  margin-bottom: 24px;
}

.ud-modal-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
  margin-bottom: 24px;
}

.ud-modal-field {
  background: #f7f8fc;
  border-radius: 14px;
  padding: 12px 14px;
}

.ud-modal-field.full { grid-column: span 2; }

.ud-modal-field-label {
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--text-muted);
  font-weight: 700;
  margin-bottom: 4px;
}

.ud-modal-field-value {
  font-size: 13px;
  color: var(--text-primary);
  font-weight: 600;
  word-break: break-all;
  line-height: 1.4;
}

.ud-modal-close-btn {
  width: 100%;
  padding: 15px;
  border: none;
  border-radius: 16px;
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 15px;
  font-weight: 700;
  color: #fff;
  cursor: pointer;
  transition: opacity 0.2s, transform 0.2s;
}

.ud-modal-close-btn:hover { opacity: 0.9; transform: translateY(-1px); }

.ud-loader {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  min-height: 320px;
}

.ud-loader-dots { display: flex; gap: 8px; }

.ud-loader-dot {
  width: 10px; height: 10px;
  border-radius: 50%;
}

.ud-loader-dot:nth-child(1) { animation: dotBounce 1.2s ease-in-out 0s infinite; }
.ud-loader-dot:nth-child(2) { animation: dotBounce 1.2s ease-in-out 0.2s infinite; }
.ud-loader-dot:nth-child(3) { animation: dotBounce 1.2s ease-in-out 0.4s infinite; }

@keyframes dotBounce {
  0%, 80%, 100% { transform: translateY(0); opacity: 0.4; }
  40% { transform: translateY(-10px); opacity: 1; }
}

.ud-loader-text { font-size: 13px; color: var(--text-muted); letter-spacing: 0.08em; }

.ud-empty {
  text-align: center;
  padding: 80px 20px;
  color: var(--text-muted);
}

.ud-empty-icon { font-size: 48px; margin-bottom: 16px; }

.ud-empty-text {
  font-family: 'Fraunces', serif;
  font-size: 22px;
  color: var(--text-secondary);
  margin-bottom: 8px;
}

.ud-empty-sub { font-size: 14px; }

@media (max-width: 700px) {
  .ud-hero { padding: 48px 24px 80px; }
  .ud-search-section { padding: 0 16px; }
  .ud-body { padding: 0 16px; }
  .ud-modal-grid { grid-template-columns: 1fr; }
  .ud-modal-field.full { grid-column: span 1; }
}
`;

function getInitials(name) {
  return name.split(" ").map(w => w[0]).join("").toUpperCase();
}

export default function UserFetch() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const fetchUsers = async (manual = false) => {
    manual ? setIsRefreshing(true) : setLoading(true);
    setError("");
    try {
      const res = await fetch("https://jsonplaceholder.typicode.com/users");
      if (!res.ok) throw new Error("Failed to fetch users");
      setUsers(await res.json());
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => { fetchUsers(); }, []);

  const filtered = users.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase())
  );

  const getPalette = (id) => PALETTES[(id - 1) % PALETTES.length];

  return (
    <div className="ud-root">
      <style>{css}</style>

      {/* HERO */}
      <div className="ud-hero">
        <div className="ud-hero-inner">
          <div className="ud-tag">
            <span className="ud-tag-dot" />
            Live Directory
          </div>
          <h1 className="ud-title">Meet the <em>Team</em></h1>
          <p className="ud-subtitle">Browse, search, and explore everyone in your organisation at a glance.</p>
          <div className="ud-stats">
            <div className="ud-stat">
              <div className="ud-stat-num">{users.length || "—"}</div>
              <div className="ud-stat-label">Total Members</div>
            </div>
            <div className="ud-stat">
              <div className="ud-stat-num">{filtered.length}</div>
              <div className="ud-stat-label">Showing</div>
            </div>
            <div className="ud-stat">
              <div className="ud-stat-num">{new Set(users.map(u => u.company?.name)).size || "—"}</div>
              <div className="ud-stat-label">Companies</div>
            </div>
          </div>
        </div>
      </div>

      {/* SEARCH */}
      <div className="ud-search-section">
        <div className="ud-search-card">
          <span className="ud-search-icon">🔍</span>
          <input
            className="ud-search-input"
            type="text"
            placeholder="Search by name..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          {search && (
            <button className="ud-search-clear" onClick={() => setSearch("")}>✕</button>
          )}
          <div className="ud-divider-v" />
          <button className="ud-refresh" onClick={() => fetchUsers(true)} disabled={isRefreshing}>
            {isRefreshing ? "⏳ Syncing…" : "↻ Refresh"}
          </button>
        </div>
      </div>

      {/* BODY */}
      <div className="ud-body">
        {!loading && !error && (
          <div className="ud-results-bar">
            <p className="ud-results-text">
              Showing <b>{filtered.length}</b> of <b>{users.length}</b> members
              {search && <> for &ldquo;{search}&rdquo;</>}
            </p>
          </div>
        )}

        {loading ? (
          <div className="ud-loader">
            <div className="ud-loader-dots">
              {PALETTES.slice(0, 3).map((p, i) => (
                <div key={i} className="ud-loader-dot"
                  style={{ background: `linear-gradient(135deg, ${p.from}, ${p.to})` }} />
              ))}
            </div>
            <p className="ud-loader-text">Fetching members…</p>
          </div>
        ) : error ? (
          <div className="ud-empty">
            <div className="ud-empty-icon">⚠️</div>
            <p className="ud-empty-text">Couldn't load members</p>
            <p className="ud-empty-sub">{error}</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="ud-empty">
            <div className="ud-empty-icon">🔭</div>
            <p className="ud-empty-text">No one found</p>
            <p className="ud-empty-sub">Try a different search term</p>
          </div>
        ) : (
          <div className="ud-grid">
            {filtered.map((user, i) => {
              const pal = getPalette(user.id);
              return (
                <div key={user.id} className="ud-card"
                  style={{ animationDelay: `${i * 50}ms` }}
                  onClick={() => setSelectedUser(user)}>
                  <div className="ud-card-strip"
                    style={{ background: `linear-gradient(135deg, ${pal.from}, ${pal.to})` }}>
                    <div className="ud-card-avatar"
                      style={{ background: `linear-gradient(135deg, ${pal.from}, ${pal.to})` }}>
                      {getInitials(user.name)}
                    </div>
                    <div className="ud-card-id-badge">#{String(user.id).padStart(2, "0")}</div>
                  </div>
                  <div className="ud-card-body">
                    <div className="ud-card-name">{user.name}</div>
                    <div className="ud-card-username">@{user.username}</div>
                    <div className="ud-card-divider" />
                    <div className="ud-card-field">
                      <div className="ud-card-field-icon">📧</div>
                      <div>
                        <div className="ud-card-field-label">Email</div>
                        <div className="ud-card-field-value">{user.email}</div>
                      </div>
                    </div>
                    <div className="ud-card-field">
                      <div className="ud-card-field-icon">🏢</div>
                      <div>
                        <div className="ud-card-field-label">Company</div>
                        <div className="ud-card-field-value">{user.company.name}</div>
                      </div>
                    </div>
                    <div className="ud-card-field">
                      <div className="ud-card-field-icon">📞</div>
                      <div>
                        <div className="ud-card-field-label">Phone</div>
                        <div className="ud-card-field-value">{user.phone}</div>
                      </div>
                    </div>
                    <div className="ud-card-footer">
                      <div className="ud-card-city-pill"
                        style={{ background: `linear-gradient(135deg, ${pal.from}, ${pal.to})` }}>
                        📍 {user.address.city}
                      </div>
                      <button className="ud-view-btn">View profile →</button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* MODAL */}
      {selectedUser && (() => {
        const pal = getPalette(selectedUser.id);
        return (
          <div className="ud-modal-bg" onClick={() => setSelectedUser(null)}>
            <div className="ud-modal" onClick={e => e.stopPropagation()}>
              <div className="ud-modal-strip"
                style={{ background: `linear-gradient(135deg, ${pal.from}, ${pal.to})` }}>
                <div className="ud-modal-avatar">{getInitials(selectedUser.name)}</div>
                <button className="ud-modal-close-x" onClick={() => setSelectedUser(null)}>✕</button>
              </div>
              <div className="ud-modal-body">
                <div className="ud-modal-name">{selectedUser.name}</div>
                <div className="ud-modal-handle">@{selectedUser.username}</div>
                <div className="ud-modal-grid">
                  <div className="ud-modal-field">
                    <div className="ud-modal-field-label">Email</div>
                    <div className="ud-modal-field-value">{selectedUser.email}</div>
                  </div>
                  <div className="ud-modal-field">
                    <div className="ud-modal-field-label">Phone</div>
                    <div className="ud-modal-field-value">{selectedUser.phone}</div>
                  </div>
                  <div className="ud-modal-field">
                    <div className="ud-modal-field-label">Company</div>
                    <div className="ud-modal-field-value">{selectedUser.company.name}</div>
                  </div>
                  <div className="ud-modal-field">
                    <div className="ud-modal-field-label">Website</div>
                    <div className="ud-modal-field-value">{selectedUser.website}</div>
                  </div>
                  <div className="ud-modal-field full">
                    <div className="ud-modal-field-label">Address</div>
                    <div className="ud-modal-field-value">
                      {selectedUser.address.street}, {selectedUser.address.suite}, {selectedUser.address.city} — {selectedUser.address.zipcode}
                    </div>
                  </div>
                  <div className="ud-modal-field full">
                    <div className="ud-modal-field-label">Company Tagline</div>
                    <div className="ud-modal-field-value">"{selectedUser.company.catchPhrase}"</div>
                  </div>
                </div>
                <button className="ud-modal-close-btn"
                  style={{ background: `linear-gradient(135deg, ${pal.from}, ${pal.to})` }}
                  onClick={() => setSelectedUser(null)}>
                  Close Profile
                </button>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
}