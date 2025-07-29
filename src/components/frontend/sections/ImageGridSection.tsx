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