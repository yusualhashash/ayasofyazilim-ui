import { Meta, StoryFn } from '@storybook/react';
import React from 'react';

import TipTapEditor from '.';

export default {
  component: TipTapEditor,
  parameters: {
    layout: 'centered',
  },
} as Meta<typeof TipTapEditor>;

const Template: StoryFn<typeof TipTapEditor> = () => <TipTapEditor />;

export const Default = Template.bind({});
