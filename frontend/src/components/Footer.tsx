import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.left}>
        &copy; {new Date().getFullYear()} Portfolio
      </div>
      <div className={styles.right}>
        Coded by Asinu
      </div>
    </footer>
  );
}
