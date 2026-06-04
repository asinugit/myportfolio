import styles from './Contact.module.css';

export default function Contact() {
  return (
    <main className={styles.main}>
      <div className={styles.leftCol}>
        <h1 className={styles.hugeText}>
          REACH<br/>
          TALK<br/>
          BUILD<br/>
          CONNECT
        </h1>
      </div>

      <div className={styles.rightCol}>
        <div className={styles.infoBlock}>
          <div className={styles.subtitle}>GET IN TOUCH</div>
          <p className={styles.description}>
            Open to new projects,<br/>
            collaborations &<br/>
            honest conversations.
          </p>
          
          <div className={styles.contactDetails}>
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>EMAIL</span>
              <a href="mailto:asinukumarage@gmail.com" className={styles.detailValue}>asinukumarage@gmail.com</a>
            </div>
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>PHONE</span>
              <span className={styles.detailValue}>+84 393 277 584</span>
            </div>
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>BASED</span>
              <span className={styles.detailValue}>Ho Chi Minh City</span>
            </div>
            
            <div className={styles.socialLinks}>
              <a href="#" className={styles.socialLink}>GITHUB ↗</a>
              <a href="#" className={styles.socialLink}>LINKEDIN ↗</a>
            </div>
          </div>
        </div>

        <div className={styles.verticalBadge}>
          <div className={styles.greenDot}></div>
          <span>AVAILABLE FOR WORK - 2026</span>
        </div>
      </div>
    </main>
  );
}
