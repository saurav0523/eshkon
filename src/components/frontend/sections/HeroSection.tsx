'use client';

import React from 'react';
import Image from 'next/image';
import { HeroData } from '../../../types';
import styles from './HeroSection.module.css';

interface HeroSectionProps {
  data: HeroData;
}

const HeroSection: React.FC<HeroSectionProps> = ({ data }) => {
  return (
    <section className={styles.hero}>
      {data.backgroundImage && (
        <div className={styles.backgroundImage}>
          <Image
            src={data.backgroundImage.url}
            alt={data.backgroundImage.alt}
            fill
            style={{ objectFit: 'cover' }}
            priority
            sizes="100vw"
            quality={85}
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
          />
        </div>
      )}
      <div className={styles.overlay} />
      <div className={styles.content}>
        <div className={styles.container}>
          <h1 className={styles.heading}>{data.heading}</h1>
          <p className={styles.subtitle}>{data.subtitle}</p>
          <a href={data.ctaUrl} className={styles.ctaButton}>
            {data.ctaText}
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection; 