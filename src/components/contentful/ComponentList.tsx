'use client';

import React from 'react';
import { useDispatch } from 'react-redux';
import { addComponent } from '../../store/layoutSlice';
import { ComponentConfig, HeroData, TwoColumnData, ImageGridData } from '../../types';
import styles from './ComponentList.module.css';

const ComponentList: React.FC = () => {
  const dispatch = useDispatch();

  const availableComponents = [
    {
      type: 'hero' as const,
      name: 'Hero Block',
      description: 'Heading, subtitle, CTA, background image',
      icon: '🎯',
      defaultData: {
        heading: 'Welcome to Our Site',
        subtitle: 'Discover amazing things with us',
        ctaText: 'Get Started',
        ctaUrl: '#',
        backgroundImage: {
          url: 'https://via.placeholder.com/1200x600/4A90E2/FFFFFF?text=Hero+Background',
          alt: 'Hero background'
        }
      } as HeroData
    },
    {
      type: 'twoColumn' as const,
      name: 'Two Column Row',
      description: 'Left content, right image',
      icon: '📐',
      defaultData: {
        left: {
          heading: 'Feature Section',
          subtitle: 'Learn about our amazing features',
          ctaText: 'Learn More',
          ctaUrl: '#'
        },
        right: {
          image: {
            url: 'https://via.placeholder.com/600x400/50C878/FFFFFF?text=Feature+Image',
            alt: 'Feature image'
          }
        }
      } as TwoColumnData
    },
    {
      type: 'imageGrid' as const,
      name: '2x2 Image Grid',
      description: 'Four images in a grid layout',
      icon: '🖼️',
      defaultData: {
        images: [
          {
            url: 'https://via.placeholder.com/300x300/FF6B6B/FFFFFF?text=Image+1',
            alt: 'Grid image 1',
            title: 'Image 1'
          },
          {
            url: 'https://via.placeholder.com/300x300/4ECDC4/FFFFFF?text=Image+2',
            alt: 'Grid image 2',
            title: 'Image 2'
          },
          {
            url: 'https://via.placeholder.com/300x300/45B7D1/FFFFFF?text=Image+3',
            alt: 'Grid image 3',
            title: 'Image 3'
          },
          {
            url: 'https://via.placeholder.com/300x300/96CEB4/FFFFFF?text=Image+4',
            alt: 'Grid image 4',
            title: 'Image 4'
          }
        ]
      } as ImageGridData
    }
  ];

  const handleAddComponent = (componentType: string, defaultData: HeroData | TwoColumnData | ImageGridData) => {
    const newComponent: ComponentConfig = {
      id: `component-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type: componentType as 'hero' | 'twoColumn' | 'imageGrid',
      order: 0, 
      data: defaultData
    };
    
    dispatch(addComponent(newComponent));
  };

  return (
    <div className={styles.componentList}>
      <h2 className={styles.title}>Components</h2>
      <p className={styles.subtitle}>Drag components to the canvas or click to add</p>
      
      <div className={styles.components}>
        {availableComponents.map((component) => (
          <div
            key={component.type}
            className={styles.componentItem}
            onClick={() => handleAddComponent(component.type, component.defaultData)}
            draggable
            onDragStart={(e) => {
              e.dataTransfer.setData('application/json', JSON.stringify({
                type: component.type,
                data: component.defaultData
              }));
            }}
          >
            <div className={styles.componentIcon}>{component.icon}</div>
            <div className={styles.componentInfo}>
              <h3 className={styles.componentName}>{component.name}</h3>
              <p className={styles.componentDescription}>{component.description}</p>
            </div>
            <div className={styles.addButton}>+</div>
          </div>
        ))}
      </div>
      
      <div className={styles.instructions}>
        <h3>Instructions</h3>
        <ul>
          <li>Click on a component to add it to the page</li>
          <li>Drag components on the canvas to reorder them</li>
          <li>Use the toolbar to save your changes</li>
          <li>Preview your page to see the final result</li>
        </ul>
      </div>
    </div>
  );
};

export default ComponentList; 