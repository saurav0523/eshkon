'use client';

import React from 'react';
import Image from 'next/image';
import { ImageGridData } from '../../../types';
import styles from './ImageGridSection.module.css';

interface ImageGridSectionProps {
  data: ImageGridData;
}

const ImageGridSection: React.FC<ImageGridSectionProps> = ({ data }) => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {data.images.map((image, index) => (
            <div key={index} className={styles.gridItem}>
              <div className={styles.imageWrapper}>
                <Image
                  src={image.url}
                  alt={image.alt}
                  width={400}
                  height={400}
                  className={styles.image}
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                  quality={85}
                  loading={index < 2 ? "eager" : "lazy"}
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                />
                {image.title && (
                  <div className={styles.imageTitle}>
                    {image.title}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImageGridSection; 