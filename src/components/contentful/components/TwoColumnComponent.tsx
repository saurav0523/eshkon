/* eslint-disable @next/next/no-img-element */
'use client';

import React from 'react';
import { TwoColumnData } from '../../../types';
import styles from './TwoColumnComponent.module.css';

interface TwoColumnComponentProps {
  data: TwoColumnData;
}

const TwoColumnComponent: React.FC<TwoColumnComponentProps> = ({ data }) => {
  return (
    <div className={styles.twoColumn}>
      <div className={styles.leftColumn}>
        <h2 className={styles.heading}>{data.left.heading}</h2>
        <p className={styles.subtitle}>{data.left.subtitle}</p>
        <button className={styles.ctaButton}>
          {data.left.ctaText}
        </button>
      </div>
      <div className={styles.rightColumn}>
        <img 
          src={data.right.image.url} 
          alt={data.right.image.alt}
          className={styles.image}
        />
      </div>
    </div>
  );
};

export default TwoColumnComponent; 