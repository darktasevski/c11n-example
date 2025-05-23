import { Component } from '../types';
import { applyAttributes } from '../utils/applyAttributes';

export const registry: Record<Component['type'], (props: any) => HTMLElement> =
  {
    container: ({ children, ...attributes }) => {
      const container = document.createElement('div');

      applyAttributes(container, attributes);

      if (Array.isArray(children)) {
        children.forEach((child) => {
          const childElement =
            registry[child.type as keyof typeof registry](child);

          container.appendChild(childElement);
        });
      }

      return container;
    },
    text: ({ content, ...attributes }) => {
      const span = document.createElement('span');

      applyAttributes(span, attributes);

      span.textContent = content;

      return span;
    },
    'action-button': ({ label, onClick, ...attributes }) => {
      const button = document.createElement('button');

      applyAttributes(button, attributes);

      button.textContent = label;
      button.onclick = onClick;

      return button;
    },
    custom: ({ render }: { render?: () => HTMLElement }) => {
      console.log('Custom render', render);
      if (typeof render === 'function') {
        return render();
      }
      const fallback = document.createElement('div');
      fallback.textContent = 'Invalid custom render()';
      return fallback;
    },
  };
