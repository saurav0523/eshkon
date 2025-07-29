'use client';

import React from 'react';
import Link from 'next/link';
import styles from './Navigation.module.css';

const Navigation: React.FC = () => {
  return (
    <nav className={styles.navigation}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Link href="/" className={styles.logoLink}>
            Page Builder
          </Link>
        </div>
        
        <ul className={styles.navLinks}>
          <li>
            <Link href="/landing/page-1" className={styles.navLink}>
              Page 1
            </Link>
          </li>
          <li>
            <Link href="/landing/page-2" className={styles.navLink}>
              Page 2
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navigation; 