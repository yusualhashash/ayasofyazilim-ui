import { Meta, StoryFn } from '@storybook/react';
import React from 'react';

import CardTag, { ICardTagProps } from '.';

export default {
  component: CardTag,
  parameters: {
    layout: 'centered',
  },
  args: {
    tag: 'Başarılı',
  },
} as Meta<typeof CardTag>;

const Template: StoryFn<typeof CardTag> = (args: ICardTagProps) => (
  <CardTag {...args} />
);

export const Default = Template.bind({});
