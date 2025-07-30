'use client';

import React from 'react';
import { ComponentConfig, HeroData, TwoColumnData, ImageGridData } from '../../types';
import HeroSection from './sections/HeroSection';
import TwoColumnSection from './sections/TwoColumnSection';
import ImageGridSection from './sections/ImageGridSection';
import styles from './LandingPageRenderer.module.css';

interface LandingPageRendererProps {
  components: ComponentConfig[];
}

const isHeroData = (data: HeroData | TwoColumnData | ImageGridData): data is HeroData => {
  return 'heading' in data && 'subtitle' in data && 'ctaText' in data && 'ctaUrl' in data;
};

const isTwoColumnData = (data: HeroData | TwoColumnData | ImageGridData): data is TwoColumnData => {
  return 'left' in data && 'right' in data;
};

const isImageGridData = (data: HeroData | TwoColumnData | ImageGridData): data is ImageGridData => {
  return 'images' in data;
};

const LandingPageRenderer: React.FC<LandingPageRendererProps> = ({ components }) => {
  const renderComponent = (component: ComponentConfig) => {
    switch (component.type) {
      case 'hero':
        if (isHeroData(component.data)) {
          return <HeroSection key={component.id} data={component.data} />;
        }
        break;
      case 'twoColumn':
        if (isTwoColumnData(component.data)) {
          return <TwoColumnSection key={component.id} data={component.data} />;
        }
        break;
      case 'imageGrid':
        if (isImageGridData(component.data)) {
          return <ImageGridSection key={component.id} data={component.data} />;
        }
        break;
      default:
        return <div key={component.id}>Unknown component type: {component.type}</div>;
    }
    return <div key={component.id}>Invalid component data</div>;
  };

  return (
    <main className={styles.main}>
      {components.length === 0 ? (
        <div className={styles.emptyState}>
          <h1>No content available</h1>
          <p>This page has no components configured yet.</p>
        </div>
      ) : (
        components
          .sort((a, b) => a.order - b.order)
          .map(renderComponent)
      )}
    </main>
  );
};

export default LandingPageRenderer; 