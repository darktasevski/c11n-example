import { useEffect, useRef } from 'react';
import styles from './react-shared-lib.module.css';
import { Config } from '@sdk-proposal-example/shared-lib';
// import { configUpdater, load } from '@sdk-proposal-example/shared-lib';

export interface NutrientViewer {
  load?: any;
  unload?: any;
}

// TODO - peer deep dependencies should be installed by the end user, not bundled with the shared lib. This will solve issues with multiple reacts being loaded.
// TODO - we need a default export from the Nutrient SDK. Any reason we're attaching it to the window object?
// TODO - we should remove the copy files step for the end users. Why can't we just import the Nutrient SDK and its assets directly?
// TODO - stop using inline styles where possible, use CSS modules instead or any other styling solution that isolates styles properly.

export function NutrientViewerComponent({
  document,
  config: _config,
}: {
  document: string;
  config: Config;
}) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    let NutrientViewer: NutrientViewer | undefined;

    const baseUrl = `${window.location.protocol}//${window.location.host}/src/assets/`;
    console.log(baseUrl);

    (async () => {
      NutrientViewer = (await import('@nutrient-sdk/viewer')) as NutrientViewer;
      await NutrientViewer.load({
        // Container where Nutrient should be mounted.
        container,
        // The document to open.
        document,
        // Use the public directory URL as a base URL. Nutrient will download its library assets from here.
        baseUrl,
      });
    })();

    return () => NutrientViewer?.unload(container);
  }, [document]);

  return (
    <div className={styles['container']}>
      <h1>Welcome to ReactSharedLib!</h1>
      <div ref={containerRef} style={{ width: '100%', height: '100vh' }} />
    </div>
  );
}
