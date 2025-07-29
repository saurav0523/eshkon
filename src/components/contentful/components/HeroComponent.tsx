'use client';

import React from 'react';
import { HeroData } from '../../../types';
import styles from './HeroComponent.module.css';

interface HeroComponentProps {
  data: HeroData;
}

const HeroComponent: React.FC<HeroComponentProps> = ({ data }) => {
  return (
    <div className={styles.hero}>
      {data.backgroundImage && (
        <div 
          className={styles.backgroundImage}
          style={{ backgroundImage: `url(${data.backgroundImage.url})` }}
        />
      )}
      <div className={styles.overlay} />
      <div className={styles.content}>
        <h1 className={styles.heading}>{data.heading}</h1>
        <p className={styles.subtitle}>{data.subtitle}</p>
        <button className={styles.ctaButton}>
          {data.ctaText}
        </button>
      </div>
    </div>
  );
};

export default HeroComponent; 