import { Meta, StoryObj } from '@storybook/react';

import Stepper, { StepperContent } from '.';
import CustomButton from '../../molecules/button';

export default { component: Stepper } as Meta<typeof Stepper>;

export const Default: StoryObj<typeof Stepper> = {
  args: {
    activeTabIndex: 0,
    children: [
      <StepperContent title="Content 1">
        <h1>Content 1</h1>
        <div>sadasdasdasdasdasdsadasdasd</div>
        <div className="mt-5 flex justify-between">
          <CustomButton
            variant="outline"
            disabled={false}
            // onClick={() => setActiveTabIndex(activeTabIndex - 2)}
          >
            Previous
          </CustomButton>
          <CustomButton
            className="bg-blue-500 hover:bg-blue-600"
            // onClick={() =>
            //   activeTabIndex === keysWithSeparator.length - 1
            //     ? onFinishFunction()
            //     : setActiveTabIndex(activeTabIndex + 2)
            // }
          >
            Next
          </CustomButton>
        </div>
      </StepperContent>,
      <StepperContent title="Content 2">
        <h1>Content 2</h1>
        <div>sadasdasdasdasdasdsadasdasd</div>
        <div className="mt-5 flex justify-between">
          <CustomButton
            variant="outline"
            disabled={false}
            // onClick={() => setActiveTabIndex(activeTabIndex - 2)}
          >
            Previous
          </CustomButton>
          <CustomButton
            className="bg-blue-500 hover:bg-blue-600"
            // onClick={() =>
            //   activeTabIndex === keysWithSeparator.length - 1
            //     ? onFinishFunction()
            //     : setActiveTabIndex(activeTabIndex + 2)
            // }
          >
            Next
          </CustomButton>
        </div>
      </StepperContent>,
    ],
  },
  parameters: {
    layout: 'centered',
  },
};
