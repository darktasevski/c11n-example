// Uncomment this line to use CSS modules
import { useEffect } from 'react';
import { configUpdater } from '@sdk-proposal-example/shared-lib';
import { NutrientViewerComponent } from '@sdk-proposal-example/react-shared-lib';

import styles from './App.module.css';
import { sdkConfig } from './config';

import document from './example.pdf';
import React from 'react';

export function App({ styles }: { styles?: React.CSSProperties }) {
  useEffect(() => {
    // load(sdkConfig);
  }, []);

  useEffect(() => {
    setInterval(() => {
      configUpdater()
        .component('Sidebar')
        .slot('header')
        .prop('content')
        .set(`Updated Sidebar Header ${Date.now()}`);
    }, 3000);
  }, []);

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Hello world from react app!</h1>
      <NutrientViewerComponent document={document} config={sdkConfig} />
    </div>
  );
}

export default App;
