import type { Meta, StoryObj } from '@storybook/react';

import { Blocks, HandCoins } from 'lucide-react';
import SelectTabs, { SelectTabsContent } from '.';

/**
 * Section Layout component with a navigation bar and content area.
 */
const meta: Meta<typeof SelectTabs> = {
  component: SelectTabs,
};

export default meta;
type Story = StoryObj<typeof SelectTabs>;

export const MyStory: Story = {
  parameters: {
    layout: 'centered',
  },
  render: () => (
    <div className="w-full">
      <article>
        <SelectTabs deselect>
          <SelectTabsContent value="1">
            <div className="flex flex-row gap-1 items-center">
              <Blocks />
              Hisse Bazlı
            </div>
          </SelectTabsContent>
          <SelectTabsContent value="2">
            <div className="flex flex-row gap-1 items-center">
              <HandCoins />
              Borç Bazlı
            </div>
          </SelectTabsContent>
        </SelectTabs>
      </article>
    </div>
  ),
};
