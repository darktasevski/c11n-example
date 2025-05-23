import { create } from 'zustand';
import { produce } from 'immer';
import type { Config } from './types';

type ConfigStore = {
  config: Config;
  updateConfig: (updater: (draft: Config) => void) => void;
};

export const useConfigStore = create<ConfigStore>((set) => ({
  config: {} as Config,
  updateConfig: (updater) => {
    set((state) => ({
      config: produce(state.config, updater),
    }));
  },
}));

export function updateConfig(updater: (draft: Config) => void) {
  useConfigStore.getState().updateConfig(updater);
}
