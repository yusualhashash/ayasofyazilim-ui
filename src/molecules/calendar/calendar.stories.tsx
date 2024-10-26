import { Meta, StoryObj } from '@storybook/react';
import Calendar from '.';

export default {
  title: 'molecules/calendar',
  component: Calendar,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    presets: {
      control: {
        type: 'boolean',
      },
    },
    fromYear: {
      control: { type: 'number', min: 1900, max: 2050 },
    },
    toYear: {
      control: { type: 'number', min: 1900, max: 2050 },
    },
    type: {
      control: 'inline-radio',
      options: ['buttons', 'dropdown', 'dropdown-buttons'],
    },
  },
  args: {
    presets: false,
    range: false,
    view: 'single',
    className: 'w-full',
    fromYear: new Date().getFullYear() - 5,
    toYear: new Date().getFullYear(),
    type: 'buttons',
  },
} as Meta<typeof Calendar>;

export const Template: StoryObj<typeof Calendar> = {
  args: {
    presets: true,
    range: true,
    view: 'multiple',
  },
  // const [filteredValue, setFilteredValue] = useState<string>('');
  render: (args) => (
    <Calendar
      {...args}
      initialFocus
      // onSelect={(value) => {
      //   if ('toISOString' in value) {
      //     setFilteredValue(value?.toISOString() || '');
      //   }
      // }}
      // selected={filteredValue ? new Date(filteredValue) : undefined}
    />
  ),
};
