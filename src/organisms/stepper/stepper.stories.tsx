import { Meta, StoryObj } from '@storybook/react';

import { useState } from 'react';
import Stepper, { StepperContent } from '.';
import CustomButton from '../../molecules/button';

export default { component: Stepper } as Meta<typeof Stepper>;

export const Default: StoryObj<typeof Stepper> = {
  args: {},
  parameters: {
    layout: 'centered',
  },
  render: (args) => {
    const [activeTabIndex, setActiveTabIndex] = useState(0);

    return (
      <Stepper
        {...args}
        activeTabIndex={activeTabIndex}
        onIndexChange={setActiveTabIndex}
      >
        <StepperContent title="First Step">
          <h1>Content 1</h1>
          <div>First ReactJs elements</div>
        </StepperContent>
        <StepperContent title="Second Step">
          <h1>Content 2</h1>
          <div>Second ReactJs Elements</div>
        </StepperContent>
        <StepperContent title="Third Step" canGoBack={false} canGoNext={false}>
          <h1>Content 1</h1>
          <div>First ReactJs elements</div>
          <CustomButton
            className="w-full mt-4"
            isLoading={false}
            onClick={() => alert('Submit Project')}
          >
            Submit Project
          </CustomButton>
        </StepperContent>
      </Stepper>
    );
  },
};
