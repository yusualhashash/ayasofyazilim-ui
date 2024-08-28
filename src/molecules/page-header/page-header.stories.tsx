import { Meta, StoryObj } from '@storybook/react';

import { PageHeader } from '.';

export default { component: PageHeader } as Meta<typeof PageHeader>;

export const Default: StoryObj<typeof PageHeader> = {
  args: {
    title: 'Page header',
    description: 'Page header description',
  },
};
export const WithBack: StoryObj<typeof PageHeader> = {
  args: {
    title: 'Page header',
    description: 'Page header description',
    LinkElement: 'a',
    href: '/back',
  },
};
export const Loading: StoryObj<typeof PageHeader> = {
  args: {
    title: 'Page header',
    description: 'Page header description',
    isLoading: true,
  },
};
