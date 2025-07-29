'use client';

import React from 'react';
import Image from 'next/image';
import { TwoColumnData } from '../../../types';
import styles from './TwoColumnSection.module.css';

interface TwoColumnSectionProps {
  data: TwoColumnData;
}

const TwoColumnSection: React.FC<TwoColumnSectionProps> = ({ data }) => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.leftColumn}>
            <h2 className={styles.heading}>{data.left.heading}</h2>
            <p className={styles.subtitle}>{data.left.subtitle}</p>
            <a href={data.left.ctaUrl} className={styles.ctaButton}>
              {data.left.ctaText}
            </a>
          </div>
          <div className={styles.rightColumn}>
            <div className={styles.imageWrapper}>
              <Image
                src={data.right.image.url}
                alt={data.right.image.alt}
                width={600}
                height={400}
                className={styles.image}
                sizes="(max-width: 768px) 100vw, 50vw"
                quality={85}
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TwoColumnSection; 