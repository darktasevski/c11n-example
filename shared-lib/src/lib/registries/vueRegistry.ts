import { h } from 'vue';
import { Component } from '../types';

const vueRegistry = new Map<string, any>();

export function registerVueComponent(name: string, component: any): void {
  vueRegistry.set(name, component);
}

export function renderVueComponent(component: Component): any {
  if (component.type === 'custom') {
    if ('component' in component.props) {
      return h(component.props.component, component.props);
    }
    if ('render' in component.props) {
      return component.props.render?.();
    }
  }
  const fallback = vueRegistry.get(component.type);
  return fallback ? h(fallback, component.props) : null;
}
