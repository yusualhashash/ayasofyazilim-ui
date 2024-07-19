import { z } from 'zod';
import React from 'react';
import Stepper, { StepperContent } from '../stepper';
import AutoForm from '../auto-form';

export default function FormStepper() {
  const [step, setStep] = React.useState(0);
  return (
    <Stepper activeTabIndex={step} onIndexChange={setStep}>
      <StepperContent title="basic information">
        <AutoForm
          formSchema={z.object({
            name: z.string().nonempty(),
            email: z.string().email(),
            age: z.number().int(),
          })}
          fieldConfig={{
            withoutBorder: true,
          }}
        />
      </StepperContent>
      <StepperContent title="Complex information">
        <AutoForm
          formSchema={z.object({
            name: z.string().nonempty(),
            email: z.string().email(),
            age: z.number().int(),
            hello: z.string().nonempty(),
            list: z.array(z.string().nonempty()),
          })}
          fieldConfig={{
            withoutBorder: true,
          }}
        />
      </StepperContent>
    </Stepper>
  );
}
