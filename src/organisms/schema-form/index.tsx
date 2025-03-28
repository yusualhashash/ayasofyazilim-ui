'use client';

import Form, { ThemeProps } from '@rjsf/core';
import { RJSFSchema } from '@rjsf/utils';
import { customizeValidator } from '@rjsf/validator-ajv8';
import { Fragment, useState } from 'react';
import { cn } from '@/lib/utils';
import { ScrollBar } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import ScrollArea from '../../molecules/scroll-area';
import { FieldErrorTemplate } from './fields';
import {
  AccordionArrayFieldTemplate,
  ErrorListTemplate,
  FieldTemplate,
  ObjectFieldTemplate,
  DescriptionFieldTemplate,
} from './templates';
import { FormContext, SchemaFormProps } from './types';
import {
  createSchemaWithFilters,
  mergeUISchemaObjects,
  removeFieldsfromGenericSchema,
} from './utils';
import {
  Combobox,
  CustomCheckbox,
  CustomDate,
  CustomPhoneField,
  CustomSelect,
  CustomSwitch,
  CustomTextareaInput,
  CustomTextInput,
  EmailInputWidget,
  PasswordInputWidget,
} from './widgets';
import { AJV_TR } from './utils/langugage';

/**
 * SchemaForm component that renders a form based on the provided schema and options.
 * Extends the Form component from @rjsf/core.
 *
 * @param {SchemaFormProps} props - The props for the SchemaForm component.
 * @returns {JSX.Element} - The rendered form component.
 */
export function SchemaForm<T = unknown>({ ...props }: SchemaFormProps<T>) {
  const Default: ThemeProps<T, any, FormContext<T>> = {
    widgets: {
      switch: CustomSwitch,
      CheckboxWidget: CustomCheckbox,
      combobox: Combobox,
      SelectWidget: CustomSelect,
      TextWidget: CustomTextInput,
      TextareaWidget: CustomTextareaInput,
      DateTimeWidget: CustomDate,
      password: PasswordInputWidget,
      email: EmailInputWidget,
      phone: CustomPhoneField,
    },
    templates: {
      ArrayFieldTemplate: AccordionArrayFieldTemplate,
      ErrorListTemplate,
      FieldErrorTemplate,
      FieldTemplate,
      ObjectFieldTemplate,
      DescriptionFieldTemplate,
    },
  };
  const {
    filter,
    children,
    withScrollArea = true,
    useDefaultSubmit = true,
    useDependency = false,
    disableValidation = false,
    defaultSubmitClassName,
    locale = 'en',
  } = props; // Start with the provided schema
  const Wrapper = withScrollArea ? ScrollArea : Fragment;
  let uiSchema = {
    'ui:config': {
      locale,
    },
  }; // Initialize the UI schema
  let { schema } = props;
  if (filter) {
    schema = createSchemaWithFilters({
      filter,
      schema,
    });
  }
  // Merge any additional UI schema provided via props
  if (props.uiSchema) {
    // @ts-expect-error
    uiSchema = mergeUISchemaObjects(uiSchema, props.uiSchema);
  }
  const [formData, setFormData] = useState<T | undefined>(props.formData);
  return (
    <Wrapper
      {...(withScrollArea && { className: 'h-full [&>div>div]:!block' })}
    >
      <Form<T, any, FormContext<T>>
        noHtml5Validate
        liveValidate
        formContext={{
          ...uiSchema['ui:config'],
          formData: useDependency ? formData : undefined,
        }}
        focusOnFirstError
        showErrorList={props.showErrorList || false}
        {...props}
        className={cn('p-px', withScrollArea && 'pr-4', props.className)}
        formData={formData}
        schema={
          removeFieldsfromGenericSchema(schema, [
            'extraProperties',
          ]) as RJSFSchema
        } // Cast schema to RJSFSchema type
        validator={customizeValidator(
          {
            ajvOptionsOverrides: {
              removeAdditional: true,
            },
          },
          locale === 'tr' ? AJV_TR : undefined
        )} // Custom validator
        noValidate={disableValidation}
        fields={{ ...Default.fields, ...props.fields }} // Merge custom fields
        widgets={{ ...Default.widgets, ...props.widgets }} // Merge custom widgets
        templates={{ ...Default.templates, ...props.templates }} // Merge custom templates
        uiSchema={uiSchema} // Set the generated UI schema
        onChange={(e) => {
          if (props.onChange) props.onChange(e); // Call the onChange prop if provided
          setFormData(e.formData);
        }}
        onSubmit={(data, event) => {
          if (props.onSubmit) props.onSubmit(data, event); // Call the onSubmit prop if provided
        }}
      >
        {children}
        {useDefaultSubmit && (
          <SchemaFormSubmit
            submit={props.submitText || 'Submit'}
            className={defaultSubmitClassName}
            disabled={props.disabled}
          />
        )}
      </Form>
      {withScrollArea && <ScrollBar orientation="horizontal" />}
    </Wrapper>
  );
}

export const SchemaFormSubmit = ({
  submit,
  className,
  disabled,
}: {
  className?: string;
  disabled?: boolean;
  submit: string;
}) => (
  <div
    className={cn(
      'py-4 sticky bottom-0 bg-white flex justify-end z-50',
      className
    )}
  >
    <Button type="submit" disabled={disabled}>
      {submit}
    </Button>
  </div>
);
