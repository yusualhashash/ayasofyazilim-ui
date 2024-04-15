import { Meta, StoryFn } from '@storybook/react';
import React from 'react';

import DetailsCard, { defaultProps, IDetailsCardProps } from '.';

export default {
  component: DetailsCard,
  parameters: {
    layout: 'centered',
  },
  args: defaultProps,
} as Meta<typeof DetailsCard>;

const Template: StoryFn<typeof DetailsCard> = (args: IDetailsCardProps) => (
  <DetailsCard {...args} />
);

export const Default = Template.bind({});
