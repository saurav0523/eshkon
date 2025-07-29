import React from 'react';
import Link from 'next/link';
import styles from './page.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <span className={styles.highlight}>Page Builder</span>
        </h1>
        
        <p className={styles.description}>
          A powerful Contentful App for building beautiful landing pages with drag-and-drop functionality.
        </p>
        
        <div className={styles.features}>
          <div className={styles.feature}>
            <h3>🎨 Visual Page Builder</h3>
            <p>Drag and drop components to create stunning landing pages</p>
          </div>
          <div className={styles.feature}>
            <h3>📱 Responsive Design</h3>
            <p>All components are fully responsive and mobile-friendly</p>
          </div>
          <div className={styles.feature}>
            <h3>⚡ Performance Optimized</h3>
            <p>Built with Next.js for optimal performance and SEO</p>
          </div>
        </div>
        
        <div className={styles.actions}>
          <Link href="/contentful-app" className={styles.primaryButton}>
            Open Page Builder
          </Link>
          <div className={styles.secondaryActions}>
            <Link href="/landing/page-1" className={styles.secondaryButton}>
              View Page 1
            </Link>
            <Link href="/landing/page-2" className={styles.secondaryButton}>
              View Page 2
            </Link>
          </div>
        </div>
      </main>
      
      <footer className={styles.footer}>
        <p>Built with Next.js, TypeScript, and Contentful</p>
      </footer>
    </div>
  );
}
