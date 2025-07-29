'use client';

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../types';
import { undo, redo } from '../../store/layoutSlice';
import styles from './Toolbar.module.css';

interface ToolbarProps {
  onSave: () => void;
  onPreview: () => void;
  isDirty: boolean;
  lastSaved: string | null;
}

const Toolbar: React.FC<ToolbarProps> = ({ onSave, onPreview, isDirty, lastSaved }) => {
  const dispatch = useDispatch();
  const { history, historyIndex } = useSelector((state: RootState) => state.layout);
  
  const canUndo = historyIndex > 0;
  const canRedo = historyIndex < history.length - 1;

  const handleUndo = () => {
    if (canUndo) {
      dispatch(undo());
    }
  };

  const handleRedo = () => {
    if (canRedo) {
      dispatch(redo());
    }
  };

  const formatLastSaved = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString();
  };

  return (
    <div className={styles.toolbar}>
      <div className={styles.leftSection}>
        <h1 className={styles.title}>Page Builder</h1>
        <div className={styles.status}>
          {isDirty && <span className={styles.dirtyIndicator}>• Unsaved changes</span>}
          {lastSaved && (
            <span className={styles.lastSaved}>
              Last saved: {formatLastSaved(lastSaved)}
            </span>
          )}
        </div>
      </div>
      
      <div className={styles.rightSection}>
        <div className={styles.historyControls}>
          <button
            className={`${styles.button} ${styles.iconButton}`}
            onClick={handleUndo}
            disabled={!canUndo}
            title="Undo"
          >
            ↶
          </button>
          <button
            className={`${styles.button} ${styles.iconButton}`}
            onClick={handleRedo}
            disabled={!canRedo}
            title="Redo"
          >
            ↷
          </button>
        </div>
        
        <button
          className={`${styles.button} ${styles.previewButton}`}
          onClick={onPreview}
          title="Preview Page"
        >
          👁 Preview
        </button>
        
        <button
          className={`${styles.button} ${styles.saveButton} ${isDirty ? styles.saveButtonDirty : ''}`}
          onClick={onSave}
          disabled={!isDirty}
          title="Save Changes"
        >
          💾 Save
        </button>
      </div>
    </div>
  );
};

export default Toolbar; 