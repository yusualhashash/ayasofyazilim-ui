import { WidgetProps } from '@rjsf/utils';
import { MultiSelect, MultiSelectProps } from '../../../molecules/multi-select';

type CustomMultiSelectProps = Omit<MultiSelectProps, 'options' | 'onChange'> & {
  optionList: MultiSelectProps['options'];
};

export function CustomMultiSelect(
  props: CustomMultiSelectProps & Omit<WidgetProps, 'options'>
) {
  const { value, defaultValue, uiSchema, optionList, onChange } = props;
  const fieldValue: string[] = Array.isArray(value)
    ? value
    : defaultValue || [];
  const uiOptions = uiSchema?.['ui:options'];
  const placeholder =
    props.placeholder ||
    uiSchema?.['ui:placeholder'] ||
    uiOptions?.['ui:placeholder'];
  return (
    <div className="custom-multi-select-wrapper">
      <MultiSelect
        {...props}
        defaultValue={fieldValue}
        placeholder={placeholder}
        options={optionList}
        onValueChange={(values) => {
          onChange(values);
        }}
      />
    </div>
  );
}

export function CustomMultiSelectWidget(props: CustomMultiSelectProps) {
  function Widget(_props: Omit<WidgetProps, 'options'>) {
    return (
      <CustomMultiSelect
        {..._props}
        optionList={props.optionList}
        title={props.title}
      />
    );
  }
  return Widget;
}
