import { useConfigStore } from '../configStore';
import { Component } from '../types';
import { RenderDomComponent } from './RenderDomComponent';
import styles from './Toolbar.module.css';

export default function Toolbar() {
  const toolbarConfig = useConfigStore(
    (state) => state.config.components.Toolbar
  );

  console.log('Toolbar config:', toolbarConfig);

  const { slots } = toolbarConfig;

  return (
    <div className={styles.container} {...slots.root?.props}>
      {slots.description?.type ? (
        <RenderDomComponent component={slots.description as Component} />
      ) : (
        <Description props={slots.description?.props} />
      )}

      {slots.action?.type ? (
        <RenderDomComponent component={slots.action as Component} />
      ) : (
        <Action props={slots.action?.props} />
      )}
    </div>
  );
}

function Description({ props }: { props: any }) {
  return (
    <div id="toolbar-description">
      <p>{props?.content || 'Toolbar Description'}</p>
    </div>
  );
}

function Action({ props }: { props: any }) {
  return (
    <div id="toolbar-action">
      <button onClick={props?.onClick}>{props?.label || 'Action'}</button>
    </div>
  );
}
