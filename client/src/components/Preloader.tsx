/*
From Uiverse.io by anand_4957 - https://uiverse.io/anand_4957/moody-ladybug-99
MIT License, Copyright (c) anand_4957 (Anand Kotadiya)
*/
import React, { useEffect, useState } from 'react';
import { isReducedMotion } from '../lib/motion';
import styles from './Preloader.module.css';

interface PreloaderProps {
  onComplete?: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [fading, setFading] = useState(false);

  const dismiss = () => {
    setFading(true);
    setTimeout(() => {
      setIsVisible(false);
      onComplete?.();
    }, 300);
  };

  useEffect(() => {
    if (isReducedMotion()) {
      setIsVisible(false);
      onComplete?.();
      return;
    }

    // Fade out cleanly after ~1.1s; hard safety timeout ensures it never blocks UI
    const fadeTimer = setTimeout(() => setFading(true), 950);
    const hideTimer = setTimeout(() => {
      setIsVisible(false);
      onComplete?.();
    }, 1300);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, [onComplete]);

  if (!isVisible) return null;

  return (
    <div
      role="status"
      aria-label="Loading CampusNest Moodbidri"
      className={`${styles.overlay} ${fading ? styles.overlayHidden : ''}`}
    >
      <div className={styles.longfazers} aria-hidden="true">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>

      <div className={styles.stage} aria-hidden="true">
        <div className={styles.loader}>
          <span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </span>
          <div className={styles.base}>
            <span></span>
            <div className={styles.face}></div>
          </div>
        </div>
      </div>

      <div className="mt-4 text-center px-6 relative z-10">
        <div className="font-display font-extrabold text-lg tracking-tight text-obsidian" translate="no">
          CAMPUS<span className="text-terracotta">NEST</span>
        </div>
        <p className="font-mono text-xs text-slate-700 tracking-wide mt-1">
          Loading CampusNest Moodbidri…
        </p>
        <button
          type="button"
          onClick={dismiss}
          className="mt-4 font-mono text-[11px] uppercase tracking-wider text-slate-600 hover:text-obsidian underline underline-offset-4"
        >
          Skip Intro
        </button>
      </div>
    </div>
  );
};
