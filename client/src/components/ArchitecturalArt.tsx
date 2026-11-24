import React from 'react';

// ==========================================
// 1. PROPERTY ELEVATION ILLUSTRATIONS
// ==========================================

export interface PropertyArtProps {
  theme: 'emerald' | 'ocean' | 'terracotta' | 'obsidian' | string;
  className?: string;
}

export const PropertyArt: React.FC<PropertyArtProps> = ({ theme, className = "w-full h-full" }) => {
  switch (theme) {
    case 'emerald':
      // CampusNest Parkside (Moodbidri - Forest Canopy & Angled Living)
      return (
        <svg viewBox="0 0 800 500" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="skyEmerald" x1="0" y1="0" x2="0" y2="500" gradientUnits="userSpaceOnUse">
              <stop stopColor="#F2F8F5" />
              <stop offset="1" stopColor="#E0EDE6" />
            </linearGradient>
            <linearGradient id="facadeParkside" x1="0" y1="0" x2="800" y2="500" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FFFFFF" />
              <stop offset="1" stopColor="#F5FAF7" />
            </linearGradient>
            <pattern id="gridSubtle" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#2E6F5E" strokeWidth="0.5" strokeOpacity="0.08" />
            </pattern>
          </defs>

          {/* Sky background */}
          <rect width="800" height="500" fill="url(#skyEmerald)" />
          <rect width="800" height="500" fill="url(#gridSubtle)" />

          {/* Forest Backdrop Hills & Canopy */}
          <path d="M0 380 Q 200 320, 450 360 T 800 340 L 800 500 L 0 500 Z" fill="#D3E6DC" opacity="0.7" />
          <path d="M0 410 Q 280 370, 560 400 T 800 390 L 800 500 L 0 500 Z" fill="#BDDCD0" opacity="0.6" />

          {/* Stylized Architectural Trees */}
          <circle cx="80" cy="380" r="45" fill="#2E6F5E" opacity="0.2" />
          <circle cx="140" cy="360" r="55" fill="#2E6F5E" opacity="0.3" />
          <circle cx="710" cy="370" r="60" fill="#2E6F5E" opacity="0.25" />
          <circle cx="650" cy="390" r="40" fill="#2E6F5E" opacity="0.2" />

          {/* Main Residence Building Wing A (Angled Modernist Block) */}
          <g transform="translate(180, 110)">
            {/* Building Shadow */}
            <polygon points="40,320 460,320 500,340 0,340" fill="#141517" opacity="0.06" />

            {/* Main Facade */}
            <rect x="50" y="30" width="380" height="290" rx="3" fill="url(#facadeParkside)" stroke="#141517" strokeWidth="2.5" />

            {/* Overhanging Roof & Solar Pergola */}
            <polygon points="30,30 450,30 430,10 50,10" fill="#2E6F5E" stroke="#141517" strokeWidth="2.5" />
            {/* Solar panels */}
            <line x1="80" y1="18" x2="400" y2="18" stroke="#FFFFFF" strokeWidth="1.5" strokeDasharray="14 6" />

            {/* Floor Lines */}
            <line x1="50" y1="120" x2="430" y2="120" stroke="#141517" strokeWidth="1.5" />
            <line x1="50" y1="210" x2="430" y2="210" stroke="#141517" strokeWidth="1.5" />

            {/* Level 3 Balconies & Windows */}
            <rect x="75" y="50" width="70" height="50" fill="#E8F4EE" stroke="#141517" strokeWidth="1.5" />
            <line x1="110" y1="50" x2="110" y2="100" stroke="#141517" strokeWidth="1" />
            <rect x="180" y="50" width="120" height="50" fill="#141517" fillOpacity="0.08" stroke="#141517" strokeWidth="1.5" />
            <line x1="180" y1="90" x2="300" y2="90" stroke="#2E6F5E" strokeWidth="2" />
            <rect x="335" y="50" width="70" height="50" fill="#E8F4EE" stroke="#141517" strokeWidth="1.5" />

            {/* Level 2 Acoustic Pod Studios */}
            <rect x="75" y="140" width="90" height="50" fill="#E8F4EE" stroke="#141517" strokeWidth="1.5" />
            <rect x="195" y="140" width="90" height="50" fill="#E8F4EE" stroke="#141517" strokeWidth="1.5" />
            <rect x="315" y="140" width="90" height="50" fill="#E8F4EE" stroke="#141517" strokeWidth="1.5" />
            {/* Vertical Louver sunshades */}
            <line x1="105" y1="140" x2="105" y2="190" stroke="#D95D39" strokeWidth="2" />
            <line x1="225" y1="140" x2="225" y2="190" stroke="#D95D39" strokeWidth="2" />
            <line x1="345" y1="140" x2="345" y2="190" stroke="#D95D39" strokeWidth="2" />

            {/* Ground Level Entrance & Glass Courtyard Atrium */}
            <rect x="75" y="235" width="130" height="85" fill="#E8F4EE" stroke="#141517" strokeWidth="1.5" />
            <line x1="140" y1="235" x2="140" y2="320" stroke="#141517" strokeWidth="1" />
            <rect x="235" y="245" width="70" height="75" fill="#2E6F5E" stroke="#141517" strokeWidth="2" />
            <circle cx="288" cy="285" r="3" fill="#FFFFFF" />
            <rect x="335" y="235" width="70" height="85" fill="#E8F4EE" stroke="#141517" strokeWidth="1.5" />

            {/* Architectural Dimension Grid Marks */}
            <text x="50" y="338" fontFamily="Space Grotesk, monospace" fontSize="9" fill="#2E6F5E" letterSpacing="1">MITE 400M AXIS // ELEV. +12.4m</text>
          </g>

          {/* Architectural Badge */}
          <g transform="translate(40, 40)">
            <rect width="180" height="34" rx="4" fill="#FFFFFF" stroke="#2E6F5E" strokeWidth="1.2" opacity="0.95" />
            <circle cx="20" cy="17" r="5" fill="#2E6F5E" />
            <text x="35" y="21" fontFamily="Space Grotesk, monospace" fontSize="11" fontWeight="600" fill="#141517">
              MOODBIDRI · PARKSIDE
            </text>
          </g>
        </svg>
      );

    case 'ocean':
      // CampusNest Harbor View (Mangaluru - Surathkal Coastal Modernist)
      return (
        <svg viewBox="0 0 800 500" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="skyOcean" x1="0" y1="0" x2="0" y2="500" gradientUnits="userSpaceOnUse">
              <stop stopColor="#F0F5FA" />
              <stop offset="1" stopColor="#DDEAF5" />
            </linearGradient>
            <linearGradient id="seaGradient" x1="0" y1="0" x2="800" y2="0" gradientUnits="userSpaceOnUse">
              <stop stopColor="#5B93C7" stopOpacity="0.3" />
              <stop offset="1" stopColor="#356D9E" stopOpacity="0.4" />
            </linearGradient>
          </defs>

          {/* Background */}
          <rect width="800" height="500" fill="url(#skyOcean)" />

          {/* Coastal Sea Waves Horizon */}
          <path d="M0 420 C 150 410, 250 430, 400 420 C 550 410, 680 428, 800 420 L 800 500 L 0 500 Z" fill="url(#seaGradient)" />
          <path d="M0 445 C 200 435, 380 450, 580 440 C 690 435, 750 445, 800 442 L 800 500 L 0 500 Z" fill="#28557D" opacity="0.25" />

          {/* Stepped Cantilever Tech Residence */}
          <g transform="translate(160, 90)">
            {/* Base platform */}
            <rect x="60" y="270" width="420" height="80" fill="#FFFFFF" stroke="#141517" strokeWidth="2.5" />
            <line x1="60" y1="310" x2="480" y2="310" stroke="#141517" strokeWidth="1" strokeDasharray="4 4" />

            {/* Mid Tower Section */}
            <rect x="110" y="160" width="340" height="110" fill="#F8FAFC" stroke="#141517" strokeWidth="2.5" />
            {/* Ocean-view panoramic floor-to-ceiling glass */}
            <rect x="140" y="180" width="120" height="65" fill="#E2EDF8" stroke="#141517" strokeWidth="1.5" />
            <line x1="200" y1="180" x2="200" y2="245" stroke="#356D9E" strokeWidth="1.5" />
            <rect x="290" y="180" width="130" height="65" fill="#E2EDF8" stroke="#141517" strokeWidth="1.5" />
            <line x1="355" y1="180" x2="355" y2="245" stroke="#356D9E" strokeWidth="1.5" />

            {/* Top Cantilever Penthouse */}
            <polygon points="160,70 410,70 440,160 130,160" fill="#FFFFFF" stroke="#141517" strokeWidth="2.5" />
            {/* Terrace Railing */}
            <rect x="180" y="90" width="180" height="50" fill="#E2EDF8" stroke="#141517" strokeWidth="1.5" />
            <line x1="180" y1="125" x2="360" y2="125" stroke="#D95D39" strokeWidth="2" />

            {/* Sun Louvers */}
            <line x1="430" y1="160" x2="430" y2="350" stroke="#356D9E" strokeWidth="3" />
            <line x1="450" y1="160" x2="450" y2="350" stroke="#356D9E" strokeWidth="3" />

            {/* Ground Level Entrance */}
            <rect x="220" y="290" width="80" height="60" fill="#141517" />
            <rect x="235" y="300" width="50" height="50" fill="#D95D39" />

            <text x="60" y="375" fontFamily="Space Grotesk, monospace" fontSize="9" fill="#356D9E" letterSpacing="1">
              SURATHKAL TECH HUB // NITK 850M // 100% DG DUAL FEED
            </text>
          </g>

          {/* Location Badge */}
          <g transform="translate(40, 40)">
            <rect width="200" height="34" rx="4" fill="#FFFFFF" stroke="#356D9E" strokeWidth="1.2" opacity="0.95" />
            <circle cx="20" cy="17" r="5" fill="#356D9E" />
            <text x="35" y="21" fontFamily="Space Grotesk, monospace" fontSize="11" fontWeight="600" fill="#141517">
              MANGALURU · HARBOR VIEW
            </text>
          </g>
        </svg>
      );

    case 'terracotta':
      // CampusNest Scholar's Loft (Manipal - Eshwar Nagar Academic Brick & Light)
      return (
        <svg viewBox="0 0 800 500" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="skyTerracotta" x1="0" y1="0" x2="0" y2="500" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FBF7F2" />
              <stop offset="1" stopColor="#F5ECE1" />
            </linearGradient>
          </defs>

          <rect width="800" height="500" fill="url(#skyTerracotta)" />

          {/* Manipal Rolling Valleys */}
          <path d="M0 360 Q 250 300, 500 340 T 800 320 L 800 500 L 0 500 Z" fill="#E8D9C5" opacity="0.6" />

          {/* Academic High-Ceiling Library Pavilion */}
          <g transform="translate(170, 80)">
            {/* Ground shadow */}
            <rect x="30" y="350" width="460" height="20" rx="3" fill="#141517" opacity="0.05" />

            {/* Brick Texture Base */}
            <rect x="50" y="60" width="420" height="290" fill="#FFFFFF" stroke="#141517" strokeWidth="2.5" />
            
            {/* Terracotta Column Accents */}
            <rect x="50" y="60" width="30" height="290" fill="#D95D39" stroke="#141517" strokeWidth="1.5" />
            <rect x="235" y="60" width="30" height="290" fill="#D95D39" stroke="#141517" strokeWidth="1.5" />
            <rect x="440" y="60" width="30" height="290" fill="#D95D39" stroke="#141517" strokeWidth="1.5" />

            {/* High Arch Windows (Manipal Classic Academic Rhythm) */}
            <path d="M100 130 A 25 25 0 0 1 150 130 L 150 200 L 100 200 Z" fill="#FBF3EC" stroke="#141517" strokeWidth="1.5" />
            <line x1="125" y1="105" x2="125" y2="200" stroke="#D95D39" strokeWidth="1" />

            <path d="M165 130 A 25 25 0 0 1 215 130 L 215 200 L 165 200 Z" fill="#FBF3EC" stroke="#141517" strokeWidth="1.5" />
            <line x1="190" y1="105" x2="190" y2="200" stroke="#D95D39" strokeWidth="1" />

            <path d="M285 130 A 25 25 0 0 1 335 130 L 335 200 L 285 200 Z" fill="#FBF3EC" stroke="#141517" strokeWidth="1.5" />
            <line x1="310" y1="105" x2="310" y2="200" stroke="#D95D39" strokeWidth="1" />

            <path d="M350 130 A 25 25 0 0 1 400 130 L 400 200 L 350 200 Z" fill="#FBF3EC" stroke="#141517" strokeWidth="1.5" />
            <line x1="375" y1="105" x2="375" y2="200" stroke="#D95D39" strokeWidth="1" />

            {/* Upper Reading Loft Mezzanines */}
            <rect x="95" y="240" width="125" height="85" fill="#F7F1EA" stroke="#141517" strokeWidth="1.5" />
            <rect x="280" y="240" width="145" height="85" fill="#F7F1EA" stroke="#141517" strokeWidth="1.5" />
            
            {/* Classical Triangular Pediment Spire */}
            <polygon points="260,20 200,60 320,60" fill="#FFFFFF" stroke="#141517" strokeWidth="2.5" />
            <circle cx="260" cy="46" r="6" stroke="#D95D39" strokeWidth="1.5" fill="none" />

            <text x="50" y="375" fontFamily="Space Grotesk, monospace" fontSize="9" fill="#D95D39" letterSpacing="1">
              ESHWAR NAGAR // MIT 600M // 24/7 SILENT LIBRARY WING
            </text>
          </g>

          <g transform="translate(40, 40)">
            <rect width="210" height="34" rx="4" fill="#FFFFFF" stroke="#D95D39" strokeWidth="1.2" opacity="0.95" />
            <circle cx="20" cy="17" r="5" fill="#D95D39" />
            <text x="35" y="21" fontFamily="Space Grotesk, monospace" fontSize="11" fontWeight="600" fill="#141517">
              MANIPAL · SCHOLAR'S LOFT
            </text>
          </g>
        </svg>
      );

    case 'obsidian':
    default:
      // CampusNest Innovation Hub (Bengaluru - Electronic City Tech Atrium)
      return (
        <svg viewBox="0 0 800 500" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="skyObsidian" x1="0" y1="0" x2="0" y2="500" gradientUnits="userSpaceOnUse">
              <stop stopColor="#F5F5F7" />
              <stop offset="1" stopColor="#E5E7EB" />
            </linearGradient>
            <linearGradient id="glassDark" x1="0" y1="0" x2="1" y2="1">
              <stop stopColor="#1E293B" />
              <stop offset="1" stopColor="#0F172A" />
            </linearGradient>
          </defs>

          <rect width="800" height="500" fill="url(#skyObsidian)" />

          {/* Isometric Cybernetic Grid Background */}
          <line x1="0" y1="420" x2="800" y2="420" stroke="#141517" strokeWidth="1.5" />
          <line x1="100" y1="420" x2="200" y2="500" stroke="#141517" strokeWidth="0.5" strokeOpacity="0.2" />
          <line x1="300" y1="420" x2="400" y2="500" stroke="#141517" strokeWidth="0.5" strokeOpacity="0.2" />
          <line x1="500" y1="420" x2="600" y2="500" stroke="#141517" strokeWidth="0.5" strokeOpacity="0.2" />
          <line x1="700" y1="420" x2="800" y2="500" stroke="#141517" strokeWidth="0.5" strokeOpacity="0.2" />

          {/* Futuristic High-Density Modular Student Residence */}
          <g transform="translate(180, 70)">
            {/* Outer Frame */}
            <rect x="50" y="50" width="390" height="320" fill="#FFFFFF" stroke="#141517" strokeWidth="2.5" />

            {/* Modular Studio Units Grid (12 Unit Cubes) */}
            {[0, 1, 2].map(row => (
              [0, 1, 2, 3].map(col => (
                <g key={`${row}-${col}`} transform={`translate(${70 + col * 85}, ${70 + row * 85})`}>
                  <rect width="70" height="70" fill={row === 1 && col === 2 ? '#D95D39' : '#141517'} fillOpacity={row === 1 && col === 2 ? 0.9 : 0.04} stroke="#141517" strokeWidth="1.5" />
                  <line x1="15" y1="15" x2="55" y2="15" stroke={row === 1 && col === 2 ? '#FFFFFF' : '#141517'} strokeWidth="1" strokeOpacity="0.4" />
                  <circle cx="35" cy="40" r="8" fill={row === 1 && col === 2 ? '#FFFFFF' : '#2E6F5E'} fillOpacity={row === 1 && col === 2 ? 0.3 : 0.6} />
                </g>
              ))
            ))}

            {/* Ground Level Co-Working Hacker Atrium */}
            <rect x="70" y="315" width="345" height="55" fill="#141517" />
            <text x="140" y="348" fontFamily="Space Grotesk, monospace" fontSize="12" fill="#FFFFFF" fontWeight="600" letterSpacing="2">
              FOUNDER CO-LAB // 1Gbps
            </text>

            {/* Rooftop Solar Pergola */}
            <line x1="40" y1="40" x2="450" y2="40" stroke="#141517" strokeWidth="3" />
            <line x1="90" y1="40" x2="90" y2="50" stroke="#141517" strokeWidth="2" />
            <line x1="240" y1="40" x2="240" y2="50" stroke="#141517" strokeWidth="2" />
            <line x1="390" y1="40" x2="390" y2="50" stroke="#141517" strokeWidth="2" />

            <text x="50" y="390" fontFamily="Space Grotesk, monospace" fontSize="9" fill="#141517" letterSpacing="1">
              BENGALURU E-CITY // PES/IIIT-B 500M // ZERO-CARBON GRID
            </text>
          </g>

          <g transform="translate(40, 40)">
            <rect width="230" height="34" rx="4" fill="#FFFFFF" stroke="#141517" strokeWidth="1.2" opacity="0.95" />
            <circle cx="20" cy="17" r="5" fill="#141517" />
            <text x="35" y="21" fontFamily="Space Grotesk, monospace" fontSize="11" fontWeight="600" fill="#141517">
              BENGALURU · INNOVATION HUB
            </text>
          </g>
        </svg>
      );
  }
};

// ==========================================
// 2. ARCHITECTURAL CAD 2D FLOOR PLANS
// ==========================================

export interface FloorPlanArtProps {
  variant: string;
  className?: string;
}

export const FloorPlanArt: React.FC<FloorPlanArtProps> = ({ variant, className = "w-full h-full" }) => {
  return (
    <div className={`relative bg-alabaster border border-parchment-200 rounded-xl p-4 font-mono select-none overflow-hidden ${className}`}>
      {/* Blueprint Grid Lines */}
      <svg className="w-full h-full min-h-[300px]" viewBox="0 0 500 350" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="cadGrid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#141517" strokeWidth="0.5" strokeOpacity="0.08" />
          </pattern>
        </defs>

        <rect width="500" height="350" fill="#FAF8F5" />
        <rect width="500" height="350" fill="url(#cadGrid)" />

        {/* Outer Boundary Wall */}
        <rect x="40" y="30" width="420" height="280" fill="none" stroke="#141517" strokeWidth="3" />

        {/* DIMENSIONS LABELS */}
        <g stroke="#5A5E66" strokeWidth="1" strokeDasharray="3 3">
          <line x1="40" y1="20" x2="460" y2="20" />
          <line x1="30" y1="30" x2="30" y2="310" />
        </g>
        <text x="230" y="16" fontSize="10" fill="#5A5E66" textAnchor="middle" fontWeight="600">
          {variant.includes('balcony') || variant.includes('quad') ? "18' 6\" (5.64m)" : "14' 0\" (4.26m)"}
        </text>
        <text x="18" y="175" fontSize="10" fill="#5A5E66" textAnchor="middle" transform="rotate(-90 18 175)" fontWeight="600">
          {variant.includes('loft') || variant.includes('mezzanine') ? "22' 0\" (6.70m)" : "16' 0\" (4.88m)"}
        </text>

        {/* INTERIOR PARTITIONS ACCORDING TO VARIANT */}
        {variant === 'solo_studio' ? (
          // Solo Studio Suite
          <g>
            {/* Ensuite Bathroom (Top Right) */}
            <rect x="320" y="30" width="140" height="110" fill="#FFFFFF" stroke="#141517" strokeWidth="2" />
            <text x="390" y="80" fontSize="9" fill="#5A5E66" textAnchor="middle">EN-SUITE BATH</text>
            <circle cx="360" cy="65" r="14" stroke="#141517" strokeWidth="1.2" fill="#E8F4EE" />
            <rect x="410" y="45" width="35" height="40" fill="#F0F5FA" stroke="#141517" strokeWidth="1.2" />

            {/* Sleeping Zone (Bed with Pillows) */}
            <rect x="65" y="55" width="130" height="150" fill="#FFFFFF" stroke="#141517" strokeWidth="2" />
            <rect x="75" y="65" width="50" height="30" rx="3" fill="#E8F4EE" stroke="#141517" strokeWidth="1" />
            <text x="130" y="135" fontSize="10" fill="#2E6F5E" fontWeight="600" textAnchor="middle">QUEEN ORTHO BED</text>

            {/* Ergonomic Study Workstation (Bottom Left) */}
            <rect x="65" y="245" width="160" height="50" fill="#FFFFFF" stroke="#141517" strokeWidth="2" />
            <circle cx="145" cy="225" r="14" fill="#D95D39" fillOpacity="0.2" stroke="#D95D39" strokeWidth="1.5" />
            <text x="145" y="275" fontSize="10" fill="#D95D39" fontWeight="600" textAnchor="middle">HERMAN MILLER DESK</text>

            {/* Wardrobe & Luggage (Bottom Right) */}
            <rect x="340" y="220" width="120" height="75" fill="#FFFFFF" stroke="#141517" strokeWidth="2" />
            <line x1="400" y1="220" x2="400" y2="295" stroke="#141517" strokeWidth="1.2" />
            <text x="400" y="260" fontSize="9" fill="#5A5E66" textAnchor="middle">BUILT-IN WARDROBE</text>

            {/* Entrance Door with Swing Arc */}
            <path d="M 270 310 A 45 45 0 0 1 225 265" stroke="#D95D39" strokeWidth="1.5" strokeDasharray="2 2" fill="none" />
            <line x1="270" y1="310" x2="270" y2="265" stroke="#141517" strokeWidth="2" />
          </g>
        ) : variant === 'twin_pod' ? (
          // Twin Focus Pod (Dual study, acoustic divider)
          <g>
            {/* Center Acoustic Divider */}
            <rect x="245" y="30" width="10" height="170" fill="#141517" />
            <text x="250" y="220" fontSize="8" fill="#5A5E66" textAnchor="middle" transform="rotate(-90 250 220)">ACOUSTIC DIVIDER</text>

            {/* Pod A (Left Bed & Desk) */}
            <rect x="60" y="45" width="105" height="130" fill="#FFFFFF" stroke="#141517" strokeWidth="2" />
            <text x="112" y="115" fontSize="9" fill="#2E6F5E" fontWeight="600" textAnchor="middle">BED A</text>
            <rect x="60" y="245" width="115" height="50" fill="#FFFFFF" stroke="#141517" strokeWidth="2" />
            <circle cx="117" cy="225" r="12" fill="#D95D39" fillOpacity="0.2" stroke="#D95D39" strokeWidth="1.5" />
            <text x="117" y="275" fontSize="9" fill="#D95D39" textAnchor="middle">STUDY POD A</text>

            {/* Pod B (Right Bed & Desk) */}
            <rect x="335" y="45" width="105" height="130" fill="#FFFFFF" stroke="#141517" strokeWidth="2" />
            <text x="387" y="115" fontSize="9" fill="#2E6F5E" fontWeight="600" textAnchor="middle">BED B</text>
            <rect x="325" y="245" width="115" height="50" fill="#FFFFFF" stroke="#141517" strokeWidth="2" />
            <circle cx="382" cy="225" r="12" fill="#D95D39" fillOpacity="0.2" stroke="#D95D39" strokeWidth="1.5" />
            <text x="382" y="275" fontSize="9" fill="#D95D39" textAnchor="middle">STUDY POD B</text>

            {/* Shared Attached Bath */}
            <rect x="195" y="245" width="110" height="65" fill="#F0F5FA" stroke="#141517" strokeWidth="1.5" />
            <text x="250" y="280" fontSize="8" fill="#5A5E66" textAnchor="middle">SHARED BATH</text>
          </g>
        ) : (
          // Balcony Loft / Suite / Mezzanine
          <g>
            {/* Extended Balcony Deck (Left) */}
            <rect x="40" y="30" width="80" height="280" fill="#FDF2EC" stroke="#D95D39" strokeWidth="2" strokeDasharray="4 2" />
            <text x="80" y="175" fontSize="9" fill="#D95D39" fontWeight="700" textAnchor="middle" transform="rotate(-90 80 175)">
              SUNLIT PRIVATE BALCONY
            </text>

            {/* Master Living & Study Zone */}
            <rect x="145" y="55" width="140" height="160" fill="#FFFFFF" stroke="#141517" strokeWidth="2" />
            <text x="215" y="140" fontSize="10" fill="#2E6F5E" fontWeight="600" textAnchor="middle">SUITE SLEEP ZONE</text>

            <rect x="145" y="240" width="170" height="55" fill="#FFFFFF" stroke="#141517" strokeWidth="2" />
            <text x="230" y="272" fontSize="9" fill="#D95D39" textAnchor="middle">DUAL MONITORS WORKBENCH</text>

            {/* Luxury Bathroom & Walk-In Wardrobe */}
            <rect x="330" y="45" width="120" height="120" fill="#FFFFFF" stroke="#141517" strokeWidth="2" />
            <circle cx="390" cy="95" r="18" fill="#E8F4EE" stroke="#2E6F5E" strokeWidth="1.5" />
            <text x="390" y="130" fontSize="8" fill="#5A5E66" textAnchor="middle">DELUXE EN-SUITE</text>
          </g>
        )}

        {/* CAD Stamp */}
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
// 3. AMENITIES BENTO ICONS & VISUALS
// ==========================================

export const BentoVisualAcademic: React.FC = () => (
  <svg viewBox="0 0 300 180" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="300" height="180" fill="#FAF8F5" rx="8" />
    <circle cx="150" cy="85" r="55" stroke="#2E6F5E" strokeWidth="2" strokeDasharray="4 4" />
    <circle cx="150" cy="85" r="38" fill="#2E6F5E" fillOpacity="0.1" />
    <path d="M125 85 L145 105 L175 65" stroke="#2E6F5E" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    <text x="150" y="160" fontFamily="Space Grotesk, monospace" fontSize="11" fill="#141517" textAnchor="middle" fontWeight="600">
      1 Gbps Redundant Mesh Wi-Fi
    </text>
  </svg>
);

export const BentoVisualSecurity: React.FC = () => (
  <svg viewBox="0 0 300 180" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="300" height="180" fill="#FAF8F5" rx="8" />
    <rect x="110" y="40" width="80" height="95" rx="8" fill="#141517" />
    <circle cx="150" cy="80" r="16" stroke="#D95D39" strokeWidth="2.5" />
    <circle cx="150" cy="80" r="5" fill="#D95D39" />
    <rect x="142" y="98" width="16" height="20" rx="3" fill="#D95D39" />
    <text x="150" y="160" fontFamily="Space Grotesk, monospace" fontSize="11" fill="#141517" textAnchor="middle" fontWeight="600">
      24/7 Biometric Turnstiles & CCTV
    </text>
  </svg>
);

export const BentoVisualSmartLiving: React.FC = () => (
  <svg viewBox="0 0 300 180" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="300" height="180" fill="#FAF8F5" rx="8" />
    <rect x="115" y="35" width="70" height="100" rx="6" stroke="#141517" strokeWidth="2.5" fill="#FFFFFF" />
    <circle cx="150" cy="90" r="24" stroke="#2E6F5E" strokeWidth="2" />
    <path d="M142 90 Q 150 78, 158 90 T 150 102" stroke="#2E6F5E" strokeWidth="2" fill="none" />
    <circle cx="130" cy="50" r="4" fill="#D95D39" />
    <text x="150" y="160" fontFamily="Space Grotesk, monospace" fontSize="11" fill="#141517" textAnchor="middle" fontWeight="600">
      App-Activated Laundry & 100% DG
    </text>
  </svg>
);

export const BentoVisualWellness: React.FC = () => (
  <svg viewBox="0 0 300 180" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="300" height="180" fill="#FAF8F5" rx="8" />
    <circle cx="150" cy="80" r="42" fill="#FDF2EC" stroke="#D95D39" strokeWidth="2" />
    <path d="M135 80 Q 150 60, 165 80 T 150 100 Z" fill="#D95D39" />
    <text x="150" y="160" fontFamily="Space Grotesk, monospace" fontSize="11" fill="#141517" textAnchor="middle" fontWeight="600">
      Chef Nutrition & Rooftop Yoga
    </text>
  </svg>
);
