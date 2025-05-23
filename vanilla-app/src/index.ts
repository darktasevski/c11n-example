import { Config, load, configUpdater } from '@sdk-proposal-example/shared-lib';

export const sdkConfig: Config = {
  documentContainerId: 'container',
  components: {
    Sidebar: {
      slots: {
        root: {
          props: {
            style: {
              borderRight: '1px solid black',
            },
          },
        },
        header: {
          props: {
            content: 'Custom Sidebar Header!!!',
            style: {
              display: 'block',
            },
          },
        },
        footer: {
          type: 'custom',
          props: {
            render: () => {
              const div = document.createElement('div');
              div.textContent = 'Custom Sidebar Footer!!!';
              return div;
            },
          },
        },
      },
      children: [
        {
          type: 'action-button',
          props: {
            label: 'Save',
            style: {
              display: 'block',
              border: '1px solid black',
              padding: '0.25rem 0.5rem',
            },
            onClick: (): void => alert('Saved!'),
          },
        },
        {
          type: 'custom',
          props: {
            render: () => {
              const div = document.createElement('div');
              div.textContent = 'DOM custom node';
              return div;
            },
          },
        },
      ],
    },
    Toolbar: {
      slots: {
        action: {
          type: 'action-button',
          props: {
            label: 'Click me!!!',
            style: {
              display: 'block',
              border: '1px solid black',
              padding: '0.25rem 0.5rem',
            },
            onClick: (): void => {
              configUpdater()
                .component('Toolbar')
                .slot('root')
                .prop('style')
                .set({ backgroundColor: 'blue' });
            },
          },
        },
      },
    },
  },
};

load(sdkConfig);

setInterval(() => {
  configUpdater()
    .component('Sidebar')
    .slot('header')
    .prop('content')
    .set(`Updated Sidebar Header ${Date.now()}`);
}, 3000);
