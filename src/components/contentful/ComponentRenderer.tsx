'use client';

import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { ComponentConfig, HeroData, TwoColumnData, ImageGridData } from '../../types';
import HeroComponent from './components/HeroComponent';
import TwoColumnComponent from './components/TwoColumnComponent';
import ImageGridComponent from './components/ImageGridComponent';
import styles from './ComponentRenderer.module.css';

interface ComponentRendererProps {
  components: ComponentConfig[];
}

interface SortableComponentProps {
  component: ComponentConfig;
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

const SortableComponent: React.FC<SortableComponentProps> = ({ component }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: component.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const renderComponent = () => {
    switch (component.type) {
      case 'hero':
        if (isHeroData(component.data)) {
          return <HeroComponent data={component.data} />;
        }
        break;
      case 'twoColumn':
        if (isTwoColumnData(component.data)) {
          return <TwoColumnComponent data={component.data} />;
        }
        break;
      case 'imageGrid':
        if (isImageGridData(component.data)) {
          return <ImageGridComponent data={component.data} />;
        }
        break;
      default:
        return <div>Unknown component type</div>;
    }
    return <div>Invalid component data</div>;
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`${styles.componentWrapper} ${isDragging ? styles.dragging : ''}`}
      {...attributes}
      {...listeners}
    >
      <div className={styles.componentHeader}>
        <span className={styles.componentType}>{component.type}</span>
        <span className={styles.componentOrder}>#{component.order + 1}</span>
      </div>
      <div className={styles.componentContent}>
        {renderComponent()}
      </div>
    </div>
  );
};

const ComponentRenderer: React.FC<ComponentRendererProps> = ({ components }) => {
  if (components.length === 0) {
    return (
      <div className={styles.emptyState}>
        <div className={styles.emptyStateContent}>
          <h3>No components yet</h3>
          <p>Add components from the sidebar to start building your page</p>
          <div className={styles.emptyStateIcon}>📄</div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.canvasContent}>
      {components.map((component) => (
        <SortableComponent key={component.id} component={component} />
      ))}
    </div>
  );
};

export default ComponentRenderer; 