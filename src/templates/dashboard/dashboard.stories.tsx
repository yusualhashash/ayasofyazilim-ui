import { Meta, StoryObj } from '@storybook/react';

import Dashbaord from '.';
import { data } from '../../molecules/tables/data';
import { columns } from '../../molecules/tables/columns';
import { cards } from '../../organisms/card-list/data';

export default { component: Dashbaord } as Meta<typeof Dashbaord>;

export const Default: StoryObj<typeof Dashbaord> = {
  args: {
    data,
    // @ts-ignore
    columns,
    cards,
  },
  parameters: {
    layout: 'centered',
  },
};
