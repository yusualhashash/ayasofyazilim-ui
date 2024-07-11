import { Meta, StoryFn } from '@storybook/react';
import React from 'react';
import { TreeView } from '.';

export default {
  component: TreeView,
  argTypes: {},
  parameters: {
    layout: 'centered',
  },
} as Meta<typeof TreeView>;

const template: StoryFn<typeof TreeView> = (args) => <TreeView {...args} />;
export const Default = template.bind({});
Default.args = {
  className: 'w-full m-5',
  selectedId: '2',
  setSelectedId: () => {},
  optionsDropdownContent: (
    <>
      <div>edit</div>
      <div>delete</div>
    </>
  ),
  elements: [
    {
      id: '1',
      name: 'Folder 1',
      children: [
        {
          id: '1.1',
          name: 'Folder 1.1',
          children: [
            {
              id: '1.1.1',
              name: 'Folder 1.1.1',
              children: [
                {
                  id: '1.1.1.1',
                  name: 'Folder 1.1.1.1',
                },
                {
                  id: '1.1.1.2',
                  name: 'Folder 1.1.1.2',
                },
              ],
            },
            {
              id: '1.1.2',
              name: 'Folder 1.1.2',
            },
          ],
        },
        {
          id: '1.2',
          name: 'Folder 1.2',
        },
      ],
    },
    {
      id: '2',
      name: 'Folder 2',
    },
  ],
};
