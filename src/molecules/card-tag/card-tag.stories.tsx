import { Meta, StoryFn } from '@storybook/react';
import React from 'react';

import CardTag, { CardTagProps } from '.';

export default {
  component: CardTag,
  parameters: {
    layout: 'centered',
  },
  args: {
    tag: 'Başarılı',
  },
} as Meta<typeof CardTag>;

const Template: StoryFn<typeof CardTag> = (args: CardTagProps) => (
  <CardTag {...args} />
);

export const Default = Template.bind({});
