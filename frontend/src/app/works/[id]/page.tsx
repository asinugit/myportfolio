"use client";

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from './CaseStudy.module.css';

interface CaseStudyData {
  title: string;
  date: string;
  author: string;
  githubUrl?: string;
  demoUrl?: string;
  coverImage: string;
  overview: string;
  keyFeatures: string[];
  technologies: string[];
}

export default function CaseStudyPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;
  
  const [data, setData] = useState<CaseStudyData | null>(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    
    setLoading(true);
    setError(false);
    
    fetch(`/projects/${id}/case-study.json`)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Case study not found');
        }
        return res.json();
      })
      .then((jsonData) => {
        setData(jsonData);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, [id]);

  const formatBoldText = (text: string) => {
    const parts = text.split('**');
    return parts.map((part, index) => 
      index % 2 === 1 ? <strong key={index} className={styles.boldLead}>{part}</strong> : part
    );
  };

  if (loading) {
    return (
      <main className={styles.loadingMain}>
        <div className={styles.spinner} />
        <p>Loading Case Study...</p>
      </main>
    );
  }

  if (error || !data) {
    return (
      <main className={styles.errorMain}>
        <h2>Case Study Not Found</h2>
        <p>Could not load the details for project: <strong>{id}</strong></p>
        <Link href="/works" className={styles.backBtn}>
          &larr; Back to Projects
        </Link>
      </main>
    );
  }

  return (
    <main className={styles.main}>
      {/* Back button at the very top left */}
      <div className={styles.topNav}>
        <button onClick={() => router.back()} className={styles.backLink}>
          &larr; Back
        </button>
      </div>

      {/* Header Info */}
      <header className={styles.header}>
        <span className={styles.sectionLabel}>Projects</span>
        <span className={styles.date}>{data.date}</span>
        
        <h1 className={styles.title}>{data.title}</h1>
        
        <div className={styles.authorRow}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/developer.png" alt={data.author} className={styles.avatar} />
          <span className={styles.authorName}>{data.author}</span>
        </div>

        {/* Top Actions */}
        <div className={styles.actionsRow}>
          {data.githubUrl && (
            <a href={data.githubUrl} target="_blank" rel="noopener noreferrer" className={styles.primaryAction}>
              GitHub 
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className={styles.icon}>
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
            </a>
          )}
          {data.demoUrl && (
            <a href={data.demoUrl} target="_blank" rel="noopener noreferrer" className={styles.secondaryAction}>
              Live demo
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className={styles.icon}>
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
            </a>
          )}
        </div>
      </header>

      {/* Main Image Banner */}
      <div className={styles.imageContainer}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img 
          src={data.coverImage} 
          alt={data.title} 
          className={styles.bannerImage}
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop';
          }}
        />
      </div>

      {/* Scroll down detailed info */}
      <section className={styles.detailsSection}>
        {/* Overview */}
        <div className={styles.detailBlock}>
          <h2 className={styles.detailHeading}>Overview</h2>
          <p className={styles.overviewText}>{data.overview}</p>
        </div>

        {/* Key Features */}
        <div className={styles.detailBlock}>
          <h2 className={styles.detailHeading}>Key Features</h2>
          <ul className={styles.featuresList}>
            {data.keyFeatures.map((feat, idx) => (
              <li key={idx} className={styles.featureItem}>
                {formatBoldText(feat)}
              </li>
            ))}
          </ul>
        </div>

        {/* Technologies Used */}
        <div className={styles.detailBlock}>
          <h2 className={styles.detailHeading}>Technologies Used</h2>
          <ul className={styles.techList}>
            {data.technologies.map((tech, idx) => (
              <li key={idx} className={styles.techItem}>
                {tech}
              </li>
            ))}
          </ul>
        </div>

        {/* Links */}
        <div className={styles.detailBlock}>
          <h2 className={styles.detailHeading}>Links</h2>
          <div className={styles.bottomLinks}>
            {data.demoUrl && (
              <a href={data.demoUrl} target="_blank" rel="noopener noreferrer" className={styles.primaryAction}>
                Live demo
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className={styles.icon}>
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
              </a>
            )}
            {data.githubUrl && (
              <a href={data.githubUrl} target="_blank" rel="noopener noreferrer" className={styles.secondaryAction}>
                GitHub
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className={styles.icon}>
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
              </a>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
