"use client";

import { useState, useEffect } from 'react';
import Splash from './Splash';

// Module-level variable persists in memory during client-side navigation
// but resets on a full browser page refresh.
let hasPlayedGlobal = false;

export default function SplashWrapper({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(!hasPlayedGlobal);

  useEffect(() => {
    if (hasPlayedGlobal) {
      setLoading(false);
      return;
    }

    const timer = setTimeout(() => {
      setLoading(false);
      hasPlayedGlobal = true;
    }, 3200); // 2.4s delay + 0.8s slide exit animation
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading && <Splash />}
      <div style={{ 
        opacity: loading ? 0 : 1, 
        transition: 'opacity 0.6s cubic-bezier(0.25, 1, 0.5, 1)',
        minHeight: '100vh'
      }}>
        {children}
      </div>
    </>
  );
}
