import styles from './Splash.module.css';

export default function Splash() {
  return (
    <div className={styles.splashContainer}>
      <div className={styles.content}>
        <h1 className={styles.name}>ASINU</h1>
        <div className={styles.line} />
        <p className={styles.subtitle}>SOFTWARE ENGINEER UNDERGRADUATE!</p>
      </div>
    </div>
  );
}
