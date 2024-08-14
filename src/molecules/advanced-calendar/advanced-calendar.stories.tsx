import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import AdvancedCalendar from '.';

export default {
  component: AdvancedCalendar,
  parameters: {
    layout: 'centered',
  },
  args: {
    title: 'Başarılı',
    variant: 'default',
    className: 'w-full text-white',
  },
} as Meta<typeof AdvancedCalendar>;

export const Template: StoryObj<typeof AdvancedCalendar> = {
  args: {
    hideSelect: false,
  },
  render: () => {
    const [filteredValue, setFilteredValue] = useState<string>('');
    return (
      <AdvancedCalendar
        initialFocus
        mode="single"
        fromYear={new Date().getFullYear() - 5}
        toYear={new Date().getFullYear()}
        captionLayout="dropdown"
        onSelect={(value) => {
          setFilteredValue(value?.toISOString() || '');
        }}
        selected={filteredValue ? new Date(filteredValue) : undefined}
      />
    );
  },
};
