import { useConfigStore } from '../configStore';
import { Component } from '../types';
import { RenderDomComponent } from './RenderDomComponent';
import styles from './Sidebar.module.css';

export default function Sidebar() {
  const sidebarConfig = useConfigStore(
    (state) => state.config.components.Sidebar
  );

  const { slots, children } = sidebarConfig;

  const { root, header, footer } = slots;

  return (
    <div
      style={{
        width: '200px',
        backgroundColor: '#e0e0e0',
        padding: '10px',
      }}
      className={styles.container}
      {...root.props}
    >
      {slots.header?.type ? (
        <RenderDomComponent component={slots.header as Component} />
      ) : (
        <Header props={header.props} />
      )}

      <Content>
        {children?.map((child, index) => {
          if (child.type) {
            return <RenderDomComponent key={index} component={child} />;
          }
          return null;
        })}
      </Content>

      {slots.footer?.type ? (
        <RenderDomComponent component={slots.footer as Component} />
      ) : (
        <Footer props={footer.props} />
      )}
    </div>
  );
}

function Header({ props }: { props: any }) {
  return (
    <div id="sidebar-header">
      <h2>{props.content || 'Sidebar Header'}</h2>
    </div>
  );
}

function Footer({ props }: { props: any }) {
  return (
    <div id="sidebar-footer">
      <h2>{props.content || 'Sidebar Footer'}</h2>
    </div>
  );
}

function Content({ children }: { children: React.ReactNode }) {
  return (
    <ul id="sidebar-content">
      <li>Item 1</li>
      <li>Item 2</li>
      <li>Item 3</li>
      {children}
    </ul>
  );
}
