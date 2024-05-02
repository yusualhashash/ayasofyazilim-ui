import { Meta, StoryFn } from '@storybook/react';

import CardList from '.';
import { cards } from './data';

export default {
  component: CardList,
  argTypes: {},
  parameters: {
    layout: 'centered',
  },
} as Meta<typeof CardList>;

const Template: StoryFn<typeof CardList> = (args) => <CardList {...args} />;

export const CardListStory = Template.bind({});

CardListStory.args = {
  cards,
};
