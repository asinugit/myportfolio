'use client';

import { useEffect, useRef, useState } from 'react';

interface Ripple {
  x: number;
  y: number;
  age: number;
  maxAge: number;
  baseRadius: number;
  freq: number;
  phase: number;
}

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [hoverText, setHoverText] = useState('');
  
  const mouseRef = useRef({ x: 0, y: 0 });
  const ringRef = useRef({ x: 0, y: 0 });
  const dotRef = useRef({ x: 0, y: 0 });
  
  const ringElRef = useRef<HTMLDivElement>(null);
  const dotElRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const ripplesRef = useRef<Ripple[]>([]);
  const lastRipplePos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (window.innerWidth > 768) {
      document.body.style.cursor = 'none';
    }

    // Canvas sizing setup
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.scale(dpr, dpr);
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const onMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };

      // Calculate distance from last ripple point
      const dx = e.clientX - lastRipplePos.current.x;
      const dy = e.clientY - lastRipplePos.current.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Add a new topographic ripple point if moved far enough
      if (dist > 18) {
        ripplesRef.current.push({
          x: e.clientX,
          y: e.clientY,
          age: 0,
          maxAge: 75, // frames (~1.2s)
          baseRadius: 10,
          freq: 4 + Math.random() * 3, // wave frequency
          phase: Math.random() * Math.PI * 2
        });
        lastRipplePos.current = { x: e.clientX, y: e.clientY };
      }
    };

    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (!t) return;

      const darkSection = t.closest('[data-dark="true"]');
      setIsDark(!!darkSection);

      const isLink = t.tagName === 'A' || t.tagName === 'BUTTON' || !!t.closest('a') || !!t.closest('button');
      setIsHovering(isLink);

      const imageWrapper = t.closest(`[class*="projectImageWrapper"]`);
      const arrowBtn = t.closest(`[class*="arrowLeft"]`) || t.closest(`[class*="arrowRight"]`);
      const thumbBtn = t.closest(`[class*="thumb"]`);

      if (arrowBtn || thumbBtn) {
        setHoverText('');
        setIsHovering(true);
      } else if (imageWrapper) {
        setHoverText('VIEW');
      } else {
        setHoverText('');
      }
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseover', onOver);

    // Wobbly circle generator for topography contour style
    const drawWobblyCircle = (
      c: CanvasRenderingContext2D,
      cx: number,
      cy: number,
      r: number,
      freq: number,
      phase: number,
      amp: number
    ) => {
      c.beginPath();
      const steps = 64;
      for (let i = 0; i <= steps; i++) {
        const angle = (i / steps) * Math.PI * 2;
        const distortion = Math.sin(angle * freq + phase) * amp;
        const rad = Math.max(1, r + distortion);
        const px = cx + Math.cos(angle) * rad;
        const py = cy + Math.sin(angle) * rad;
        if (i === 0) {
          c.moveTo(px, py);
        } else {
          c.lineTo(px, py);
        }
      }
      c.closePath();
      c.stroke();
    };

    let animFrameId: number;

    const render = () => {
      // 1. Update Lerping physics for custom cursor elements
      ringRef.current.x += (mouseRef.current.x - ringRef.current.x) * 0.12;
      ringRef.current.y += (mouseRef.current.y - ringRef.current.y) * 0.12;

      dotRef.current.x += (mouseRef.current.x - dotRef.current.x) * 0.25;
      dotRef.current.y += (mouseRef.current.y - dotRef.current.y) * 0.25;

      if (ringElRef.current) {
        ringElRef.current.style.transform = `translate3d(${ringRef.current.x}px, ${ringRef.current.y}px, 0) translate(-50%, -50%)`;
      }
      if (dotElRef.current) {
        dotElRef.current.style.transform = `translate3d(${dotRef.current.x}px, ${dotRef.current.y}px, 0) translate(-50%, -50%)`;
      }

      // 2. Draw Topography Canvas Trail
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      
      ripplesRef.current = ripplesRef.current.filter((rpl) => {
        rpl.age += 1;
        if (rpl.age >= rpl.maxAge) return false;

        const progress = rpl.age / rpl.maxAge;
        const opacity = (1 - progress) * 0.055; // subtle topo styling
        
        ctx.strokeStyle = isDark 
          ? `rgba(232, 220, 200, ${opacity})` 
          : `rgba(10, 10, 10, ${opacity})`;
        ctx.lineWidth = 1;

        const currentRadius = rpl.baseRadius + progress * 65;
        const waveAmp = 5 * (1 - progress);

        // Draw 3 concentric wobbly topography contours
        // Outer concentric
        drawWobblyCircle(
          ctx, 
          rpl.x, 
          rpl.y, 
          currentRadius * 1.6, 
          rpl.freq, 
          rpl.phase + progress * 1.0, 
          waveAmp * 1.6
        );
        // Middle concentric
        drawWobblyCircle(
          ctx, 
          rpl.x, 
          rpl.y, 
          currentRadius * 1.3, 
          rpl.freq, 
          rpl.phase + progress * 1.4, 
          waveAmp * 1.3
        );
        // Inner concentric
        drawWobblyCircle(
          ctx, 
          rpl.x, 
          rpl.y, 
          currentRadius, 
          rpl.freq, 
          rpl.phase + progress * 1.8, 
          waveAmp
        );

        return true;
      });

      animFrameId = requestAnimationFrame(render);
    };

    animFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animFrameId);
    };
  }, [isDark]);

  const ringClasses = [
    'custom-cursor-ring',
    isHovering ? 'hovering' : '',
    isDark ? 'dark' : '',
    hoverText ? 'has-text' : '',
  ].filter(Boolean).join(' ');

  const dotClasses = [
    'custom-cursor-dot',
    isHovering ? 'hovering' : '',
    isDark ? 'dark' : '',
    hoverText ? 'has-text' : '',
  ].filter(Boolean).join(' ');

  return (
    <>
      <canvas
        ref={canvasRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          pointerEvents: 'none',
          zIndex: 9998,
        }}
      />
      <div ref={ringElRef} className={ringClasses}>
        {hoverText && <span className="cursor-text">{hoverText}</span>}
      </div>
      <div ref={dotElRef} className={dotClasses} />
    </>
  );
}
