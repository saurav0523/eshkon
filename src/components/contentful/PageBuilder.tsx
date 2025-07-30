'use client';

import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DndContext, DragEndEvent, closestCenter } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import type { ComponentConfig, RootState } from '../../types';
import { setComponents, reorderComponents, markSaved } from '../../store/layoutSlice';
import ComponentList from './ComponentList';
import ComponentRenderer from './ComponentRenderer';
import Toolbar from './Toolbar';
import styles from './PageBuilder.module.css';

interface MockSDK {
  field: {
    getValue: () => { components?: ComponentConfig[] } | null;
    setValue: (value: { components: ComponentConfig[]; lastUpdated: string }) => Promise<void>;
    onValueChanged: (callback: (value: { components?: ComponentConfig[] } | undefined) => void) => void;
  };
  parameters: {
    instance?: {
      previewUrl?: string;
    };
  };
}

interface PageBuilderProps {
  sdk: MockSDK;
}

const PageBuilder: React.FC<PageBuilderProps> = ({ sdk }) => {
  const dispatch = useDispatch();
  const { components, isDirty, lastSaved } = useSelector((state: RootState) => state.layout);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeApp = async () => {
      try {
        const currentValue = sdk.field.getValue();

        if (currentValue && currentValue.components) {
          dispatch(setComponents(currentValue.components));
        }

        sdk.field.onValueChanged((value: { components?: ComponentConfig[] } | undefined) => {
          if (value && value.components) {
            dispatch(setComponents(value.components));
          }
        });

        setIsLoading(false);
      } catch (error) {
        console.error('Error initializing app:', error);
        setIsLoading(false);
      }
    };

    initializeApp();
  }, [sdk, dispatch]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (over && active.id !== over.id) {
      const oldIndex = components.findIndex(comp => comp.id === active.id);
      const newIndex = components.findIndex(comp => comp.id === over.id);
      
      dispatch(reorderComponents({ sourceIndex: oldIndex, destinationIndex: newIndex }));
    }
  };

  const handleSave = async () => {
    try {
      const fieldValue = {
        components: components,
        lastUpdated: new Date().toISOString(),
      };
      
      await sdk.field.setValue(fieldValue);
      dispatch(markSaved());
    } catch (error) {
      console.error('Error saving:', error);
    }
  };

  const handlePreview = () => {
    const previewUrl = sdk.parameters.instance?.previewUrl;
    if (previewUrl) {
      window.open(previewUrl, '_blank');
    }
  };

  if (isLoading) {
    return <div className={styles.loading}>Loading Page Builder...</div>;
  }

  return (
    <div className={styles.pageBuilder}>
      <Toolbar 
        onSave={handleSave}
        onPreview={handlePreview}
        isDirty={isDirty}
        lastSaved={lastSaved}
      />
      
      <div className={styles.mainContent}>
        <div className={styles.sidebar}>
          <ComponentList />
        </div>
        
        <div className={styles.canvas}>
          <DndContext
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={components.map(comp => comp.id)}
              strategy={verticalListSortingStrategy}
            >
              <ComponentRenderer components={components} />
            </SortableContext>
          </DndContext>
        </div>
      </div>
    </div>
  );
};

export default PageBuilder; 