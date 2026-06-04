'use client';

import { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const onMove = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });

    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      // detect dark section
      const darkSection = t.closest('[data-dark="true"]');
      setIsDark(!!darkSection);
      // detect interactive elements
      const interactive =
        t.tagName === 'A' || t.tagName === 'BUTTON' ||
        !!t.closest('a') || !!t.closest('button');
      setIsHovering(interactive);
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseover', onOver);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
    };
  }, []);

  const classes = [
    'custom-cursor',
    isHovering ? 'hovering' : '',
    isDark ? 'dark' : '',
  ].filter(Boolean).join(' ');

  return (
    <div
      className={classes}
      style={{ left: `${pos.x}px`, top: `${pos.y}px` }}
    />
  );
}
