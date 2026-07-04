import React from 'react';

// 1. Life Insurance: Purple Umbrella and Heart
const LifeGraphic = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="umbrellaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#A855F7" />
        <stop offset="100%" stopColor="#7E22CE" />
      </linearGradient>
      <linearGradient id="heartGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#EF4444" />
        <stop offset="100%" stopColor="#B91C1C" />
      </linearGradient>
    </defs>
    <circle cx="50" cy="50" r="45" fill="#7E22CE" fillOpacity="0.05" />
    {/* Heart under umbrella */}
    <path className="animate-svg-pulse" d="M 50 72 C 50 72, 34 58, 34 48 C 34 41, 39 36, 45 36 C 47.5 36, 49 37.5, 50 39 C 51 37.5, 52.5 36, 55 36 C 61 36, 66 41, 66 48 C 66 58, 50 72, 50 72 Z" fill="url(#heartGrad)" />
    {/* Umbrella Canopy */}
    <path className="animate-svg-float" d="M 15 44 C 15 22, 85 22, 85 44 C 76 40, 68 40, 60 44 C 53 40, 47 40, 40 44 C 32 40, 24 40, 15 44 Z" fill="url(#umbrellaGrad)" />
    {/* Umbrella Shaft & Handle */}
    <path className="animate-svg-float" d="M 50 44 L 50 76 C 50 78.5, 47.5 80, 45 80" stroke="#7E22CE" strokeWidth="3" strokeLinecap="round" />
  </svg>
);

// 2. Health Insurance: Cradled Heart with Cross
const HealthGraphic = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="healthHeartGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#F87171" />
        <stop offset="100%" stopColor="#EF4444" />
      </linearGradient>
    </defs>
    <circle cx="50" cy="50" r="45" fill="#EF4444" fillOpacity="0.05" />
    {/* Heart & Cross */}
    <g className="animate-svg-pulse">
      <path d="M 50 68 C 50 68, 26 50, 26 36 C 26 26, 33 20, 41 20 C 45 20, 48 22, 50 24 C 52 22, 55 20, 59 20 C 67 20, 74 26, 74 36 C 74 50, 50 68, 50 68 Z" fill="url(#healthHeartGrad)" />
      {/* White Cross */}
      <rect x="46" y="28" width="8" height="16" rx="2" fill="white" />
      <rect x="42" y="32" width="16" height="8" rx="2" fill="white" />
    </g>
    {/* Cradling Hands */}
    <path className="animate-svg-sway" d="M 22 55 C 22 75, 45 85, 50 85 C 55 85, 78 75, 78 55" stroke="#F87171" strokeWidth="4.5" strokeLinecap="round" />
  </svg>
);

// 3. Motor Insurance: White/Blue SUV Front view
const MotorGraphic = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="skyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#38BDF8" />
        <stop offset="100%" stopColor="#0284C7" />
      </linearGradient>
    </defs>
    <circle cx="50" cy="50" r="45" fill="#0284C7" fillOpacity="0.05" />
    {/* Sky outline */}
    <path className="animate-svg-wave" d="M 12 65 C 22 45, 78 45, 88 65" stroke="url(#skyGrad)" strokeWidth="1.5" strokeDasharray="3 3" />
    {/* Car body & tires with road vibration */}
    <g className="animate-svg-float" style={{ animationDuration: '2s' }}>
      {/* Tires */}
      <rect x="22" y="65" width="12" height="15" rx="3" fill="#1E293B" />
      <rect x="66" y="65" width="12" height="15" rx="3" fill="#1E293B" />
      {/* Car body shadow */}
      <ellipse cx="50" cy="76" rx="34" ry="5" fill="#0F172A" fillOpacity="0.3" />
      {/* Windshield */}
      <path d="M 30 42 L 36 28 C 37 26, 63 26, 64 28 L 70 42 Z" fill="#38BDF8" fillOpacity="0.4" stroke="#0284C7" strokeWidth="2.5" />
      {/* Main body */}
      <path d="M 18 64 C 18 52, 22 42, 30 42 L 70 42 C 78 42, 82 52, 82 64 C 82 68, 78 69, 70 69 L 30 69 C 22 69, 18 68, 18 64 Z" fill="#F8FAFC" stroke="#64748B" strokeWidth="2" />
      {/* Front Grille */}
      <rect x="36" y="52" width="28" height="12" rx="2" fill="#1E293B" />
      <line x1="43" y1="52" x2="43" y2="64" stroke="#475569" strokeWidth="1.5" />
      <line x1="50" y1="52" x2="50" y2="64" stroke="#475569" strokeWidth="1.5" />
      <line x1="57" y1="52" x2="57" y2="64" stroke="#475569" strokeWidth="1.5" />
      {/* Headlights */}
      <circle className="animate-svg-pulse" cx="26" cy="51" r="5" fill="#FDE047" stroke="#E2E8F0" strokeWidth="1.5" />
      <circle className="animate-svg-pulse" cx="74" cy="51" r="5" fill="#FDE047" stroke="#E2E8F0" strokeWidth="1.5" />
    </g>
  </svg>
);

// 4. Fire & Burglary: Shield and House
const FireGraphic = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="orangeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FB923C" />
        <stop offset="100%" stopColor="#EA580C" />
      </linearGradient>
    </defs>
    <circle cx="50" cy="50" r="45" fill="#EA580C" fillOpacity="0.05" />
    {/* Shield */}
    <path className="animate-svg-sway" d="M 22 25 L 50 15 L 78 25 V 50 C 78 68, 62 82, 50 86 C 38 82, 22 68, 22 50 V 25 Z" fill="url(#orangeGrad)" fillOpacity="0.15" stroke="url(#orangeGrad)" strokeWidth="3" />
    {/* House with pulse lock */}
    <g className="animate-svg-pulse">
      <path d="M 35 55 V 70 H 65 V 55 L 50 42 L 35 55 Z" fill="none" stroke="#EA580C" strokeWidth="3.5" strokeLinejoin="round" />
      <circle cx="50" cy="58" r="4" fill="#EA580C" />
      <path d="M 50 62 V 66" stroke="#EA580C" strokeWidth="3.5" strokeLinecap="round" />
    </g>
  </svg>
);

// 5. Marine Insurance: Ship Cargo
const MarineGraphic = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="45" fill="#0D9488" fillOpacity="0.05" />
    {/* Waves */}
    <path className="animate-svg-wave" d="M 10 75 Q 25 72, 40 75 T 70 75 T 90 75" stroke="#0D9488" strokeWidth="3" strokeLinecap="round" />
    <path className="animate-svg-wave" d="M 15 82 Q 30 80, 45 82 T 75 82 T 85 82" stroke="#0D9488" strokeWidth="1.5" strokeLinecap="round" style={{ animationDelay: '1s' }} />
    {/* Ship Hull and Cargo swaying */}
    <g className="animate-svg-sway">
      <path d="M 20 54 L 25 68 H 75 L 80 54 Z" fill="#0D9488" stroke="#115E59" strokeWidth="2.5" />
      {/* Cargo boxes */}
      <rect x="30" y="40" width="10" height="14" fill="#0D9488" opacity="0.8" stroke="#115E59" strokeWidth="1.5" />
      <rect x="42" y="32" width="12" height="22" fill="#0D9488" opacity="0.6" stroke="#115E59" strokeWidth="1.5" />
      <rect x="56" y="38" width="14" height="16" fill="#0D9488" opacity="0.9" stroke="#115E59" strokeWidth="1.5" />
    </g>
  </svg>
);

// 6. Workmen's Compensation: Safety Helmet
const WorkmenGraphic = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FBBF24" />
        <stop offset="100%" stopColor="#D97706" />
      </linearGradient>
    </defs>
    <circle cx="50" cy="50" r="45" fill="#D97706" fillOpacity="0.05" />
    {/* Floating Helmet */}
    <g className="animate-svg-float">
      {/* Helmet dome */}
      <path d="M 20 55 C 20 30, 80 30, 80 55 Z" fill="url(#goldGrad)" stroke="#B45309" strokeWidth="2.5" />
      {/* Helmet Brim */}
      <path d="M 12 55 C 12 55, 30 60, 50 60 C 70 60, 88 55, 88 55" stroke="#B45309" strokeWidth="4" strokeLinecap="round" />
      {/* Ribs on helmet */}
      <path d="M 50 25 V 55" stroke="#B45309" strokeWidth="3" strokeLinecap="round" />
      <path d="M 40 28 C 42 38, 42 48, 40 55" stroke="#B45309" strokeWidth="2" strokeLinecap="round" />
      <path d="M 60 28 C 58 38, 58 48, 60 55" stroke="#B45309" strokeWidth="2" strokeLinecap="round" />
    </g>
  </svg>
);

// 7. Group Health: Collective shield
const GroupHealthGraphic = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="45" fill="#2563EB" fillOpacity="0.05" />
    {/* Background silhouettes floating */}
    <g className="animate-svg-float">
      <circle cx="36" cy="42" r="10" fill="#93C5FD" stroke="#2563EB" strokeWidth="1.5" />
      <path d="M 24 65 C 24 55, 48 55, 48 65" fill="#93C5FD" stroke="#2563EB" strokeWidth="1.5" />
      
      <circle cx="64" cy="42" r="10" fill="#93C5FD" stroke="#2563EB" strokeWidth="1.5" />
      <path d="M 52 65 C 52 55, 76 55, 76 65" fill="#93C5FD" stroke="#2563EB" strokeWidth="1.5" />
    </g>
    
    {/* Foreground central figure pulsing */}
    <g className="animate-svg-pulse">
      <circle cx="50" cy="36" r="11" fill="#2563EB" />
      <path d="M 34 60 C 34 48, 66 48, 66 60 V 65 H 34 V 60 Z" fill="#2563EB" />
      {/* Shield outline */}
      <path d="M 50 56 L 64 62 V 72 C 64 78, 50 82, 50 82 C 50 82, 36 78, 36 72 V 62 Z" fill="#F8FAFC" stroke="#2563EB" strokeWidth="2" />
      <path d="M 46 68 L 49 71 L 55 65" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </g>
  </svg>
);

// 8. General Plus/More
const MoreGraphic = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="45" fill="#475569" fillOpacity="0.05" />
    {/* Floating cubes at different speeds */}
    <rect className="animate-svg-float" x="22" y="22" width="20" height="20" rx="4" fill="#64748B" opacity="0.6" />
    <rect className="animate-svg-float-delayed" x="58" y="22" width="20" height="20" rx="4" fill="#475569" />
    <rect className="animate-svg-sway" x="22" y="58" width="20" height="20" rx="4" fill="#94A3B8" />
    {/* Plus */}
    <path className="animate-svg-pulse" d="M 68 58 V 78 M 58 68 H 78" stroke="#475569" strokeWidth="4" strokeLinecap="round" />
  </svg>
);

// 9. KYC: Document clipboard with checkmarks
const KycGraphic = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="45" fill="#10B981" fillOpacity="0.05" />
    <rect x="28" y="20" width="44" height="60" rx="5" fill="#F8FAFC" stroke="#10B981" strokeWidth="2.5" />
    {/* Lines */}
    <line x1="38" y1="36" x2="62" y2="36" stroke="#64748B" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="38" y1="46" x2="54" y2="46" stroke="#64748B" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="38" y1="56" x2="58" y2="56" stroke="#64748B" strokeWidth="2.5" strokeLinecap="round" />
    {/* Shield stamp pulsing */}
    <path className="animate-svg-pulse" d="M 56 62 L 66 65 V 71 C 66 74, 56 76, 56 76 C 56 76, 46 74, 46 71 V 65 Z" fill="#10B981" fillOpacity="0.2" stroke="#10B981" strokeWidth="1.5" />
    {/* Clipboard clasp */}
    <path d="M 42 20 V 16 H 58 V 20 Z" fill="#334155" />
  </svg>
);

// 10. Risk Profiling: Target Board and Dart
const RiskGraphic = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="45" fill="#EF4444" fillOpacity="0.05" />
    {/* Target rings swaying */}
    <g className="animate-svg-sway">
      <circle cx="46" cy="54" r="32" stroke="#EF4444" strokeWidth="3" fill="#FEE2E2" />
      <circle cx="46" cy="54" r="22" stroke="#EF4444" strokeWidth="3" fill="#FDE047" />
      <circle cx="46" cy="54" r="12" stroke="#EF4444" strokeWidth="3" fill="#EF4444" />
    </g>
    {/* Dart vibrating slightly */}
    <g className="animate-svg-pulse">
      <path d="M 78 22 L 48 52" stroke="#1E293B" strokeWidth="3.5" strokeLinecap="round" />
      {/* Dart fins */}
      <polygon points="74,18 82,18 82,26" fill="#EF4444" />
      <polygon points="78,22 86,22 86,30" fill="#EF4444" />
      {/* Dart tip */}
      <circle cx="46" cy="54" r="3" fill="#1E293B" />
    </g>
  </svg>
);

// 11. Fund Selection: Chart and Magnifying glass
const SelectionGraphic = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="45" fill="#F59E0B" fillOpacity="0.05" />
    {/* Mini Chart */}
    <path d="M 15 70 L 35 55 L 50 62 L 75 35 L 85 45" stroke="#F59E0B" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="75" cy="35" r="4" fill="#F59E0B" />
    {/* Magnifying Glass floating */}
    <g className="animate-svg-sway">
      <circle cx="50" cy="45" r="14" fill="#F8FAFC" stroke="#1E293B" strokeWidth="3" />
      <line x1="60" y1="55" x2="72" y2="67" stroke="#1E293B" strokeWidth="4.5" strokeLinecap="round" />
    </g>
  </svg>
);

// 12. Execution: Rocket Launch
const ExecutionGraphic = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="45" fill="#3B82F6" fillOpacity="0.05" />
    {/* Cloud/Smoke */}
    <circle cx="35" cy="74" r="10" fill="#E2E8F0" />
    <circle cx="50" cy="78" r="12" fill="#CBD5E1" />
    <circle cx="65" cy="74" r="10" fill="#E2E8F0" />
    {/* Fire flame flickering */}
    <g className="animate-svg-flicker">
      <path d="M 44 60 L 50 78 L 56 60 Z" fill="#F59E0B" />
      <path d="M 47 60 L 50 72 L 53 60 Z" fill="#EF4444" />
    </g>
    {/* Rocket body bobbing */}
    <g className="animate-svg-float" style={{ animationDuration: '2s' }}>
      <rect x="44" y="24" width="12" height="36" rx="6" fill="#F8FAFC" stroke="#3B82F6" strokeWidth="2.5" />
      <path d="M 44 32 L 50 14 L 56 32 Z" fill="#EF4444" />
      {/* Rocket Fins */}
      <path d="M 44 50 L 38 60 H 44 Z" fill="#3B82F6" />
      <path d="M 56 50 L 62 60 H 56 Z" fill="#3B82F6" />
    </g>
  </svg>
);

// Accident Insurance: Shield with medical cross and bandages/splint
const AccidentGraphic = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="accidentGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FBBF24" />
        <stop offset="100%" stopColor="#EF4444" />
      </linearGradient>
    </defs>
    <circle cx="50" cy="50" r="45" fill="#EF4444" fillOpacity="0.05" />
    {/* Shield */}
    <path className="animate-svg-sway" d="M 24 25 L 50 15 L 76 25 V 48 C 76 66, 60 80, 50 84 C 40 80, 24 66, 24 48 V 25 Z" fill="url(#accidentGrad)" fillOpacity="0.15" stroke="url(#accidentGrad)" strokeWidth="3" />
    {/* Bandage Cross */}
    <g className="animate-svg-pulse">
      {/* Diagonally crossing bandages */}
      <rect x="44" y="24" width="12" height="40" rx="4" transform="rotate(45 50 44)" fill="#EF4444" stroke="#FEE2E2" strokeWidth="1" />
      <rect x="44" y="24" width="12" height="40" rx="4" transform="rotate(-45 50 44)" fill="#EF4444" stroke="#FEE2E2" strokeWidth="1" />
      {/* Center dot/cross */}
      <circle cx="50" cy="44" r="3" fill="white" />
    </g>
  </svg>
);

// 13. Portfolio Reviews: Sync Circle and Chart
const ReviewsGraphic = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="45" fill="#8B5CF6" fillOpacity="0.05" />
    {/* Chart */}
    <path d="M 32 60 V 50 M 44 60 V 42 M 56 60 V 32 M 68 60 V 46" stroke="#C084FC" strokeWidth="4.5" strokeLinecap="round" />
    {/* Sync Loop Arrows spinning */}
    <g className="animate-svg-spin">
      <path d="M 50 15 C 68 15, 82 28, 82 45 C 82 48, 81 52, 79 55" stroke="#8B5CF6" strokeWidth="3" strokeLinecap="round" />
      <path d="M 50 85 C 32 85, 18 72, 18 55 C 18 52, 19 48, 21 45" stroke="#8B5CF6" strokeWidth="3" strokeLinecap="round" />
      <polygon points="46,10 54,15 46,20" fill="#8B5CF6" />
      <polygon points="54,90 46,85 54,80" fill="#8B5CF6" />
    </g>
  </svg>
);

// 14. Switches: Dual crossing arrows
const SwitchesGraphic = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="45" fill="#14B8A6" fillOpacity="0.05" />
    {/* Crossing arrows swaying */}
    <g className="animate-svg-sway">
      {/* Arrow 1 */}
      <path d="M 22 35 H 68 C 76 35, 78 65, 68 65 L 56 65" stroke="#14B8A6" strokeWidth="4.5" strokeLinecap="round" fill="none" />
      <polygon points="58,60 50,65 58,70" fill="#14B8A6" />
      {/* Arrow 2 */}
      <path d="M 78 65 H 32 C 24 65, 22 35, 32 35 L 44 35" stroke="#0F766E" strokeWidth="3.5" strokeLinecap="round" fill="none" />
      <polygon points="42,30 50,35 42,40" fill="#0F766E" />
    </g>
  </svg>
);

// 15. Redemption: Money Bag and Coins
const RedemptionGraphic = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="45" fill="#EAB308" fillOpacity="0.05" />
    {/* Floating Coins */}
    <g className="animate-svg-float-delayed">
      <circle cx="68" cy="65" r="8" fill="#FDE047" stroke="#CA8A04" strokeWidth="1.5" />
      <circle cx="64" cy="74" r="8" fill="#FDE047" stroke="#CA8A04" strokeWidth="1.5" />
    </g>
    {/* Money Bag pulsing */}
    <path className="animate-svg-pulse" d="M 32 68 C 32 50, 36 38, 48 38 C 45 35, 42 35, 42 32 C 42 26, 58 26, 58 32 C 58 35, 55 35, 52 38 C 64 38, 68 50, 68 68 C 68 76, 58 78, 50 78 C 42 78, 32 76, 32 68 Z" fill="#EAB308" stroke="#CA8A04" strokeWidth="2.5" />
    {/* Tie ribbon */}
    <path d="M 44 38 Q 50 42, 56 38" stroke="#CA8A04" strokeWidth="3" />
    {/* Rupee Symbol */}
    <path d="M 46 48 H 54 M 46 53 H 54 M 49 48 C 54 48, 54 58, 49 58 L 46 58 M 49 58 L 54 66" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// 16. Waiting Period: Hourglass
const WaitingGraphic = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="45" fill="#6366F1" fillOpacity="0.05" />
    {/* Hourglass body swaying */}
    <g className="animate-svg-sway">
      <path d="M 30 20 H 70 L 64 34 L 50 48 L 36 34 Z" fill="#E0E7FF" stroke="#6366F1" strokeWidth="3" strokeLinejoin="round" />
      <path d="M 30 80 H 70 L 64 66 L 50 52 L 36 66 Z" fill="#E0E7FF" stroke="#6366F1" strokeWidth="3" strokeLinejoin="round" />
      {/* Sand in top */}
      <polygon points="40,30 60,30 55,42 45,42" fill="#6366F1" />
      {/* Sand in bottom */}
      <path d="M 44 68 L 56 68 L 60 76 H 40 Z" fill="#6366F1" />
    </g>
    {/* Sand stream dripping */}
    <line className="animate-svg-pulse" x1="50" y1="42" x2="50" y2="68" stroke="#6366F1" strokeWidth="2" strokeDasharray="3 3" />
  </svg>
);

// 17. Pre-existing Condition: EKG Clipboard
const PreExistingGraphic = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="45" fill="#EF4444" fillOpacity="0.05" />
    {/* Clipboard */}
    <rect x="28" y="20" width="44" height="60" rx="5" fill="#F8FAFC" stroke="#EF4444" strokeWidth="2.5" />
    {/* EKG pulse wave drawing continuously */}
    <path className="animate-svg-ekg" strokeDasharray="100" strokeDashoffset="100" d="M 34 50 H 42 L 45 36 L 49 64 L 52 46 L 55 53 L 58 50 H 66" stroke="#EF4444" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    {/* Clip */}
    <path d="M 42 20 V 16 H 58 V 20 Z" fill="#334155" />
  </svg>
);

// 18. Cashless Hospital: Networked Medical building
const CashlessGraphic = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="45" fill="#10B981" fillOpacity="0.05" />
    {/* Hospital building */}
    <rect x="30" y="32" width="40" height="48" rx="4" fill="#ECFDF5" stroke="#10B981" strokeWidth="2.5" />
    <rect x="42" y="20" width="16" height="12" rx="2" fill="#ECFDF5" stroke="#10B981" strokeWidth="2.5" />
    {/* Medical Cross pulsing */}
    <path className="animate-svg-pulse" d="M 50 23 V 29 M 47 26 H 53" stroke="#EF4444" strokeWidth="2.5" strokeLinecap="round" />
    {/* Windows */}
    <rect x="36" y="38" width="8" height="8" rx="1" fill="#D1FAE5" />
    <rect x="56" y="38" width="8" height="8" rx="1" fill="#D1FAE5" />
    <rect x="36" y="52" width="8" height="8" rx="1" fill="#D1FAE5" />
    <rect x="56" y="52" width="8" height="8" rx="1" fill="#D1FAE5" />
    {/* Sliding doors */}
    <rect x="45" y="66" width="10" height="14" fill="#334155" />
  </svg>
);

// 19. Age & Sum Fit: Balance Scale
const FitGraphic = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="45" fill="#F59E0B" fillOpacity="0.05" />
    {/* Stand */}
    <path d="M 50 25 V 72 M 35 72 H 65 M 50 25 H 30 M 50 25 H 70" stroke="#1E293B" strokeWidth="3" strokeLinecap="round" />
    {/* Scale swaying */}
    <g className="animate-svg-sway">
      {/* Scale Left */}
      <path d="M 30 25 L 20 50 H 40 L 30 25" stroke="#F59E0B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="#FEF3C7" />
      <circle cx="30" cy="56" r="4" fill="#D97706" />
      {/* Scale Right */}
      <path d="M 70 25 L 60 50 H 80 L 70 25" stroke="#F59E0B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="#FEF3C7" />
      <rect x="67" y="52" width="6" height="8" fill="#1E293B" />
    </g>
  </svg>
);

// 20. Portability: Globe with suitcase/arrows
const PortabilityGraphic = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="45" fill="#06B6D4" fillOpacity="0.05" />
    {/* Globe Grid lines */}
    <circle cx="46" cy="52" r="24" stroke="#06B6D4" strokeWidth="2.5" />
    <path d="M 22 52 H 70" stroke="#06B6D4" strokeWidth="1.5" />
    <path d="M 46 28 C 52 35, 52 69, 46 76" stroke="#06B6D4" strokeWidth="1.5" fill="none" />
    <path d="M 46 28 C 40 35, 40 69, 46 76" stroke="#06B6D4" strokeWidth="1.5" fill="none" />
    {/* Suitcase floating */}
    <rect className="animate-svg-float" x="54" y="44" width="22" height="18" rx="3" fill="#F8FAFC" stroke="#0891B2" strokeWidth="2" />
    <path className="animate-svg-float" d="M 61 44 V 40 H 69 V 44" stroke="#0891B2" strokeWidth="2" strokeLinecap="round" />
    {/* Dynamic airplane loop arrow spinning */}
    <g className="animate-svg-spin">
      <path d="M 46 22 A 32 32 0 0 1 76 40" stroke="#0891B2" strokeWidth="2.5" strokeLinecap="round" />
      <polygon points="72,40 78,44 80,36" fill="#0891B2" />
    </g>
  </svg>
);

// 21. Step 1: Lifestyle / House with Coffee
const Step1Graphic = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="45" fill="#3B82F6" fillOpacity="0.05" />
    {/* Cozy House floating */}
    <path className="animate-svg-float" d="M 20 54 L 46 32 L 72 54 V 76 H 20 Z" fill="#DBEAFE" stroke="#3B82F6" strokeWidth="2.5" strokeLinejoin="round" />
    <rect className="animate-svg-float" x="40" y="56" width="12" height="20" fill="#3B82F6" />
    <circle className="animate-svg-float" cx="48" cy="66" r="1.5" fill="white" />
    {/* Coffee Cup / Table with rising steam */}
    <path d="M 68 76 H 88" stroke="#1E293B" strokeWidth="2" />
    <g className="animate-svg-pulse">
      <rect x="72" y="64" width="12" height="12" rx="2" fill="#F8FAFC" stroke="#1E293B" strokeWidth="2" />
      <path d="M 84 67 C 86 67, 87 69, 87 70 C 87 71, 86 73, 84 73" stroke="#1E293B" strokeWidth="2" fill="none" />
    </g>
    {/* Steam lines */}
    <path className="animate-svg-steam" d="M 75 60 Q 77 56, 75 52 T 75 44" stroke="#1E293B" strokeWidth="1.5" strokeLinecap="round" />
    <path className="animate-svg-steam" d="M 80 60 Q 82 56, 80 52 T 80 44" stroke="#1E293B" strokeWidth="1.5" strokeLinecap="round" style={{ animationDelay: '1.2s' }} />
  </svg>
);

// 22. Step 2: Calculator and Coins
const Step2Graphic = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="45" fill="#10B981" fillOpacity="0.05" />
    {/* Coins stack floating */}
    <g className="animate-svg-float">
      <circle cx="34" cy="72" r="12" fill="#E2E8F0" stroke="#10B981" strokeWidth="2" />
      <circle cx="34" cy="64" r="12" fill="#ECFDF5" stroke="#10B981" strokeWidth="2" />
      <circle cx="34" cy="56" r="12" fill="#10B981" fillOpacity="0.2" stroke="#10B981" strokeWidth="2" />
    </g>
    {/* Calculator pulsing */}
    <g className="animate-svg-pulse">
      <rect x="46" y="24" width="34" height="48" rx="4" fill="#F8FAFC" stroke="#1E293B" strokeWidth="2.5" />
      <rect x="52" y="30" width="22" height="10" rx="1" fill="#E2E8F0" stroke="#1E293B" strokeWidth="1.5" />
      {/* Buttons */}
      <circle cx="55" cy="48" r="2.5" fill="#10B981" />
      <circle cx="63" cy="48" r="2.5" fill="#1E293B" />
      <circle cx="71" cy="48" r="2.5" fill="#1E293B" />
      <circle cx="55" cy="56" r="2.5" fill="#1E293B" />
      <circle cx="63" cy="56" r="2.5" fill="#1E293B" />
      <circle cx="71" cy="56" r="2.5" fill="#1E293B" />
      <rect x="52" y="62" width="22" height="4" rx="1" fill="#10B981" />
    </g>
  </svg>
);

// 23. Step 3: Investment Plan / Folder Blueprint
const Step3Graphic = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="45" fill="#F59E0B" fillOpacity="0.05" />
    {/* Blueprint Compass swaying */}
    <g className="animate-svg-sway">
      <path d="M 28 72 L 48 32 L 68 72" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round" />
      <line x1="38" y1="52" x2="58" y2="52" stroke="#F59E0B" strokeWidth="2" />
      <circle cx="48" cy="32" r="3.5" fill="#1E293B" />
    </g>
    {/* Folder and Paper floating */}
    <g className="animate-svg-float">
      <path d="M 32 76 H 82 V 46 H 52 L 46 38 H 32 Z" fill="#FEF3C7" stroke="#D97706" strokeWidth="2.5" strokeLinejoin="round" />
      {/* Paper sticking out */}
      <rect x="42" y="32" width="30" height="20" rx="2" fill="white" stroke="#D97706" strokeWidth="1.5" />
    </g>
  </svg>
);

// 24. Step 4: Annual Reviews / Calendar and checkmark
const Step4Graphic = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="45" fill="#EC4899" fillOpacity="0.05" />
    <rect x="26" y="24" width="48" height="52" rx="6" fill="#F8FAFC" stroke="#EC4899" strokeWidth="2.5" />
    {/* Calendar binder rings */}
    <rect x="34" y="18" width="6" height="10" rx="2" fill="#334155" />
    <rect x="60" y="18" width="6" height="10" rx="2" fill="#334155" />
    {/* Grid of days */}
    <circle cx="36" cy="42" r="3" fill="#E2E8F0" />
    <circle cx="50" cy="42" r="3" fill="#E2E8F0" />
    <circle cx="64" cy="42" r="3" fill="#E2E8F0" />
    <circle cx="36" cy="56" r="3" fill="#E2E8F0" />
    <circle cx="50" cy="56" r="3" fill="#E2E8F0" />
    <circle cx="64" cy="56" r="3" fill="#E2E8F0" />
    {/* Glowing checkmark pulsing */}
    <path className="animate-svg-pulse" d="M 44 68 L 50 74 L 66 56" stroke="#EC4899" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// 25. Step 5: Healthcare / Medical Case
const Step5Graphic = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="45" fill="#EF4444" fillOpacity="0.05" />
    {/* First Aid Box floating */}
    <g className="animate-svg-float">
      <rect x="24" y="32" width="52" height="44" rx="6" fill="#FEE2E2" stroke="#EF4444" strokeWidth="3" />
      {/* Handle */}
      <path d="M 40 32 V 24 H 60 V 32" stroke="#1E293B" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      {/* Clasp */}
      <rect x="46" y="32" width="8" height="6" fill="#1E293B" />
      {/* Red Cross pulsing */}
      <g className="animate-svg-pulse">
        <rect x="46" y="44" width="8" height="20" rx="1.5" fill="#EF4444" />
        <rect x="40" y="50" width="20" height="8" rx="1.5" fill="#EF4444" />
      </g>
    </g>
  </svg>
);

// 26. Beach Bliss / Retirement Lounge (CTA)
const BeachGraphic = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="45" fill="#F59E0B" fillOpacity="0.05" />
    {/* Sun pulsing */}
    <g className="animate-svg-pulse">
      <circle cx="80" cy="28" r="12" fill="#FDE047" fillOpacity="0.4" />
      <circle cx="80" cy="28" r="8" fill="#F59E0B" />
    </g>
    {/* Lounge chair & Umbrella swaying */}
    <g className="animate-svg-sway">
      <path d="M 20 74 L 46 64 L 64 52 L 80 58" stroke="#1E293B" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M 38 78 L 44 65" stroke="#1E293B" strokeWidth="3" strokeLinecap="round" />
      <path d="M 58 72 L 62 53" stroke="#1E293B" strokeWidth="3" strokeLinecap="round" />
      {/* Umbrella */}
      <path d="M 30 76 L 44 32" stroke="#D97706" strokeWidth="2.5" />
      <path d="M 20 32 C 30 20, 58 20, 68 32 Z" fill="#FBBF24" />
    </g>
  </svg>
);

// 27. Start Year: Spring calendar clock
const StartYearGraphic = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="45" fill="#8B5CF6" fillOpacity="0.05" />
    {/* Clock outline */}
    <circle cx="62" cy="62" r="20" stroke="#8B5CF6" strokeWidth="2.5" fill="white" />
    {/* Clock hands spinning */}
    <path className="animate-svg-clock" d="M 62 50 V 62 L 72 65" stroke="#8B5CF6" strokeWidth="2.5" strokeLinecap="round" />
    {/* Calendar floating */}
    <g className="animate-svg-float">
      <rect x="20" y="24" width="36" height="38" rx="4" fill="#F3E8FF" stroke="#A78BFA" strokeWidth="2" />
      <rect x="20" y="24" width="36" height="10" fill="#8B5CF6" />
      <circle cx="28" cy="46" r="3" fill="#8B5CF6" />
    </g>
  </svg>
);

// 28. Spread: Falling row of coins
const SpreadGraphic = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="45" fill="#10B981" fillOpacity="0.05" />
    {/* Grid of 12 month bars representing spread */}
    <line x1="20" y1="72" x2="80" y2="72" stroke="#94A3B8" strokeWidth="2.5" strokeLinecap="round" />
    {/* Spread Coins bouncing */}
    <circle className="animate-svg-float" cx="28" cy="64" r="6" fill="#6EE7B7" stroke="#059669" strokeWidth="1.5" style={{ animationDuration: '2s' }} />
    <circle className="animate-svg-float" cx="42" cy="52" r="6" fill="#34D399" stroke="#059669" strokeWidth="1.5" style={{ animationDuration: '2s', animationDelay: '0.4s' }} />
    <circle className="animate-svg-float" cx="56" cy="44" r="6" fill="#059669" stroke="#047857" strokeWidth="1.5" style={{ animationDuration: '2s', animationDelay: '0.8s' }} />
    <circle className="animate-svg-float" cx="70" cy="32" r="6" fill="#10B981" stroke="#047857" strokeWidth="1.5" style={{ animationDuration: '2s', animationDelay: '1.2s' }} />
  </svg>
);

// 29. Growth: Money Sprout Plant
const GrowthGraphic = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="45" fill="#22C55E" fillOpacity="0.05" />
    {/* Sprout plant swaying */}
    <g className="animate-svg-sway">
      {/* Soil pot */}
      <path d="M 32 78 L 36 64 H 64 L 68 78 Z" fill="#78350F" />
      {/* Stem */}
      <path d="M 50 64 C 50 50, 42 38, 50 24" stroke="#22C55E" strokeWidth="3.5" strokeLinecap="round" fill="none" />
      {/* Leaf 1 (Coin) pulsing */}
      <circle className="animate-svg-pulse" cx="34" cy="44" r="8" fill="#FCD34D" stroke="#D97706" strokeWidth="1.5" />
      <path d="M 44 48 C 38 48, 38 42, 34 44" stroke="#22C55E" strokeWidth="2" fill="none" />
      {/* Leaf 2 */}
      <path d="M 50 34 C 58 34, 62 26, 66 30 C 62 36, 54 36, 50 34 Z" fill="#22C55E" stroke="#15803D" strokeWidth="1.5" />
      {/* Leaf 3 (Coin) pulsing */}
      <circle className="animate-svg-pulse" cx="50" cy="18" r="8" fill="#FCD34D" stroke="#D97706" strokeWidth="1.5" style={{ animationDelay: '0.8s' }} />
    </g>
  </svg>
);

const ServiceCardGraphic = ({ id }) => {
  switch (id) {
    case 'life':
      return <LifeGraphic />;
    case 'health':
      return <HealthGraphic />;
    case 'pre-existing':
      return <PreExistingGraphic />;
    case 'step5':
      return <Step5Graphic />;
    case 'motor':
      return <MotorGraphic />;
    case 'fire':
      return <FireGraphic />;
    case 'marine':
      return <MarineGraphic />;
    case 'workmen':
      return <WorkmenGraphic />;
    case 'group-health':
      return <GroupHealthGraphic />;
    case 'more':
      return <MoreGraphic />;
    case 'kyc':
      return <KycGraphic />;
    case 'step1':
    case 'ret-step1':
      return <Step1Graphic />;
    case 'risk':
      return <RiskGraphic />;
    case 'step2':
    case 'ret-step2':
      return <Step2Graphic />;
    case 'selection':
    case 'selection-elss':
    case 'ret-step3':
      return <SelectionGraphic />;
    case 'execution':
      return <ExecutionGraphic />;
    case 'growth':
    case 'ret-step4':
      return <GrowthGraphic />;
    case 'reviews':
    case 'ret-step6':
      return <ReviewsGraphic />;
    case 'step4':
      return <Step4Graphic />;
    case 'switches':
      return <SwitchesGraphic />;
    case 'redemption':
      return <RedemptionGraphic />;
    case 'ret-step5':
      return <SpreadGraphic />;
    case 'waiting':
      return <WaitingGraphic />;
    case 'cashless':
      return <CashlessGraphic />;
    case 'fit':
      return <FitGraphic />;
    case 'portability':
      return <PortabilityGraphic />;
    case 'step3':
      return <Step3Graphic />;
    case 'cta':
      return <BeachGraphic />;
    case 'start-year':
      return <StartYearGraphic />;
    case 'spread':
      return <SpreadGraphic />;
    case 'accident':
      return <AccidentGraphic />;
    default:
      return <MoreGraphic />;
  }
};

export default ServiceCardGraphic;
