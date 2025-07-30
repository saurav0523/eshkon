/* eslint-disable @next/next/no-img-element */
'use client';

import React from 'react';
import { ImageGridData } from '../../../types';
import styles from './ImageGridComponent.module.css';

interface ImageGridComponentProps {
  data: ImageGridData;
}

const ImageGridComponent: React.FC<ImageGridComponentProps> = ({ data }) => {
  return (
    <div className={styles.imageGrid}>
      <div className={styles.grid}>
        {data.images.map((image, index) => (
          <div key={index} className={styles.gridItem}>
            <img 
              src={image.url} 
              alt={image.alt}
              className={styles.image}
            />
            {image.title && (
              <div className={styles.imageTitle}>
                {image.title}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageGridComponent; 