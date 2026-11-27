import React from 'react';

// ==========================================
// 1. PROPERTY ELEVATION ILLUSTRATIONS
// ==========================================

export interface PropertyArtProps {
  theme: 'emerald' | 'ocean' | 'terracotta' | 'obsidian' | string;
  name?: string;
  distanceKm?: number;
  travelTime?: string;
  className?: string;
}

export const PropertyArt: React.FC<PropertyArtProps> = ({
  theme,
  className = 'w-full h-full'
}) => {
  switch (theme) {
    case 'emerald':
      return (
        <svg viewBox="0 0 800 400" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <defs>
            <linearGradient id="skyEmerald" x1="0" y1="0" x2="0" y2="400" gradientUnits="userSpaceOnUse">
              <stop stopColor="#F2F8F5" />
              <stop offset="1" stopColor="#E0EDE6" />
            </linearGradient>
            <pattern id="gridSubtleEm" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#2E6F5E" strokeWidth="0.5" strokeOpacity="0.08" />
            </pattern>
          </defs>
          <rect width="800" height="400" fill="url(#skyEmerald)" />
          <rect width="800" height="400" fill="url(#gridSubtleEm)" />
          <path d="M0 320 Q 200 270, 450 300 T 800 285 L 800 400 L 0 400 Z" fill="#D3E6DC" opacity="0.7" />
          <circle cx="95" cy="310" r="45" fill="#2E6F5E" opacity="0.2" />
          <circle cx="705" cy="305" r="55" fill="#2E6F5E" opacity="0.22" />

          <g transform="translate(185, 75)">
            <rect x="45" y="35" width="340" height="240" rx="3" fill="#FFFFFF" stroke="#141517" strokeWidth="2.5" />
            <polygon points="30,35 400,35 385,15 45,15" fill="#2E6F5E" stroke="#141517" strokeWidth="2.5" />
            <line x1="70" y1="24" x2="360" y2="24" stroke="#FFFFFF" strokeWidth="1.5" strokeDasharray="12 6" />
            <line x1="45" y1="115" x2="385" y2="115" stroke="#141517" strokeWidth="1.5" />
            <line x1="45" y1="195" x2="385" y2="195" stroke="#141517" strokeWidth="1.5" />

            <rect x="70" y="55" width="65" height="45" fill="#E8F4EE" stroke="#141517" strokeWidth="1.5" />
            <rect x="165" y="55" width="100" height="45" fill="#141517" fillOpacity="0.06" stroke="#141517" strokeWidth="1.5" />
            <rect x="295" y="55" width="65" height="45" fill="#E8F4EE" stroke="#141517" strokeWidth="1.5" />

            <rect x="70" y="135" width="80" height="45" fill="#E8F4EE" stroke="#141517" strokeWidth="1.5" />
            <rect x="175" y="135" width="80" height="45" fill="#E8F4EE" stroke="#141517" strokeWidth="1.5" />
            <rect x="280" y="135" width="80" height="45" fill="#E8F4EE" stroke="#141517" strokeWidth="1.5" />
            <line x1="95" y1="135" x2="95" y2="180" stroke="#D95D39" strokeWidth="2" />
            <line x1="200" y1="135" x2="200" y2="180" stroke="#D95D39" strokeWidth="2" />
            <line x1="305" y1="135" x2="305" y2="180" stroke="#D95D39" strokeWidth="2" />

            <rect x="180" y="210" width="70" height="65" fill="#2E6F5E" stroke="#141517" strokeWidth="2" />
            <rect x="70" y="210" width="90" height="65" fill="#E8F4EE" stroke="#141517" strokeWidth="1.5" />
            <rect x="270" y="210" width="90" height="65" fill="#E8F4EE" stroke="#141517" strokeWidth="1.5" />
          </g>
        </svg>
      );

    case 'ocean':
      return (
        <svg viewBox="0 0 800 400" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <defs>
            <linearGradient id="skyOcean" x1="0" y1="0" x2="0" y2="400" gradientUnits="userSpaceOnUse">
              <stop stopColor="#F0F5FA" />
              <stop offset="1" stopColor="#DDEAF5" />
            </linearGradient>
          </defs>
          <rect width="800" height="400" fill="url(#skyOcean)" />
          <path d="M0 335 C 180 320, 320 345, 520 330 C 660 320, 740 338, 800 332 L 800 400 L 0 400 Z" fill="#5B93C7" fillOpacity="0.2" />

          <g transform="translate(165, 70)">
            <rect x="55" y="210" width="360" height="70" fill="#FFFFFF" stroke="#141517" strokeWidth="2.5" />
            <rect x="95" y="115" width="280" height="95" fill="#F8FAFC" stroke="#141517" strokeWidth="2.5" />
            <rect x="120" y="135" width="100" height="55" fill="#E2EDF8" stroke="#141517" strokeWidth="1.5" />
            <rect x="245" y="135" width="105" height="55" fill="#E2EDF8" stroke="#141517" strokeWidth="1.5" />
            <polygon points="135,45 340,45 365,115 110,115" fill="#FFFFFF" stroke="#141517" strokeWidth="2.5" />
            <rect x="155" y="62" width="160" height="38" fill="#E2EDF8" stroke="#141517" strokeWidth="1.5" />
            <line x1="155" y1="90" x2="315" y2="90" stroke="#D95D39" strokeWidth="2" />
            <rect x="195" y="225" width="80" height="55" fill="#141517" />
            <rect x="210" y="235" width="50" height="45" fill="#D95D39" />
          </g>
        </svg>
      );

    case 'terracotta':
      return (
        <svg viewBox="0 0 800 400" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <defs>
            <linearGradient id="skyTerracotta" x1="0" y1="0" x2="0" y2="400" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FBF7F2" />
              <stop offset="1" stopColor="#F5ECE1" />
            </linearGradient>
          </defs>
          <rect width="800" height="400" fill="url(#skyTerracotta)" />
          <path d="M0 320 Q 250 270, 500 305 T 800 285 L 800 400 L 0 400 Z" fill="#E8D9C5" opacity="0.6" />

          <g transform="translate(175, 65)">
            <rect x="45" y="45" width="360" height="240" fill="#FFFFFF" stroke="#141517" strokeWidth="2.5" />
            <rect x="45" y="45" width="24" height="240" fill="#D95D39" stroke="#141517" strokeWidth="1.5" />
            <rect x="213" y="45" width="24" height="240" fill="#D95D39" stroke="#141517" strokeWidth="1.5" />
            <rect x="381" y="45" width="24" height="240" fill="#D95D39" stroke="#141517" strokeWidth="1.5" />

            <path d="M90 105 A 20 20 0 0 1 130 105 L 130 160 L 90 160 Z" fill="#FBF3EC" stroke="#141517" strokeWidth="1.5" />
            <path d="M148 105 A 20 20 0 0 1 188 105 L 188 160 L 148 160 Z" fill="#FBF3EC" stroke="#141517" strokeWidth="1.5" />
            <path d="M262 105 A 20 20 0 0 1 302 105 L 302 160 L 262 160 Z" fill="#FBF3EC" stroke="#141517" strokeWidth="1.5" />
            <path d="M320 105 A 20 20 0 0 1 360 105 L 360 160 L 320 160 Z" fill="#FBF3EC" stroke="#141517" strokeWidth="1.5" />

            <rect x="90" y="190" width="100" height="75" fill="#F7F1EA" stroke="#141517" strokeWidth="1.5" />
            <rect x="260" y="190" width="100" height="75" fill="#F7F1EA" stroke="#141517" strokeWidth="1.5" />
            <polygon points="225,15 170,45 280,45" fill="#FFFFFF" stroke="#141517" strokeWidth="2.5" />
            <circle cx="225" cy="34" r="5" stroke="#D95D39" strokeWidth="1.5" fill="none" />
          </g>
        </svg>
      );

    case 'obsidian':
    default:
      return (
        <svg viewBox="0 0 800 400" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <defs>
            <linearGradient id="skyObsidian" x1="0" y1="0" x2="0" y2="400" gradientUnits="userSpaceOnUse">
              <stop stopColor="#F5F5F7" />
              <stop offset="1" stopColor="#E5E7EB" />
            </linearGradient>
          </defs>
          <rect width="800" height="400" fill="url(#skyObsidian)" />
          <line x1="0" y1="345" x2="800" y2="345" stroke="#141517" strokeWidth="1.5" />

          <g transform="translate(190, 65)">
            <rect x="40" y="30" width="340" height="250" fill="#FFFFFF" stroke="#141517" strokeWidth="2.5" />
            {[0, 1].map((row) =>
              [0, 1, 2, 3].map((col) => (
                <g key={`${row}-${col}`} transform={`translate(${60 + col * 78}, ${50 + row * 80})`}>
                  <rect
                    width="64"
                    height="64"
                    fill={row === 1 && col === 2 ? '#D95D39' : '#141517'}
                    fillOpacity={row === 1 && col === 2 ? 0.9 : 0.05}
                    stroke="#141517"
                    strokeWidth="1.5"
                  />
                  <line x1="12" y1="14" x2="52" y2="14" stroke={row === 1 && col === 2 ? '#FFFFFF' : '#141517'} strokeWidth="1" strokeOpacity="0.45" />
                  <circle cx="32" cy="38" r="7" fill={row === 1 && col === 2 ? '#FFFFFF' : '#2E6F5E'} fillOpacity={row === 1 && col === 2 ? 0.35 : 0.6} />
                </g>
              ))
            )}
            <rect x="60" y="220" width="300" height="45" fill="#141517" />
          </g>
        </svg>
      );
  }
};

// ==========================================
// 2. MITE CAMPUS PROXIMITY CORRIDOR MAP
// ==========================================

export const MiteCorridorMap: React.FC<{ className?: string }> = ({ className = 'w-full h-auto' }) => (
  <svg viewBox="0 0 640 240" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <rect width="640" height="240" rx="12" fill="#FAF8F5" stroke="#E5E0D8" strokeWidth="1.5" />
    <line x1="65" y1="120" x2="575" y2="120" stroke="#141517" strokeWidth="2.5" strokeDasharray="6 4" />

    <g transform="translate(65, 120)">
      <circle r="14" fill="#D95D39" />
      <circle r="22" stroke="#D95D39" strokeWidth="1.5" strokeOpacity="0.35" />
      <text x="0" y="-32" fontFamily="Space Grotesk, monospace" fontSize="10" fontWeight="700" fill="#141517" textAnchor="middle">MITE CAMPUS</text>
      <text x="0" y="34" fontFamily="Space Grotesk, monospace" fontSize="9" fill="#9E3B1E" fontWeight="600" textAnchor="middle">0.0 km</text>
    </g>

    <g transform="translate(175, 120)">
      <circle r="8" fill="#2E6F5E" />
      <text x="0" y="-22" fontFamily="Space Grotesk, monospace" fontSize="9" fontWeight="600" fill="#141517" textAnchor="middle">MITE Hostels (2)</text>
      <text x="0" y="24" fontFamily="Space Grotesk, monospace" fontSize="9" fill="#2E6F5E" fontWeight="600" textAnchor="middle">0.35 km · 1–2m</text>
    </g>

    <g transform="translate(295, 120)">
      <circle r="8" fill="#141517" />
      <text x="0" y="-22" fontFamily="Space Grotesk, monospace" fontSize="9" fontWeight="600" fill="#141517" textAnchor="middle">Todaru (Daya PG)</text>
      <text x="0" y="24" fontFamily="Space Grotesk, monospace" fontSize="9" fill="#43474F" fontWeight="600" textAnchor="middle">1.4 km · 3m</text>
    </g>

    <g transform="translate(430, 120)">
      <circle r="9" fill="#141517" />
      <text x="0" y="-22" fontFamily="Space Grotesk, monospace" fontSize="9" fontWeight="600" fill="#141517" textAnchor="middle">Masthikate &amp; Town (6)</text>
      <text x="0" y="24" fontFamily="Space Grotesk, monospace" fontSize="9" fill="#43474F" fontWeight="600" textAnchor="middle">3.7–4.7 km · 8–11m</text>
    </g>

    <g transform="translate(560, 120)">
      <circle r="8" fill="#2E6F5E" />
      <text x="0" y="-22" fontFamily="Space Grotesk, monospace" fontSize="9" fontWeight="600" fill="#141517" textAnchor="middle">Outer Town (2)</text>
      <text x="0" y="24" fontFamily="Space Grotesk, monospace" fontSize="9" fill="#2E6F5E" fontWeight="600" textAnchor="middle">5.2–5.3 km · 12–13m</text>
    </g>

    <text x="20" y="24" fontFamily="Space Grotesk, monospace" fontSize="10" fontWeight="700" fill="#43474F" letterSpacing="1">
      BADAGUMIJARU → MOODBIDRI COMMUTE CORRIDOR (11 VERIFIED PROPERTIES)
    </text>
  </svg>
);

// ==========================================
// 3. ROOM SPEC VISUAL (NON-CAD ELEVATION)
// ==========================================

export const RoomSpecVisual: React.FC<{ roomName: string; areaSqft: number; rentInr: number }> = ({
  roomName,
  areaSqft,
  rentInr
}) => (
  <div className="relative bg-white border border-parchment-200 rounded-xl p-4 font-mono select-none overflow-hidden w-full h-full flex flex-col justify-between">
    <svg className="w-full h-[210px]" viewBox="0 0 420 220" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect width="420" height="220" rx="8" fill="#FAF8F5" />
      <polygon points="60,150 210,75 360,150 210,205" fill="#FFFFFF" stroke="#141517" strokeWidth="2" />
      <polygon points="60,150 60,55 210,10 210,75" fill="#F2F8F5" stroke="#141517" strokeWidth="2" />
      <polygon points="210,75 210,10 360,55 360,150" fill="#FDF2EC" stroke="#141517" strokeWidth="2" />
      <polygon points="95,115 95,68 155,48 155,92" fill="#FFFFFF" stroke="#2E6F5E" strokeWidth="1.5" />
      <polygon points="150,152 215,120 265,144 200,176" fill="#2E6F5E" fillOpacity="0.18" stroke="#2E6F5E" strokeWidth="1.5" />
      <polygon points="245,108 295,132 325,117 275,93" fill="#D95D39" fillOpacity="0.2" stroke="#D95D39" strokeWidth="1.5" />
      <text x="20" y="205" fontSize="9" fill="#43474F" fontWeight="600">
        {areaSqft} SQ.FT · AGENT-VERIFIED FURNISHING
      </text>
    </svg>
    <div className="flex items-center justify-between pt-2 border-t border-parchment-200 text-[11px] text-obsidian">
      <span className="font-semibold truncate pr-2">{roomName}</span>
      <span className="font-bold text-terracotta tabular-nums">₹{rentInr.toLocaleString('en-IN')}/mo</span>
    </div>
  </div>
);

// ==========================================
// 4. ARCHITECTURAL CAD 2D FLOOR PLANS
// ==========================================

export interface FloorPlanArtProps {
  variant: string;
  className?: string;
}

export const FloorPlanArt: React.FC<FloorPlanArtProps> = ({ variant, className = 'w-full h-full' }) => {
  return (
    <div className={`relative bg-alabaster border border-parchment-200 rounded-xl p-4 font-mono select-none overflow-hidden ${className}`}>
      <svg className="w-full h-full min-h-[240px]" viewBox="0 0 500 350" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <defs>
          <pattern id="cadGrid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#141517" strokeWidth="0.5" strokeOpacity="0.08" />
          </pattern>
        </defs>

        <rect width="500" height="350" fill="#FAF8F5" />
        <rect width="500" height="350" fill="url(#cadGrid)" />
        <rect x="40" y="30" width="420" height="280" fill="none" stroke="#141517" strokeWidth="3" />

        <g stroke="#43474F" strokeWidth="1" strokeDasharray="3 3">
          <line x1="40" y1="20" x2="460" y2="20" />
          <line x1="30" y1="30" x2="30" y2="310" />
        </g>
        <text x="230" y="16" fontSize="10" fill="#43474F" textAnchor="middle" fontWeight="600">
          {variant.includes('balcony') || variant.includes('quad') ? "18' 6\" (5.64m)" : "14' 0\" (4.26m)"}
        </text>
        <text x="18" y="175" fontSize="10" fill="#43474F" textAnchor="middle" transform="rotate(-90 18 175)" fontWeight="600">
          {variant.includes('loft') || variant.includes('triple') ? "22' 0\" (6.70m)" : "16' 0\" (4.88m)"}
        </text>

        {variant === 'solo_studio' ? (
          <g>
            <rect x="320" y="30" width="140" height="110" fill="#FFFFFF" stroke="#141517" strokeWidth="2" />
            <text x="390" y="80" fontSize="9" fill="#43474F" textAnchor="middle">EN-SUITE BATH</text>
            <circle cx="360" cy="65" r="14" stroke="#141517" strokeWidth="1.2" fill="#E8F4EE" />
            <rect x="410" y="45" width="35" height="40" fill="#F0F5FA" stroke="#141517" strokeWidth="1.2" />

            <rect x="65" y="55" width="130" height="150" fill="#FFFFFF" stroke="#141517" strokeWidth="2" />
            <rect x="75" y="65" width="50" height="30" rx="3" fill="#E8F4EE" stroke="#141517" strokeWidth="1" />
            <text x="130" y="135" fontSize="10" fill="#2E6F5E" fontWeight="600" textAnchor="middle">SINGLE ORTHO BED</text>

            <rect x="65" y="245" width="160" height="50" fill="#FFFFFF" stroke="#141517" strokeWidth="2" />
            <circle cx="145" cy="225" r="14" fill="#D95D39" fillOpacity="0.2" stroke="#D95D39" strokeWidth="1.5" />
            <text x="145" y="275" fontSize="10" fill="#9E3B1E" fontWeight="600" textAnchor="middle">STUDY WORKSTATION</text>

            <rect x="340" y="220" width="120" height="75" fill="#FFFFFF" stroke="#141517" strokeWidth="2" />
            <line x1="400" y1="220" x2="400" y2="295" stroke="#141517" strokeWidth="1.2" />
            <text x="400" y="260" fontSize="9" fill="#43474F" textAnchor="middle">WARDROBE</text>

            <path d="M 270 310 A 45 45 0 0 1 225 265" stroke="#D95D39" strokeWidth="1.5" strokeDasharray="2 2" fill="none" />
            <line x1="270" y1="310" x2="270" y2="265" stroke="#141517" strokeWidth="2" />
          </g>
        ) : variant === 'twin_pod' ? (
          <g>
            <rect x="245" y="30" width="10" height="170" fill="#141517" />
            <text x="250" y="220" fontSize="8" fill="#43474F" textAnchor="middle" transform="rotate(-90 250 220)">PRIVACY PARTITION</text>

            <rect x="60" y="45" width="105" height="130" fill="#FFFFFF" stroke="#141517" strokeWidth="2" />
            <text x="112" y="115" fontSize="9" fill="#2E6F5E" fontWeight="600" textAnchor="middle">BED A</text>
            <rect x="60" y="245" width="115" height="50" fill="#FFFFFF" stroke="#141517" strokeWidth="2" />
            <circle cx="117" cy="225" r="12" fill="#D95D39" fillOpacity="0.2" stroke="#D95D39" strokeWidth="1.5" />
            <text x="117" y="275" fontSize="9" fill="#9E3B1E" textAnchor="middle">DESK A</text>

            <rect x="335" y="45" width="105" height="130" fill="#FFFFFF" stroke="#141517" strokeWidth="2" />
            <text x="387" y="115" fontSize="9" fill="#2E6F5E" fontWeight="600" textAnchor="middle">BED B</text>
            <rect x="325" y="245" width="115" height="50" fill="#FFFFFF" stroke="#141517" strokeWidth="2" />
            <circle cx="382" cy="225" r="12" fill="#D95D39" fillOpacity="0.2" stroke="#D95D39" strokeWidth="1.5" />
            <text x="382" y="275" fontSize="9" fill="#9E3B1E" textAnchor="middle">DESK B</text>

            <rect x="195" y="245" width="110" height="65" fill="#F0F5FA" stroke="#141517" strokeWidth="1.5" />
            <text x="250" y="280" fontSize="8" fill="#43474F" textAnchor="middle">ATTACHED BATH</text>
          </g>
        ) : (
          <g>
            <rect x="40" y="30" width="80" height="280" fill="#FDF2EC" stroke="#D95D39" strokeWidth="2" strokeDasharray="4 2" />
            <text x="80" y="175" fontSize="9" fill="#9E3B1E" fontWeight="700" textAnchor="middle" transform="rotate(-90 80 175)">
              SHARED BALCONY / CORRIDOR
            </text>

            <rect x="145" y="55" width="140" height="160" fill="#FFFFFF" stroke="#141517" strokeWidth="2" />
            <text x="215" y="140" fontSize="10" fill="#2E6F5E" fontWeight="600" textAnchor="middle">SLEEP &amp; STORAGE ZONE</text>

            <rect x="145" y="240" width="170" height="55" fill="#FFFFFF" stroke="#141517" strokeWidth="2" />
            <text x="230" y="272" fontSize="9" fill="#9E3B1E" textAnchor="middle">STUDY DESK ROW</text>

            <rect x="330" y="45" width="120" height="120" fill="#FFFFFF" stroke="#141517" strokeWidth="2" />
            <circle cx="390" cy="95" r="18" fill="#E8F4EE" stroke="#2E6F5E" strokeWidth="1.5" />
            <text x="390" y="130" fontSize="8" fill="#43474F" textAnchor="middle">WASHROOM</text>
          </g>
        )}

        <g transform="translate(320, 290)">
          <rect width="130" height="16" fill="#141517" rx="2" />
          <text x="65" y="12" fill="#FFFFFF" fontSize="8" textAnchor="middle" letterSpacing="0.5">
            CAMPUSNEST CAD V26
          </text>
        </g>
      </svg>
    </div>
  );
};

// ==========================================
// 5. AMENITIES BENTO VISUALS
// ==========================================

export const BentoVisualAcademic: React.FC = () => (
  <svg viewBox="0 0 300 160" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <rect width="300" height="160" fill="#FAF8F5" rx="8" />
    <circle cx="150" cy="75" r="48" stroke="#2E6F5E" strokeWidth="2" strokeDasharray="4 4" />
    <circle cx="150" cy="75" r="32" fill="#2E6F5E" fillOpacity="0.1" />
    <path d="M132 75 L146 89 L170 61" stroke="#2E6F5E" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    <text x="150" y="142" fontFamily="Space Grotesk, monospace" fontSize="11" fill="#141517" textAnchor="middle" fontWeight="600">
      Verified MITE Transit &amp; Fiber
    </text>
  </svg>
);

export const BentoVisualSecurity: React.FC = () => (
  <svg viewBox="0 0 300 160" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <rect width="300" height="160" fill="#FAF8F5" rx="8" />
    <rect x="115" y="30" width="70" height="84" rx="8" fill="#141517" />
    <circle cx="150" cy="65" r="14" stroke="#D95D39" strokeWidth="2.5" />
    <circle cx="150" cy="65" r="4" fill="#D95D39" />
    <rect x="143" y="81" width="14" height="18" rx="3" fill="#D95D39" />
    <text x="150" y="142" fontFamily="Space Grotesk, monospace" fontSize="11" fill="#141517" textAnchor="middle" fontWeight="600">
      In-Person Agent Inspection
    </text>
  </svg>
);

export const BentoVisualSmartLiving: React.FC = () => (
  <svg viewBox="0 0 300 160" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <rect width="300" height="160" fill="#FAF8F5" rx="8" />
    <rect x="120" y="28" width="60" height="88" rx="6" stroke="#141517" strokeWidth="2.5" fill="#FFFFFF" />
    <circle cx="150" cy="76" r="20" stroke="#2E6F5E" strokeWidth="2" />
    <path d="M142 76 Q 150 66, 158 76 T 150 86" stroke="#2E6F5E" strokeWidth="2" fill="none" />
    <circle cx="132" cy="40" r="3.5" fill="#D95D39" />
    <text x="150" y="142" fontFamily="Space Grotesk, monospace" fontSize="11" fill="#141517" textAnchor="middle" fontWeight="600">
      Solar Backup &amp; Laundry
    </text>
  </svg>
);

export const BentoVisualWellness: React.FC = () => (
  <svg viewBox="0 0 300 160" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <rect width="300" height="160" fill="#FAF8F5" rx="8" />
    <circle cx="150" cy="72" r="36" fill="#FDF2EC" stroke="#D95D39" strokeWidth="2" />
    <path d="M136 72 Q 150 54, 164 72 T 150 90 Z" fill="#D95D39" />
    <text x="150" y="142" fontFamily="Space Grotesk, monospace" fontSize="11" fill="#141517" textAnchor="middle" fontWeight="600">
      Coastal &amp; Pure Veg Mess
    </text>
  </svg>
);
