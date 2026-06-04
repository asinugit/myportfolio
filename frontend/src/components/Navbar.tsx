import Link from 'next/link';
import styles from './Navbar.module.css';

export default function Navbar() {
  return (
    <nav className={styles.nav}>
      <div className={styles.logo}>
        <Link href="/">Asinu</Link>
      </div>
      <div className={styles.centerLinks}>
        <Link href="/#section-02">Works</Link>,{' '}
        <Link href="/about">About</Link>,{' '}
        <Link href="/contact">Contact</Link>
      </div>
      <div className={styles.socialLinks}>
        <a href="https://github.com/asinugit" target="_blank" rel="noreferrer">Github</a>
        <a href="https://www.linkedin.com/in/asinuu" target="_blank" rel="noreferrer">LinkedIn</a>
        <a href="mailto:asinuu07@gmail.com">Email</a>
      </div>
    </nav>
  );
}
