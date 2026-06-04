'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import styles from './Home.module.css';
import Link from 'next/link';

export default function Home() {
  const mainRef = useRef<HTMLElement>(null);
  const dragStart = useRef({ x: 0, y: 0 });
  const [dragPos, setDragPos] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);

  /* ── slide-in observer ── */
  useEffect(() => {
    const main = mainRef.current;
    if (!main) return;
    const sections = Array.from(main.querySelectorAll<HTMLElement>(`.${styles.section}`));
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add(styles.sectionVisible); }),
      { root: main, threshold: 0.12 }
    );
    sections.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  /* ── dark section → toggle html[data-ui="dark"] for nav/footer colour ── */
  useEffect(() => {
    const main = mainRef.current;
    if (!main) return;
    const darkEl = main.querySelector<HTMLElement>(`.${styles.sectionDark}`);
    if (!darkEl) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        document.documentElement.setAttribute('data-ui', entry.isIntersecting ? 'dark' : 'light');
      },
      { root: main, threshold: 0.3 }
    );
    obs.observe(darkEl);
    return () => obs.disconnect();
  }, []);

  /* ── drag handlers ── */
  const onDragStart = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    dragStart.current = { x: e.clientX - dragPos.x, y: e.clientY - dragPos.y };
  }, [dragPos]);

  const onDragMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging) return;
    setDragPos({ x: e.clientX - dragStart.current.x, y: e.clientY - dragStart.current.y });
  }, [isDragging]);

  const onDragEnd = useCallback(() => setIsDragging(false), []);

  /* ── scroll to section by index ── */
  const goTo = useCallback((i: number) => {
    mainRef.current?.scrollTo({ left: i * window.innerWidth, behavior: 'smooth' });
  }, []);

  return (
    <main
      className={styles.main}
      ref={mainRef}
      onMouseMove={onDragMove}
      onMouseUp={onDragEnd}
      onMouseLeave={onDragEnd}
    >

      {/* ══════════════════════════════════════
          SECTION 01 — Hero
      ══════════════════════════════════════ */}
      <section className={styles.section}>

        {/* W. Honors sidebar */}
        <div className={styles.honorsSidebar}>
          <span className={styles.honorsW}>W.</span>
          <span className={styles.honorsLabel}>Honors</span>
        </div>

        {/* Top row */}
        <div className={styles.s1Top}>
          <div className={styles.sectionMeta}>
            <span className={styles.sectionNum}>01/</span>
            <p className={styles.sectionSubtitle}>From Sri Lanka with<br />Love</p>
          </div>
          <h1 className={`${styles.hugeHeading} ${styles.alignRight}`}>
            CREATIVE<br />DEVELOPER
          </h1>
        </div>

        {/* Draggable photo */}
        <div className={styles.photoArea}>
          <div
            className={`${styles.photo} ${isDragging ? styles.dragging : ''}`}
            style={{ transform: `translate(${dragPos.x}px,${dragPos.y}px)` }}
            onMouseDown={onDragStart}
          >
            <span className={styles.dragLabel}>DRAG ME</span>
          </div>
        </div>

        {/* Bottom row */}
        <div className={styles.s1Bottom}>
          <h2 className={styles.nameHeading}>ASINU<br />KUMARAGE</h2>
          <div className={styles.locationBlock}>
            <button className={styles.arrowBtn} onClick={() => goTo(1)}>→</button>
            <p>I BASED IN<br />SRI LANKA,<br />PASSIONATE IN ARCHITECT &amp; UI</p>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          SECTION 02 — Skills
      ══════════════════════════════════════ */}
      <section className={styles.section} id="section-02">
        <div className={styles.s2Layout}>

          {/* Left col */}
          <div className={styles.s2Left}>
            <span className={styles.sectionNum}>02/</span>
            <p className={styles.descBlock}>
              I BUILD THE INFRASTRUCTURE<br />
              ______ BEHIND SEAMLESS<br />
              DIGITAL EXPERIENCES.
            </p>
            <div className={styles.shapes}>
              <div className={styles.shapeSquare}>
                <div className={styles.innerCircle} />
              </div>
              <div className={styles.shapeCircle}>
                <div className={styles.smile} />
              </div>
            </div>
          </div>

          {/* Right col */}
          <div className={styles.s2Right}>
            <h1 className={styles.hugeHeading}>
              DESIGN<br />
              <span className="text-orange">BACKEND</span><br />
              FRONTEND<br />
              FULLSTACK
            </h1>
            <Link href="/about" className={styles.moreBtn}>More About Me</Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          SECTION 03 — Work
      ══════════════════════════════════════ */}
      <section className={styles.section}>
        <div className={styles.s3Layout}>

          {/* Project icon */}
          <div className={styles.projectIcon}>
            <div className={styles.iconInner} />
          </div>

          {/* Browser mockup */}
          <div className={styles.browserMock}>
            <div className={styles.browserBar}>
              <span className={styles.dot} /><span className={styles.dot} /><span className={styles.dot} />
              <span className={styles.browserUrl}>healthsync.app</span>
            </div>
            <div className={styles.browserContent}>
              <div className={styles.mockNav} />
              <div className={styles.mockHero}>
                <div className={styles.mockHeroText}>
                  <div className={styles.mockLine} style={{ width: '60%' }} />
                  <div className={styles.mockLine} style={{ width: '80%' }} />
                  <div className={styles.mockLine} style={{ width: '45%' }} />
                </div>
                <div className={styles.mockBadge}>AI-Powered<br/>Healthcare</div>
              </div>
              <div className={styles.mockCards}>
                {[1,2,3].map(i => <div key={i} className={styles.mockCard} />)}
              </div>
            </div>
          </div>

          {/* Code snippet */}
          <div className={styles.codePanel}>
            <pre className={styles.codePre}>{`{
  "patient": {
    "id": "pt_001",
    "name": "Asinu K.",
    "status": "active"
  },
  "appointment": {
    "date": "2025-01-15",
    "doctor": "Dr. Silva",
    "type": "checkup"
  },
  "payment": {
    "amount": 2500,
    "currency": "LKR",
    "status": "paid"
  }
}`}</pre>
          </div>
        </div>

        {/* Project info bar */}
        <div className={styles.projectBar}>
          <div className={styles.projectNum}>03/</div>
          <div className={styles.projectName}>
            Health<br />Sync
          </div>
          <p className={styles.projectDesc}>
            (→)&nbsp;&nbsp;A microservices-based healthcare platform connecting patients,
            doctors and payments — built with Spring Boot, React &amp; MongoDB.
          </p>
          <div className={styles.projectMeta}>
            <span>2025</span>
            <span>Back-end Dev</span>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          SECTION 04 — Statement
      ══════════════════════════════════════ */}
      <section className={styles.section}>
        <div className={styles.s4Layout}>
          <span className={styles.sectionNum}>04/</span>

          <div className={styles.s4Tags}>
            <span>Creative<br />Developer</span>
            <span>+ Problem<br />Solver</span>
          </div>

          <p className={styles.s4Quote}>
            Crafting elegant solutions<br />to complex problems
          </p>

          <h1 className={styles.s4Name}>ASINU</h1>
        </div>
      </section>

      {/* ══════════════════════════════════════
          SECTION 05 — Contact (dark)
      ══════════════════════════════════════ */}
      <section className={`${styles.section} ${styles.sectionDark}`} data-dark="true">
        <div className={styles.s5Layout}>
          <h1 className={styles.chatHeading}>Let&apos;s have a chat</h1>

          <div className={styles.contactRow}>
            <a href="mailto:asinukumarage@gmail.com" className={styles.contactPill}>
              asinukumarage@gmail.com
            </a>
            <a href="tel:+94000000000" className={styles.contactPill}>
              +94 77 000 0000
            </a>
            <button className={styles.backPill} onClick={() => goTo(0)}>
              ← &nbsp; Back
            </button>
          </div>
        </div>
      </section>

    </main>
  );
}
