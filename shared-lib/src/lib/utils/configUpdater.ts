import { useConfigStore } from '../configStore';
import { Config } from '../types';
import set from 'lodash.set';

export function configUpdater<T extends Config>() {
  const { updateConfig } = useConfigStore.getState();
  const path: string[] = ['components'];

  return {
    component(key: string) {
      path.push(key);
      return this;
    },
    slot(slotKey: string) {
      path.push('slots', slotKey);
      return this;
    },
    prop(propKey: string) {
      path.push('props', propKey);
      return this;
    },
    set(value: unknown): void {
      updateConfig((draft: Config) => {
        set(draft, path.join('.'), value);
      });
    },
  };
}
