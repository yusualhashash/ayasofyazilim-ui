import { Meta, StoryFn } from '@storybook/react';
import React from 'react';

import { SectionLayout, defaultProps } from '.';

export default {
  component: SectionLayout,
  parameters: {
    layout: 'centered',
  },
  args: defaultProps,
} as Meta<typeof SectionLayout>;

const Template: StoryFn<typeof SectionLayout> = (args: any) => (
  <SectionLayout {...args} />
);

export const Default = Template.bind({});
