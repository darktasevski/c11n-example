import { useEffect, useRef } from 'react';
import { registry } from '../registries/domRegistry';
import type { Component } from '../types';
import { applyAttributes } from '../utils/applyAttributes';

interface RenderDomComponentProps {
  component: Component;
}

export function RenderDomComponent({ component }: RenderDomComponentProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    container.innerHTML = ''; // Clear old content
    const domNode = registry[component.type](component.props);
    // Apply attributes to the DOM node
    applyAttributes(domNode, component.props);

    container.appendChild(domNode);

    return () => {
      container.innerHTML = '';
    };
  }, [component]);

  return <div ref={ref} />;
}
