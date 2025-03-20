'use client';

import { Meta, StoryFn } from '@storybook/react';
import { DatePicker } from '.';

const meta: Meta = {
  title: 'Components/DatePicker',
  component: DatePicker,
};

export default meta;

const Template: StoryFn<typeof DatePicker> = (args) => <DatePicker {...args} />;
export const Default = Template.bind({});
Default.args = {};
