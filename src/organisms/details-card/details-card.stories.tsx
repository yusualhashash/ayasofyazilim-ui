import { Meta, StoryFn } from '@storybook/react';
import React from 'react';

import DetailsCard, { defaultProps, detailsCardProps } from '.';

export default {
  component: DetailsCard,
  parameters: {
    layout: 'centered',
  },
  args: defaultProps,
} as Meta<typeof DetailsCard>;

const Template: StoryFn<typeof DetailsCard> = (args: detailsCardProps) => (
  <DetailsCard {...args} />
);

export const Default = Template.bind({});
