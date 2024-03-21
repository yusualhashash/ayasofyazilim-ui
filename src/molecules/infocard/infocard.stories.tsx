import React from 'react';
import { Meta, StoryFn } from '@storybook/react';

import InfoCard from './infocard';

export default {
  title: 'Molecules/info Card',
  component: InfoCard,
  argTypes: {},
  parameters: {
    layout: 'centered',
  },
} as Meta<typeof InfoCard>;

const Template: StoryFn<typeof InfoCard> = (args) => <InfoCard {...args} />;

export const InfoCardStory = Template.bind({});

InfoCardStory.args = {
  title: 'People',
  content: '15k',
  description: 'Number of people in the system',
  footer: 'Your target is 20K',
};
