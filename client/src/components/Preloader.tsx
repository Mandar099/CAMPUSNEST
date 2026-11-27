import React, { useEffect, useState } from 'react';
import { isReducedMotion } from '../lib/motion';

interface PreloaderProps {
  onComplete?: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    if (isReducedMotion()) {
      setIsVisible(false);
      onComplete?.();
      return;
    }

    const fadeTimer = setTimeout(() => setFading(true), 220);
    const hideTimer = setTimeout(() => {
      setIsVisible(false);
      onComplete?.();
    }, 520);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, [onComplete]);

  if (!isVisible) return null;

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-obsidian text-alabaster transition-opacity duration-300 ${
        fading ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="flex flex-col items-center max-w-sm px-6 text-center">
        <div className="w-12 h-12 mb-4">
          <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
            <rect width="48" height="48" rx="12" fill="#24272D" />
            <path d="M12 34V14L24 7L36 14V34L24 41L12 34Z" stroke="#D95D39" strokeWidth="2.5" strokeLinejoin="round" />
            <circle cx="24" cy="24" r="5" fill="#2E6F5E" />
          </svg>
        </div>
        <div className="font-display text-xl font-bold tracking-tight text-white">
          CAMPUS<span className="text-terracotta">NEST</span>
        </div>
        <div className="font-mono text-[11px] text-parchment-200 tracking-widest uppercase mt-1">
          Moodbidri · MITE Directory
        </div>
      </div>
    </div>
  );
};
