import { JSX } from 'react/jsx-runtime';
import { Component } from '../types';
import { isValidElement } from 'react';

export const registry: Record<
  Component['type'],
  (props: any) => React.ReactNode
> = {
  container: ({ children, ...props }) => <div {...props}>{children}</div>,
  text: ({ content, ...props }) => <span {...props}>{content}</span>,
  'action-button': ({ label, onClick, ...props }) => (
    <button onClick={onClick} {...props}>
      {label}
    </button>
  ),
  custom: ({ render }) => render(),
};

export function registerReactComponent(name: string, component: React.FC<any>) {
  registry[name] = component;
}

export function renderReactComponent(component: Component): React.ReactNode {
  if (component.type === 'custom') {
    if ('component' in component.props) {
      const Comp = component.props.component as React.FC<any>;
      return <Comp {...component.props} />;
    }
    if ('render' in component.props) {
      const result = component.props.render();
      return isValidElement(result) ? result : null;
    }
  }

  // todo: fallback registry-based rendering
  return null;
}

/*

case "custom":
  const CustomComponent = component.props.render;
  return <CustomComponentWrapper render={CustomComponent} />;

const CustomComponentWrapper = ({ render }: { render: () => JSX.Element }) => {
  return render(); // now it's part of the React tree
};

--------

{
  type: "custom",
  props: {
    component: MyHookedComponent
  }
}
case "custom":
  const C = component.props.component;
  return <C />;

--------

Viewer.registerComponent("custom-widget", () => <MyFancyWidget />);

function MyFancyWidget() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>Clicked {count}</button>;
}

--------

import { createCustomization } from '@nutrient-sdk/react';

const overrides = createCustomization({
  SignatureModal: {
    renderFooter: ({ onConfirm }) => (
      <div>
        <button onClick={onConfirm}>Confirm</button>
      </div>
    )
  }
});

<Viewer document="..." overrides={overrides} />

Internally becomes:

SignatureModal: {
  renderFooter: (params) => {
    const root = document.createElement('div');
    const reactRoot = createRoot(root);
    reactRoot.render(<YourJSXComponent {...params} />);
    return root;
  }
}
*/
