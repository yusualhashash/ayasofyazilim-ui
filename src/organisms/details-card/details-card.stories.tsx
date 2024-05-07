import { Meta, StoryFn } from '@storybook/react';

import DetailsCard, { DetailsProps, defaultDetailsCardProps } from '.';

export default {
  component: DetailsCard,
  parameters: {
    layout: 'centered',
  },
  args: defaultDetailsCardProps,
} as Meta<typeof DetailsCard>;

const Template: StoryFn<typeof DetailsCard> = (args: DetailsProps) => (
  <DetailsCard {...args} />
);

export const Default = Template.bind({});
