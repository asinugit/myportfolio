"use client";

import { useState } from 'react';
import styles from './About.module.css';

export default function About() {
  const [activeCert, setActiveCert] = useState<string | null>(null);
  return (
    <main className={styles.main}>
      <section className={styles.heroSection}>
        <div className={styles.sectionNumber}>01/</div>
        <h1 className="heading-large">
          ASINU<br />KUMARAGE
        </h1>
      </section>

      <section className={styles.introSection}>
        <div className={styles.label}>HI THERE</div>
        <div className={styles.textContent}>
          <p>
            I&apos;m a software engineer focusing on backend systems
            for fintech, blending engineering discipline with modern
            web craftsman-ship.
          </p>
          <br />
          <p>
            I care about simplicity, technical depth, and long-term
            stability. Whether I&apos;m designing an API or shaping a
            frontend flow, I prioritize precision and a calm,
            intentional pace.
          </p>
        </div>
      </section>

      {/* Certificates and Licenses */}
      <section className={styles.certSection}>
        <div className={styles.sectionNumber}>02/</div>
        <h2 className={styles.certHeading}>Certificates and Licenses</h2>

        <div className={styles.certCard}>
          <div className={styles.certImageWrapper} onClick={() => setActiveCert('/nodejs-cert.png')} style={{ cursor: 'pointer' }}>
            <img src="/nodejs-cert.png" alt="Node.js Certificate" className={styles.certImage} />
          </div>
          <div className={styles.certContent}>
            <div className={styles.certHeader}>
              <div>
                <h3 className={styles.certTitle}>Node.js</h3>
                <span className={styles.certBadge}>Certified Developer</span>
              </div>
              <span className={styles.certYear}>2024</span>
            </div>
            <p className={styles.certDesc}>
              Official certification demonstrating expertise in Node.js runtime environment,
              server-side JavaScript development, and modern backend technologies.
            </p>
          </div>
        </div>
        <hr className={styles.certDivider} />

        <div className={styles.certCard}>
          <div className={styles.certImageWrapper} onClick={() => setActiveCert('/mongodb-cert.png')} style={{ cursor: 'pointer' }}>
            <img src="/mongodb-cert.png" alt="MongoDB Certificate" className={styles.certImage} />
          </div>
          <div className={styles.certContent}>
            <div className={styles.certHeader}>
              <div>
                <h3 className={styles.certTitle}>MongoDB</h3>
                <span className={styles.certBadge}>Node.js Developer Path</span>
              </div>
              <span className={styles.certYear}>2025</span>
            </div>
            <p className={styles.certDesc}>
              Proof of Completion for the MongoDB Node.js Developer Path, covering database design,
              CRUD operations, aggregation pipelines, and Atlas integration.
            </p>
          </div>
        </div>
        <hr className={styles.certDivider} />
      </section>

      {/* Studies */}
      <section className={styles.studiesSection}>
        <h2 className={styles.studiesHeading}>Studies</h2>

        <div className={styles.studyCard}>
          <h3 className={styles.studyInstitution}>Sri Lanka Institute of Information Technology</h3>
          <p className={styles.studyDesc}>Studied software engineering.</p>
        </div>
      </section>

      <section className={styles.imageSection}>
        <div className={styles.imageWrapper}>
          <div className={styles.trainImage}></div>
        </div>
      </section>

      <section className={styles.skillsSection}>
        <div className={styles.skillRow}>
          <div className={styles.label}>DEVELOPMENT</div>
          <div className={styles.skillList}>
            <p>Backend Engineering</p>
            <p>API Design</p>
            <p>Database Design</p>
            <p>Query Optimization</p>
            <p>Background Jobs</p>
            <p>Testing & QA</p>
          </div>
        </div>
        
        <hr className={styles.divider} />

        <div className={styles.skillRow}>
          <div className={styles.label}>INTERFACE</div>
          <div className={styles.skillList}>
            <p>Frontend Engineering</p>
            <p>Micro-interaction</p>
            <p>CSS Animation</p>
            <p>UI Tooling</p>
          </div>
        </div>

        <hr className={styles.divider} />

        <div className={styles.skillRow}>
          <div className={styles.label}>TECHNOLOGIES</div>
          <div className={styles.skillList}>
            <p>Ruby • Rails • Postgres • Redis</p>
            <p>React.js • Lit • TailwindCSS • MUI</p>
            <p>GSAP • Framer Motion</p>
            <p>Docker • Jenkins • Ansible • Github Actions</p>
          </div>
        </div>
      </section>

      {/* Interests Section */}
      <section className={styles.interestsSection}>
        <div className={styles.sectionNumber}>04/</div>
        <h1 className="heading-large">INTERESTS</h1>
        
        <div className={styles.interestRow}>
          <div className={styles.label}>MOTORBIKE ROAD<br/>TRIPS</div>
          <div className={styles.textContent}>
            <p>
              I love the feeling of freedom on a motorbike. On
              weekends, I often grab a friend and just ride around
              with no specific destination in mind.
              I&apos;ve done a few multi-day trips—my butt hurt but it was
              fun. Prefer exploring less-traveled roads over popular
              tourist spots.
            </p>
          </div>
        </div>

        <div className={styles.interestRow}>
          <div className={styles.label}>PLAYING GAME</div>
          <div className={styles.textContent}>
            <p>
              Whenever I have free time in the evening, I play a few
              rounds—sometimes ranked, sometimes just casual.
              Sometimes gaming is just my way to unwind after a long
              day of coding.
            </p>
          </div>
        </div>
      </section>

      {/* Trip Notes Section */}
      <section className={styles.tripNotesSection}>
        <div className={styles.tripGrid}>
          <div className={`${styles.tripImg} ${styles.img1}`}></div>
          <div className={`${styles.tripImg} ${styles.img2}`}></div>
          <div className={`${styles.tripImg} ${styles.img3}`}></div>
          <div className={`${styles.tripImg} ${styles.img4}`}></div>
          <div className={`${styles.tripImg} ${styles.img5}`}></div>
          <div className={`${styles.tripImg} ${styles.img6}`}></div>
          <div className={`${styles.tripImg} ${styles.img7}`}></div>
        </div>
        <div className={styles.tripTitleWrapper}>
          <h1 className={styles.tripTitle}>
            TRIP<br/>NOTES
          </h1>
        </div>
      </section>

      {/* Let's have a chat section */}
      <section className={styles.chatSection}>
        <hr className={styles.chatDivider} />
        <div className={styles.chatHeader}>
          <div className={styles.chatContact}>
            <a href="mailto:asinukumarage@gmail.com">asinukumarage@gmail.com</a>
            <span>+84 393 277 584</span>
          </div>
          <div className={styles.chatSocial}>
            <a href="#">Github</a>
            <a href="#">LinkedIn</a>
            <a href="#" className={styles.backToTop}>Back to top &uarr;</a>
          </div>
        </div>
        
        <div className={styles.hugeChatTextWrapper}>
          <h1 className={styles.hugeChatText}>
            Let&apos;s have a chat
          </h1>
        </div>
      </section>

      {/* Certificate Modal Lightbox */}
      {activeCert && (
        <div className={styles.modalOverlay} onClick={() => setActiveCert(null)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <img src={activeCert} alt="Certificate Zoom" className={styles.modalImage} />
            <button className={styles.closeBtn} onClick={() => setActiveCert(null)}>
              &times;
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
