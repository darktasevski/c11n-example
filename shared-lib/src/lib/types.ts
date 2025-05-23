export interface Component {
  type: 'container' | 'text' | 'action-button' | 'custom';
  props: Record<string, unknown>;
  children?: Component[];
  id?: string;
}

export interface UIComponentConfig {
  slots: Record<
    string,
    { type?: Component['type']; props?: Record<string, unknown> }
  >;
  children?: Component[];
}

export interface Config {
  documentContainerId: string;
  framework?: 'react' | 'vue' | 'svelte' | 'angular' | 'dom';
  components: Record<string, UIComponentConfig>;
}
