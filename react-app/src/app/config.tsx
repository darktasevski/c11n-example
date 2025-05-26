import { Config, configUpdater } from '@sdk-proposal-example/shared-lib';

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

              // <div style={{ width: '100%', height: '200px' }}>
              //   <iframe
              //     width="100%"
              //     height="100%"
              //     frameBorder="0"
              //     style={{ border: 0 }}
              //     src="https://maps.google.com/maps?q=New+York&t=&z=13&ie=UTF8&iwloc=&output=embed"
              //     allowFullScreen
              //   ></iframe>
              // </div>;
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
