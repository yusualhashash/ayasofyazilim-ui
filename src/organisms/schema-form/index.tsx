import Form, { ThemeProps } from '@rjsf/core';
import { RJSFSchema } from '@rjsf/utils';
import { customizeValidator } from '@rjsf/validator-ajv8';
import { Fragment, useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import ScrollArea from '../../molecules/scroll-area';
import { AsyncSelect, CustomPhoneField, FieldErrorTemplate } from './fields';
import {
  AccordionArrayFieldTemplate,
  ErrorListTemplate,
  FieldTemplate,
  ObjectFieldTemplate,
} from './templates';
import { SchemaFormProps } from './types';
import {
  createSchemaWithFilters,
  flattenGenericData,
  generateFormData,
  generateUiSchema,
  hasPhoneFields,
  mergeUISchemaObjects,
  removeFieldsfromGenericSchema,
  transformGenericSchema,
} from './utils';
import {
  Combobox,
  CustomCheckbox,
  CustomDate,
  CustomSelect,
  CustomSwitch,
  CustomTextInput,
  PasswordInputWidget,
} from './widgets';

const Default: ThemeProps = {
  fields: {
    phone: CustomPhoneField,
  },
  widgets: {
    switch: CustomSwitch,
    CheckboxWidget: CustomCheckbox,
    combobox: Combobox,
    SelectWidget: CustomSelect,
    'async-select': AsyncSelect,
    TextWidget: CustomTextInput,
    DateTimeWidget: CustomDate,
    password: PasswordInputWidget,
  },
  templates: {
    ArrayFieldTemplate: AccordionArrayFieldTemplate,
    ErrorListTemplate,
    FieldErrorTemplate,
    FieldTemplate,
    ObjectFieldTemplate,
  },
};

/**
 * SchemaForm component that renders a form based on the provided schema and options.
 * Extends the Form component from @rjsf/core.
 *
 * @param {SchemaFormProps} props - The props for the SchemaForm component.
 * @returns {JSX.Element} - The rendered form component.
 */
export function SchemaForm<T = unknown>({ ...props }: SchemaFormProps<T>) {
  const {
    usePhoneField,
    filter,
    children,
    withScrollArea = true,
    useDefaultSubmit = true,
    defaultSubmitClassName,
  } = props; // Start with the provided schema
  const Wrapper = withScrollArea ? ScrollArea : Fragment;
  const phoneFieldsConfig = {
    fields: ['areaCode', 'ituCountryCode', 'localNumber'],
    requireds: ['areaCode', 'ituCountryCode', 'localNumber'],
    name: 'phone',
  };
  let uiSchema = {}; // Initialize the UI schema
  let { schema } = props;
  let statedForm = props.formData;
  // If the phone field is enabled, transform the schema and generate UI schema
  if (usePhoneField) {
    schema = transformGenericSchema(
      schema,
      phoneFieldsConfig.fields, // Fields to transform
      phoneFieldsConfig.name, // The parent field name
      phoneFieldsConfig.requireds // Required fields
    );
    uiSchema = generateUiSchema(schema, phoneFieldsConfig.name, {
      'ui:field': phoneFieldsConfig.name, // Specify the field type for UI
    });
    if (hasPhoneFields(statedForm)) {
      statedForm = generateFormData(
        props.formData,
        phoneFieldsConfig.fields, // Fields to transform
        phoneFieldsConfig.name // The parent field name
      );
    }
  }
  if (filter) {
    schema = createSchemaWithFilters({
      filter,
      schema,
    });
  }
  // Merge any additional UI schema provided via props
  if (props.uiSchema) {
    uiSchema = mergeUISchemaObjects(uiSchema, props.uiSchema);
  }
  const [formData, setFormData] = useState<any>(statedForm);
  return (
    <Wrapper className="h-full">
      <Form
        noHtml5Validate
        liveValidate
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
        validator={customizeValidator({
          ajvOptionsOverrides: {
            removeAdditional: true,
          },
        })} // Custom validator
        fields={{ ...Default.fields, ...props.fields }} // Merge custom fields
        widgets={{ ...Default.widgets, ...props.widgets }} // Merge custom widgets
        templates={{ ...Default.templates, ...props.templates }} // Merge custom templates
        uiSchema={uiSchema} // Set the generated UI schema
        onChange={(e) => {
          // Handle form data change
          if (props.usePhoneField) {
            e.formData = flattenGenericData(e.formData, 'phone', [
              'areaCode',
              'ituCountryCode',
              'localNumber',
            ]);
          }
          if (props.onChange) props.onChange(e); // Call the onChange prop if provided
          setFormData(e.formData);
        }}
        onSubmit={(_data, event) => {
          const data = _data;
          // Handle form submission
          if (props.usePhoneField) {
            data.formData = flattenGenericData(data.formData, 'phone', [
              'areaCode',
              'ituCountryCode',
              'localNumber',
            ]);
          }
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
