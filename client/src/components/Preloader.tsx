import React, { useEffect, useState } from 'react';
import { isReducedMotion } from '../lib/motion';

interface PreloaderProps {
  onComplete?: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (isReducedMotion()) {
      setIsVisible(false);
      onComplete?.();
      return;
    }

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsVisible(false);
            onComplete?.();
          }, 300);
          return 100;
        }
        return prev + 25;
      });
    }, 120);

    return () => clearInterval(interval);
  }, [onComplete]);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-obsidian text-alabaster transition-opacity duration-500 ${
        progress >= 100 ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="relative flex flex-col items-center max-w-sm px-6 text-center">
        {/* Animated Brand Crest */}
        <div className="w-16 h-16 mb-6 relative">
          <svg viewBox="0 0 48 48" fill="none" className="w-full h-full animate-pulse">
            <rect width="48" height="48" rx="12" fill="#24272D" />
            <path d="M12 34V14L24 7L36 14V34L24 41L12 34Z" stroke="#D95D39" strokeWidth="2.5" strokeLinejoin="round" />
            <path d="M24 7V41" stroke="#E5E0D8" strokeWidth="1.5" strokeDasharray="3 3" />
            <circle cx="24" cy="24" r="5" fill="#2E6F5E" />
          </svg>
        </div>

        {/* Brand Title */}
        <h1 className="font-display text-2xl font-bold tracking-tight text-white mb-2">
          CAMPUS<span className="text-terracotta">NEST</span>
        </h1>
        <p className="font-mono text-xs text-parchment-300 tracking-widest uppercase mb-8">
          Smart Student Housing & Co-Living
        </p>

        {/* Progress Bar & Metric */}
        <div className="w-48 h-1 bg-slate-800 rounded-full overflow-hidden mb-3">
          <div
            className="h-full bg-terracotta transition-all duration-200 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="flex items-center justify-between w-48 text-[11px] font-mono text-slate-400">
          <span>INITIALIZING</span>
          <span>{progress}%</span>
        </div>
      </div>
    </div>
  );
};
