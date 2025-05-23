import App from './components/App';
import { useConfigStore } from './configStore';
import { Config } from './types';

import { createRoot } from 'react-dom/client';

export function load(config: Config) {
  const { documentContainerId } = config;

  const container = document?.getElementById(documentContainerId);

  if (!container) {
    throw new Error(`Container with id ${documentContainerId} not found`);
  }

  useConfigStore.setState({ config });

  const root = createRoot(container);

  root.render(<App />);
}
