"use client";

import { useState } from 'react';
import Link from 'next/link';
import styles from './Navbar.module.css';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <nav className={styles.nav}>
        <div className={styles.logo}>
          <Link href="/">Asinu</Link>
        </div>
        <div className={styles.centerLinks}>
          <Link href="/works">Works</Link>,{' '}
          <Link href="/about">About</Link>,{' '}
          <Link href="/contact">Contact</Link>
        </div>
        <div className={styles.socialLinks}>
          <a href="https://github.com/asinugit" target="_blank" rel="noreferrer">Github</a>
          <a href="https://www.linkedin.com/in/asinuu" target="_blank" rel="noreferrer">LinkedIn</a>
          <a href="mailto:asinuu07@gmail.com">Email</a>
        </div>
        <button className={styles.menuBtn} onClick={() => setIsOpen(true)}>
          Menu
        </button>
      </nav>

      {isOpen && (
        <div className={styles.menuOverlay}>
          <div className={styles.overlayHeader}>
            <div className={styles.overlayLogo}>Asinu</div>
            <button className={styles.closeBtn} onClick={() => setIsOpen(false)}>
              Close
            </button>
          </div>
          <div className={styles.overlayContent}>
            <div className={styles.overlayItem}>
              <span className={styles.overlayLabel}>intro</span>
              <Link href="/" onClick={() => setIsOpen(false)}>HOME</Link>
            </div>
            <div className={styles.overlayItem}>
              <Link href="/works" onClick={() => setIsOpen(false)}>WORKS</Link>
            </div>
            <div className={styles.overlayItem}>
              <Link href="/about" onClick={() => setIsOpen(false)}>ABOUT</Link>
            </div>
            <div className={styles.overlayItem}>
              <Link href="/contact" onClick={() => setIsOpen(false)}>CONTACT</Link>
            </div>
          </div>
          <div className={styles.overlayFooter}>
            <div className={styles.overlayEmail}>asinuu07@gmail.com</div>
            <div className={styles.overlaySocials}>
              <a href="https://github.com/asinugit" target="_blank" rel="noreferrer">Github</a>
              <a href="https://www.linkedin.com/in/asinuu" target="_blank" rel="noreferrer">LinkedIn</a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
