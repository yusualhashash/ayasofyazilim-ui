import React from 'react';
import { Meta, StoryFn } from '@storybook/react';

import CountrySelector from '../components/country-selector';

export default {
  title: 'Components/CountrySelector',
  component: CountrySelector,
  argTypes: {},
  parameters: {
    layout: 'centered',
  },
} as Meta<typeof CountrySelector>;

const Template: StoryFn<typeof CountrySelector> = (args) => (
  <CountrySelector {...args} />
);

export const CountrySelectorTemplate = Template.bind({});

CountrySelectorTemplate.args = {
  searchText: 'Find',
  searchEmptyValue: 'No country found.',
  defaultValue: {
    label: 'Test',
    value: 'tur',
  },
};
