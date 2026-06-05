"use client";

import { useState } from 'react';
import Link from 'next/link';
import styles from './Works.module.css';

interface Project {
  id: string;
  title: string;
  category: 'web' | 'mobile' | 'design';
  tags: string;
  description: string;
  cover: string;          // Main thumbnail (first image shown in the list)
  images: string[];       // Additional screenshots shown when project is expanded
  hasCaseStudy: boolean;
  hasGithub: boolean;
  hasLiveDemo: boolean;
  githubUrl?: string;
  demoUrl?: string;
  caseStudyUrl?: string;
}

const projectsData: Project[] = [
  {
    id: 'greenvy',
    title: 'Greenvy – Sustainable Product Rating Platform',
    category: 'web',
    tags: 'web development · mobile apps',
    description:
      'A sustainability-focused platform aligned with SDG 12 that combines blog management, AI moderation, and an education hub to help users learn and publish responsible content.',
    // Drop cover.jpg → public/projects/greenvy/cover.jpg
    cover: '/projects/greenvy/cover.jpg',
    images: [
      '/projects/greenvy/01.jpg',
      '/projects/greenvy/02.jpg',
      '/projects/greenvy/03.jpg',
      '/projects/greenvy/04.jpg',
    ],
    hasCaseStudy: true,
    hasGithub: true,
    hasLiveDemo: true,
    githubUrl: 'https://github.com/asinugit',
    demoUrl: 'https://greenvy-demo.vercel.app',
    caseStudyUrl: '/works/greenvy',
  },
  {
    id: 'healthsync',
    title: 'HealthSync – AI-Powered Healthcare System',
    category: 'web',
    tags: 'web development · backend architecture',
    description:
      'A microservices-based healthcare platform connecting patients, doctors, and payments — built with Spring Boot, React, and MongoDB.',
    cover: '/projects/healthsync/cover.jpg',
    images: [
      '/projects/healthsync/01.jpg',
      '/projects/healthsync/02.jpg',
      '/projects/healthsync/03.jpg',
      '/projects/healthsync/04.jpg',
    ],
    hasCaseStudy: true,
    hasGithub: true,
    hasLiveDemo: false,
    githubUrl: 'https://github.com/asinugit/HealthSync',
    caseStudyUrl: '/works/healthsync',
  },
  {
    id: 'swiftride',
    title: 'SwiftRide – Urban Ride-Hailing Mobile App',
    category: 'mobile',
    tags: 'mobile apps · UI/UX design',
    description:
      'A cross-platform mobile application providing seamless ride-hailing and real-time navigation for urban commuters.',
    cover: '/projects/swiftride/cover.jpg',
    images: [
      '/projects/swiftride/01.jpg',
      '/projects/swiftride/02.jpg',
      '/projects/swiftride/03.jpg',
      '/projects/swiftride/04.jpg',
    ],
    hasCaseStudy: true,
    hasGithub: true,
    hasLiveDemo: false,
    githubUrl: 'https://github.com/asinugit',
    caseStudyUrl: '/works/swiftride',
  },
  {
    id: 'glassmorphism',
    title: 'Minimal Portfolio UI Design Concept',
    category: 'design',
    tags: 'design · visual system',
    description:
      'A premium dark mode UI concept showcasing high-end glassmorphism, dynamic typography layouts, and sleek smooth interactions.',
    cover: '/projects/glassmorphism/cover.jpg',
    images: [
      '/projects/glassmorphism/01.jpg',
      '/projects/glassmorphism/02.jpg',
      '/projects/glassmorphism/03.jpg',
      '/projects/glassmorphism/04.jpg',
    ],
    hasCaseStudy: false,
    hasGithub: false,
    hasLiveDemo: false,
  },
];

// Fallback placeholder if a local image is missing
const PLACEHOLDER = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop';

function ProjectCard({ project }: { project: Project }) {
  const [activeImg, setActiveImg] = useState(0);
  // All images = cover + extras (de-duplicated)
  const allImages = [project.cover, ...project.images];

  const handleImgError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    (e.target as HTMLImageElement).src = PLACEHOLDER;
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveImg((prev) => (prev === 0 ? allImages.length - 1 : prev - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveImg((prev) => (prev === allImages.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className={styles.projectCard}>
      {/* Main Image Viewer */}
      <div className={styles.projectImageWrapper}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={allImages[activeImg]}
          alt={`${project.title} screenshot ${activeImg + 1}`}
          className={styles.projectImage}
          onError={handleImgError}
        />

        {/* Navigation Arrows */}
        {allImages.length > 1 && (
          <>
            <button className={styles.arrowLeft} onClick={handlePrev} aria-label="Previous screenshot">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <button className={styles.arrowRight} onClick={handleNext} aria-label="Next screenshot">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </>
        )}

        {/* Thumbnail Strip */}
        {allImages.length > 1 && (
          <div className={styles.thumbStrip}>
            {allImages.map((img, i) => (
              <button
                key={i}
                className={`${styles.thumb} ${activeImg === i ? styles.thumbActive : ''}`}
                onClick={() => setActiveImg(i)}
                aria-label={`View screenshot ${i + 1}`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={img} alt="" onError={handleImgError} />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Project Details Row */}
      <div className={styles.projectDetails}>
        <div className={styles.detailsLeft}>
          <span className={styles.projectTags}>{project.tags}</span>
          <h3 className={styles.projectTitle}>{project.title}</h3>
        </div>

        <div className={styles.detailsRight}>
          <div className={styles.descriptionRow}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/developer.png"
              alt="Developer Avatar"
              className={styles.avatar}
              onError={handleImgError}
            />
            <p className={styles.projectDescText}>{project.description}</p>
          </div>

          {/* Action Links */}
          <div className={styles.projectLinks}>
            {project.hasCaseStudy && (
              <Link href={project.caseStudyUrl || '#'} className={styles.projectLink}>
                Read case study &rarr;
              </Link>
            )}
            {project.hasGithub && (
              <a
                href={project.githubUrl || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.projectLink}
              >
                GitHub ↗
              </a>
            )}
            {project.hasLiveDemo && (
              <a
                href={project.demoUrl || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.projectLink}
              >
                Live demo ↗
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Works() {
  const [filter, setFilter] = useState<'all' | 'web' | 'mobile' | 'design'>('all');

  const filteredProjects = projectsData.filter((p) =>
    filter === 'all' ? true : p.category === filter
  );

  const getCount = (cat: 'all' | 'web' | 'mobile' | 'design') =>
    cat === 'all' ? projectsData.length : projectsData.filter((p) => p.category === cat).length;

  return (
    <main className={styles.main}>
      {/* ── Hero ── */}
      <section className={styles.hero}>
        <div className={styles.sectionMeta}>
          <span className={styles.sectionNum}>01/</span>
        </div>

        <div className={styles.titleWrapper}>
          <h1 className={styles.titleLine1}>PROJECTS</h1>
          <h1 className={styles.titleLine2}>selected</h1>
          <span className={styles.projectCount}>0{projectsData.length}</span>
        </div>

        <div className={styles.centerIndicator}>
          <div className={styles.indicatorDot} />
        </div>

        <div className={styles.overviewSection}>
          <div className={styles.label}>OVERVIEW</div>
          <p className={styles.description}>
            Transforming complex business requirements into elegant digital products through
            meticulous system design, thoughtful user experience, and cutting-edge technology
            implementation.
          </p>
        </div>
      </section>

      {/* ── Projects Listing ── */}
      <section className={styles.projectsSection}>
        <h2 className={styles.sectionTitle}>projects</h2>

        {/* Filter Pills */}
        <div className={styles.filterContainer}>
          {(['all', 'web', 'mobile', 'design'] as const).map((cat) => (
            <button
              key={cat}
              className={`${styles.filterBtn} ${filter === cat ? styles.active : ''}`}
              onClick={() => setFilter(cat)}
            >
              {cat === 'all' && `All (${getCount('all')})`}
              {cat === 'web' && `Web Development (${getCount('web')})`}
              {cat === 'mobile' && `Mobile Apps (${getCount('mobile')})`}
              {cat === 'design' && `Design (${getCount('design')})`}
            </button>
          ))}
        </div>

        {/* Cards */}
        <div className={styles.projectsList}>
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>
    </main>
  );
}
