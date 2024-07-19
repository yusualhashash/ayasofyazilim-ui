'use client';

import React from 'react';
import Stepper, { StepperContent } from '../stepper';
import AutoForm, { AutoFormProps } from '../auto-form';

const FormStepperGenerator = (steps: Step[]) =>
  steps.map((step: Step) => (
    <StepperContent title={step.title}>
      <AutoForm fieldConfig={{ withoutBorder: true }} {...step.autoformArgs} />
    </StepperContent>
  ));

export type Step = {
  autoformArgs: AutoFormProps;
  title: string;
};

export default function FormStepper({ steps }: { steps: Step[] }) {
  const [currentStep, setCurrentStep] = React.useState(0);
  const stepsComponents = FormStepperGenerator(steps);
  return (
    <Stepper
      activeTabIndex={currentStep}
      onIndexChange={setCurrentStep}
      vertical
    >
      {...stepsComponents}
    </Stepper>
  );
}
