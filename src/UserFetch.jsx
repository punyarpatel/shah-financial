import React, { useEffect, useState } from "react";

/* ── Cartoon color palettes per user ── */
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

html { scroll-behavior: smooth; }

.ct-root {
  min-height: 100vh;
  background-color: var(--bg-page);
  background-image: var(--bg-dots);
  background-size: 24px 24px;
  font-family: 'Nunito', sans-serif;
  overflow-x: hidden;
  cursor: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 32 32'%3E%3Ccircle cx='16' cy='16' r='14' fill='%23FFE66D' stroke='%231a1a2e' stroke-width='3'/%3E%3Ccircle cx='11' cy='13' r='2' fill='%231a1a2e'/%3E%3Ccircle cx='21' cy='13' r='2' fill='%231a1a2e'/%3E%3Cpath d='M10 20 Q16 26 22 20' stroke='%231a1a2e' stroke-width='2.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E") 16 16, auto;
}

/* ── WOBBLE KEYFRAMES ── */
@keyframes wobble {
  0%,100% { transform: rotate(-1deg) scale(1); }
  50%      { transform: rotate(1deg) scale(1.02); }
}
@keyframes float {
  0%,100% { transform: translateY(0px); }
  50%      { transform: translateY(-10px); }
}
@keyframes squish {
  0%,100% { transform: scaleY(1) scaleX(1); }
  30%     { transform: scaleY(0.85) scaleX(1.15); }
  60%     { transform: scaleY(1.1) scaleX(0.95); }
}
@keyframes spin-in {
  from { transform: rotate(-180deg) scale(0); opacity: 0; }
  to   { transform: rotate(0deg) scale(1); opacity: 1; }
}
@keyframes pop-in {
  0%   { transform: scale(0) rotate(-10deg); opacity: 0; }
  70%  { transform: scale(1.15) rotate(3deg); }
  100% { transform: scale(1) rotate(0deg); opacity: 1; }
}
@keyframes slide-down {
  from { transform: translateY(-30px); opacity: 0; }
  to   { transform: translateY(0); opacity: 1; }
}
@keyframes rainbow-border {
  0%   { border-color: #FF6B6B; }
  20%  { border-color: #FFE66D; }
  40%  { border-color: #4ECDC4; }
  60%  { border-color: #A29BFE; }
  80%  { border-color: #FD79A8; }
  100% { border-color: #FF6B6B; }
}
@keyframes star-spin {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}
@keyframes boing {
  0%,100% { transform: scale(1); }
  25%     { transform: scale(1.3, 0.7); }
  50%     { transform: scale(0.8, 1.3); }
  75%     { transform: scale(1.1, 0.9); }
}
@keyframes dash {
  to { stroke-dashoffset: 0; }
}
@keyframes wiggle {
  0%,100% { transform: rotate(0deg); }
  25%     { transform: rotate(-5deg); }
  75%     { transform: rotate(5deg); }
}

/* ── HERO ── */
.ct-hero {
  position: relative;
  background: #FF6B9D;
  border-bottom: var(--outline-xl);
  padding: 48px 48px 80px;
  overflow: hidden;
}

.ct-hero-stripes {
  position: absolute;
  inset: 0;
  background: repeating-linear-gradient(
    -45deg,
    transparent,
    transparent 20px,
    rgba(255,255,255,0.08) 20px,
    rgba(255,255,255,0.08) 40px
  );
}

.ct-hero-cloud {
  position: absolute;
  font-size: 80px;
  opacity: 0.18;
  user-select: none;
  animation: float 4s ease-in-out infinite;
}
.ct-hero-cloud:nth-child(2) { top: 10px; right: 80px; animation-delay: 0.5s; font-size: 60px; }
.ct-hero-cloud:nth-child(3) { bottom: 20px; left: 60px; animation-delay: 1s; font-size: 50px; }
.ct-hero-cloud:nth-child(4) { top: 30px; right: 220px; animation-delay: 2s; font-size: 40px; }

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

.ct-hero-text {}

.ct-title {
  font-family: 'Boogaloo', cursive;
  font-size: clamp(52px, 8vw, 96px);
  color: #fff;
  text-shadow: 5px 5px 0px var(--black);
  line-height: 0.95;
  letter-spacing: -1px;
  margin-bottom: 12px;
  animation: slide-down 0.6s cubic-bezier(0.34,1.56,0.64,1) both;
}

.ct-title span {
  color: var(--yellow);
  display: inline-block;
  animation: wiggle 2s ease-in-out infinite;
}

.ct-subtitle {
  font-size: 18px;
  color: rgba(255,255,255,0.9);
  font-weight: 700;
  max-width: 340px;
  line-height: 1.5;
  background: rgba(0,0,0,0.15);
  border-radius: 16px;
  padding: 10px 16px;
  border: 2px solid rgba(255,255,255,0.3);
}

/* stat bubbles */
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
  animation: pop-in 0.5s cubic-bezier(0.34,1.56,0.64,1) both;
  transition: transform 0.15s, box-shadow 0.15s;
}

.ct-stat-bubble:hover {
  transform: translate(-3px,-3px);
  box-shadow: var(--shadow-lg);
}

.ct-stat-num {
  font-family: 'Boogaloo', cursive;
  font-size: 36px;
  color: var(--black);
  line-height: 1;
}

.ct-stat-label {
  font-size: 11px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #888;
}

/* ── SEARCH PANEL ── */
.ct-search-wrap {
  max-width: 1200px;
  margin: -32px auto 0;
  padding: 0 48px;
  position: relative;
  z-index: 10;
  animation: slide-down 0.5s 0.2s both;
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
}

.ct-search-emoji {
  font-size: 28px;
  animation: float 3s ease-in-out infinite;
  flex-shrink: 0;
}

.ct-search-input {
  flex: 1;
  background: #fff;
  border: var(--outline);
  border-radius: 14px;
  padding: 12px 16px;
  font-family: 'Nunito', sans-serif;
  font-size: 16px;
  font-weight: 700;
  color: var(--black);
  outline: none;
  box-shadow: var(--shadow-sm);
  transition: transform 0.1s, box-shadow 0.1s;
}

.ct-search-input:focus {
  transform: translate(-2px,-2px);
  box-shadow: var(--shadow);
  animation: rainbow-border 3s linear infinite;
}

.ct-search-input::placeholder { color: #bbb; }

.ct-clear-btn {
  background: var(--red);
  border: var(--outline);
  border-radius: 50%;
  width: 36px; height: 36px;
  font-size: 16px;
  cursor: pointer;
  box-shadow: var(--shadow-sm);
  display: flex; align-items: center; justify-content: center;
  font-weight: 900;
  color: #fff;
  transition: transform 0.1s, box-shadow 0.1s;
  flex-shrink: 0;
}

.ct-clear-btn:hover {
  transform: translate(-2px,-2px) rotate(15deg);
  box-shadow: var(--shadow);
}

.ct-refresh-btn {
  background: var(--black);
  color: var(--yellow);
  border: var(--outline);
  border-radius: 16px;
  padding: 12px 22px;
  font-family: 'Boogaloo', cursive;
  font-size: 20px;
  cursor: pointer;
  box-shadow: var(--shadow);
  white-space: nowrap;
  transition: transform 0.1s, box-shadow 0.1s;
  display: flex; align-items: center; gap: 8px;
  flex-shrink: 0;
}

.ct-refresh-btn:hover:not(:disabled) {
  transform: translate(-3px,-3px);
  box-shadow: var(--shadow-lg);
}

.ct-refresh-btn:disabled { opacity: 0.5; cursor: not-allowed; }

.ct-refresh-icon {
  display: inline-block;
  font-size: 20px;
}
.ct-refresh-btn:not(:disabled) .ct-refresh-icon {
  animation: star-spin 3s linear infinite;
}

/* ── BODY ── */
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
  color: var(--black);
}

.ct-results-pill {
  background: var(--black);
  color: var(--yellow);
  border-radius: 100px;
  padding: 4px 14px;
  font-family: 'Boogaloo', cursive;
  font-size: 20px;
}

/* ── GRID ── */
.ct-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 28px;
}

/* ── CARD ── */
.ct-card {
  background: #fff;
  border: var(--outline-thick);
  border-radius: 28px;
  overflow: hidden;
  box-shadow: var(--shadow-lg);
  cursor: pointer;
  animation: pop-in 0.5s cubic-bezier(0.34,1.56,0.64,1) both;
  transition: transform 0.15s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.15s;
  position: relative;
}

.ct-card:hover {
  transform: translate(-5px,-5px) rotate(-1deg);
  box-shadow: 12px 12px 0px var(--black);
}

.ct-card:hover .ct-card-emoji {
  animation: boing 0.5s ease;
}

/* card top band */
.ct-card-band {
  height: 100px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: var(--outline-thick);
  overflow: hidden;
}

.ct-card-band-stripes {
  position: absolute;
  inset: 0;
  background: repeating-linear-gradient(
    45deg,
    transparent,
    transparent 10px,
    rgba(255,255,255,0.15) 10px,
    rgba(255,255,255,0.15) 20px
  );
}

.ct-card-emoji {
  font-size: 52px;
  position: relative;
  z-index: 1;
  filter: drop-shadow(3px 3px 0px rgba(0,0,0,0.2));
  transition: transform 0.2s;
}

.ct-card-id {
  position: absolute;
  top: 10px; right: 12px;
  background: rgba(0,0,0,0.25);
  color: #fff;
  font-size: 11px;
  font-weight: 900;
  letter-spacing: 0.1em;
  padding: 3px 10px;
  border-radius: 100px;
  border: 2px solid rgba(255,255,255,0.4);
  z-index: 1;
}

/* avatar circle */
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
  color: var(--black);
  box-shadow: var(--shadow-sm);
  z-index: 2;
}

/* card body */
.ct-card-body {
  padding: 36px 22px 22px;
}

.ct-card-name {
  font-family: 'Boogaloo', cursive;
  font-size: 24px;
  color: var(--black);
  line-height: 1.1;
  margin-bottom: 2px;
}

.ct-card-username {
  font-size: 12px;
  font-weight: 800;
  color: #aaa;
  margin-bottom: 16px;
  display: flex; align-items: center; gap: 4px;
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
  border: 2px solid var(--black);
  display: flex; align-items: center; justify-content: center;
  font-size: 14px;
  flex-shrink: 0;
  box-shadow: 2px 2px 0 var(--black);
}

.ct-field-text {
  color: #555;
  font-size: 13px;
  word-break: break-all;
  line-height: 1.3;
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
  border: 2px solid var(--black);
  border-radius: 100px;
  padding: 3px 12px;
  box-shadow: 2px 2px 0 var(--black);
}

.ct-peek-btn {
  margin-left: auto;
  background: var(--yellow);
  border: 2px solid var(--black);
  border-radius: 12px;
  padding: 5px 14px;
  font-family: 'Boogaloo', cursive;
  font-size: 15px;
  cursor: pointer;
  box-shadow: var(--shadow-sm);
  transition: transform 0.1s, box-shadow 0.1s;
}

.ct-peek-btn:hover {
  transform: translate(-2px,-2px);
  box-shadow: var(--shadow);
}

/* ── LOADER ── */
.ct-loader {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 24px;
  min-height: 340px;
}

.ct-loader-faces {
  display: flex; gap: 16px;
}

.ct-loader-face {
  font-size: 48px;
  animation: boing 1s ease-in-out infinite;
}
.ct-loader-face:nth-child(2) { animation-delay: 0.15s; }
.ct-loader-face:nth-child(3) { animation-delay: 0.3s; }

.ct-loader-text {
  font-family: 'Boogaloo', cursive;
  font-size: 28px;
  color: var(--black);
}

.ct-loader-dots span {
  display: inline-block;
  animation: boing 1s ease-in-out infinite;
}
.ct-loader-dots span:nth-child(2) { animation-delay: 0.2s; }
.ct-loader-dots span:nth-child(3) { animation-delay: 0.4s; }

/* ── EMPTY ── */
.ct-empty {
  text-align: center;
  padding: 80px 20px;
}

.ct-empty-emoji {
  font-size: 72px;
  animation: float 3s ease-in-out infinite;
  display: block;
  margin-bottom: 16px;
}

.ct-empty-text {
  font-family: 'Boogaloo', cursive;
  font-size: 32px;
  color: var(--black);
  margin-bottom: 8px;
}

.ct-empty-sub {
  font-size: 16px;
  font-weight: 700;
  color: #999;
}

/* ── MODAL OVERLAY ── */
.ct-modal-bg {
  position: fixed; inset: 0;
  background: rgba(26,26,46,0.7);
  display: flex; align-items: center; justify-content: center;
  z-index: 1000;
  padding: 20px;
  animation: bgIn 0.2s ease;
  backdrop-filter: blur(4px);
}

@keyframes bgIn { from { opacity: 0; } to { opacity: 1; } }

.ct-modal {
  background: #fff;
  border: var(--outline-xl);
  border-radius: 32px;
  width: 100%; max-width: 500px;
  overflow: hidden;
  box-shadow: 12px 12px 0px var(--black);
  animation: spin-in 0.4s cubic-bezier(0.34,1.56,0.64,1);
  position: relative;
}

/* modal confetti header */
.ct-modal-band {
  height: 160px;
  position: relative;
  display: flex; align-items: center; justify-content: center;
  border-bottom: var(--outline-xl);
  overflow: hidden;
  flex-direction: column;
  gap: 8px;
}

.ct-modal-band-stripes {
  position: absolute;
  inset: 0;
  background: repeating-linear-gradient(
    -45deg,
    transparent,
    transparent 16px,
    rgba(255,255,255,0.15) 16px,
    rgba(255,255,255,0.15) 32px
  );
}

.ct-modal-emoji {
  font-size: 64px;
  position: relative;
  z-index: 1;
  filter: drop-shadow(4px 4px 0px rgba(0,0,0,0.25));
  animation: float 3s ease-in-out infinite;
}

.ct-modal-hat {
  font-size: 28px;
  position: relative;
  z-index: 1;
  animation: wiggle 2s ease-in-out infinite;
}

.ct-modal-close {
  position: absolute;
  top: 14px; right: 14px;
  background: #fff;
  border: var(--outline);
  border-radius: 50%;
  width: 36px; height: 36px;
  font-size: 18px;
  cursor: pointer;
  box-shadow: var(--shadow-sm);
  display: flex; align-items: center; justify-content: center;
  z-index: 2;
  transition: transform 0.15s;
  font-weight: 900;
}

.ct-modal-close:hover { transform: rotate(90deg) scale(1.1); }

.ct-modal-body { padding: 28px 32px 32px; }

.ct-modal-name {
  font-family: 'Boogaloo', cursive;
  font-size: 32px;
  color: var(--black);
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
  transition: transform 0.15s, box-shadow 0.15s;
}

.ct-modal-field:hover {
  transform: translate(-2px,-2px);
  box-shadow: var(--shadow);
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
  color: var(--black);
  line-height: 1.4;
  word-break: break-word;
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
  transition: transform 0.1s, box-shadow 0.1s;
  display: flex; align-items: center; justify-content: center; gap: 10px;
}

.ct-modal-close-btn:hover {
  transform: translate(-3px,-3px);
  box-shadow: var(--shadow-lg);
}

/* ── DECORATIVE FLOATERS ── */
.ct-floater {
  position: fixed;
  pointer-events: none;
  font-size: 32px;
  animation: float 6s ease-in-out infinite;
  opacity: 0.15;
  z-index: 0;
  user-select: none;
}

@media (max-width: 700px) {
  .ct-hero { padding: 36px 20px 64px; }
  .ct-search-wrap { padding: 0 16px; }
  .ct-body { padding: 0 16px; }
  .ct-modal-fields { grid-template-columns: 1fr; }
  .ct-modal-field.full { grid-column: span 1; }
}
`;

function getInitials(name) {
  return name.split(" ").map(w => w[0]).join("").toUpperCase();
}

const FLOATERS = ["⭐", "💫", "🌈", "✨", "🎈", "🌟", "🎉", "🦋", "🌸", "🍭"];

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
      if (!res.ok) throw new Error("Oops! Something went wrong 😵");
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

  const getToon = (id) => TOONS[(id - 1) % TOONS.length];

  return (
    <div className="ct-root">
      <style>{css}</style>

      {/* background floaters */}
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
        >{f}</div>
      ))}

      {/* ── HERO ── */}
      <div className="ct-hero">
        <div className="ct-hero-stripes" />
        <div className="ct-hero-cloud">☁️</div>
        <div className="ct-hero-cloud">☁️</div>
        <div className="ct-hero-cloud">⛅</div>
        <div className="ct-hero-cloud">☁️</div>

        <div className="ct-hero-inner">
          <div className="ct-hero-text">
            <div className="ct-title">
              TOON<br /><span>SQUAD!</span>
            </div>
            <p className="ct-subtitle">🎉 Your favourite cartoon crew — all in one place!</p>
          </div>

          <div className="ct-stat-row">
            {[
              { num: users.length || "?", label: "Characters", delay: "0s" },
              { num: filtered.length, label: "On Screen", delay: "0.1s" },
              { num: new Set(users.map(u => u.company?.name)).size || "?", label: "Studios", delay: "0.2s" },
            ].map((s, i) => (
              <div className="ct-stat-bubble" key={i} style={{ animationDelay: s.delay }}>
                <div className="ct-stat-num">{s.num}</div>
                <div className="ct-stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── SEARCH ── */}
      <div className="ct-search-wrap">
        <div className="ct-search-panel">
          <span className="ct-search-emoji">🔍</span>
          <input
            className="ct-search-input"
            type="text"
            placeholder="Find your fave character..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          {search && (
            <button className="ct-clear-btn" onClick={() => setSearch("")}>✕</button>
          )}
          <button
            className="ct-refresh-btn"
            onClick={() => fetchUsers(true)}
            disabled={isRefreshing}
          >
            <span className="ct-refresh-icon">⭐</span>
            {isRefreshing ? "Loading..." : "Reload!"}
          </button>
        </div>
      </div>

      {/* ── BODY ── */}
      <div className="ct-body">
        {!loading && !error && (
          <div className="ct-results-bar">
            <span className="ct-results-pill">{filtered.length}</span>
            characters found
            {search && <> matching <strong>"{search}"</strong></>}
            🎬
          </div>
        )}

        {loading ? (
          <div className="ct-loader">
            <div className="ct-loader-faces">
              <span className="ct-loader-face">🐱</span>
              <span className="ct-loader-face">🦊</span>
              <span className="ct-loader-face">🐸</span>
            </div>
            <div className="ct-loader-text">
              Loading cast
              <span className="ct-loader-dots">
                <span>.</span><span>.</span><span>.</span>
              </span>
            </div>
          </div>
        ) : error ? (
          <div className="ct-empty">
            <span className="ct-empty-emoji">😵</span>
            <p className="ct-empty-text">Uh oh, something broke!</p>
            <p className="ct-empty-sub">{error}</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="ct-empty">
            <span className="ct-empty-emoji">🔭</span>
            <p className="ct-empty-text">No characters found!</p>
            <p className="ct-empty-sub">Try searching for someone else 🤔</p>
          </div>
        ) : (
          <div className="ct-grid">
            {filtered.map((user, i) => {
              const toon = getToon(user.id);
              return (
                <div
                  key={user.id}
                  className="ct-card"
                  style={{ animationDelay: `${i * 60}ms` }}
                  onClick={() => setSelectedUser(user)}
                >
                  {/* band */}
                  <div className="ct-card-band" style={{ background: toon.bg }}>
                    <div className="ct-card-band-stripes" />
                    <span className="ct-card-emoji">{toon.emoji}</span>
                    <div className="ct-card-id">#{String(user.id).padStart(2, "0")}</div>
                    <div className="ct-avatar" style={{ borderColor: toon.bg, color: toon.bg }}>
                      {getInitials(user.name)}
                    </div>
                  </div>

                  {/* body */}
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

      {/* ── MODAL ── */}
      {selectedUser && (() => {
        const toon = getToon(selectedUser.id);
        return (
          <div className="ct-modal-bg" onClick={() => setSelectedUser(null)}>
            <div className="ct-modal" onClick={e => e.stopPropagation()}>
              <div className="ct-modal-band" style={{ background: toon.bg }}>
                <div className="ct-modal-band-stripes" />
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
                      {selectedUser.address.street}, {selectedUser.address.suite},<br />
                      {selectedUser.address.city} — {selectedUser.address.zipcode}
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