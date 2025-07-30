/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '../../store';
import PageBuilder from '../../components/contentful/PageBuilder';
import styles from './contentful-app.module.css';

const mockSDK = {
  field: {
    getValue: () => null,
    setValue: async (value: any) => {
      console.log('Saving to Contentful:', value);
      return Promise.resolve();
    },
    onValueChanged: (_callback: (value: any) => void) => {
    }
  },
  parameters: {
    instance: {
      previewUrl: 'http://localhost:3000/landing/page-1'
    }
  }
};

export default function ContentfulApp() {
  return (
    <Provider store={store}>
      <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
        <div className={styles.appWrapper}>
          <div className={styles.header}>
            <h1>Page Builder - Development Mode</h1>
            <p>This is a standalone version for development and testing</p>
          </div>
          <PageBuilder sdk={mockSDK as any} />
        </div>
      </PersistGate>
    </Provider>
  );
} 