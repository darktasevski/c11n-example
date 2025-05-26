import {
  registerDOMComponent,
  renderDOMComponent,
} from '../registries/domRegistry';
// import {
//   registerReactComponent,
//   renderReactComponent,
// } from '../registries/reactRegistry';
// import {
//   registerVueComponent,
//   renderVueComponent,
// } from '../registries/vueRegistry';

// The SDK internally uses RendererAdapters[framework].render(component)
// and registers components during bootstrap. Consumers never access this directly.

// type Component should be imported from your shared types
// These APIs are internal to the SDK. DO NOT export the registries.
export const RendererAdapters = {
  react: {
    // render: renderReactComponent,
    // register: registerReactComponent,
  },
  vue: {
    // render: renderVueComponent,
    // register: registerVueComponent,
  },
  dom: {
    render: renderDOMComponent,
    register: registerDOMComponent,
  },
};
