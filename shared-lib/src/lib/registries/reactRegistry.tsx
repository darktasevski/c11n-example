import { Component } from '../types';

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
