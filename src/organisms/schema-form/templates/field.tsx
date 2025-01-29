import { FieldTemplateProps } from '@rjsf/utils';
import { cn } from '@/lib/utils';
import { FieldLabel } from '../custom/label';
import { fieldOptionsByDependency } from '../utils/dependency';

export function FieldTemplate(props: FieldTemplateProps) {
  const {
    id,
    classNames,
    style,
    label,
    required,
    description,
    errors,
    children,
    uiSchema,
    displayLabel,
    schema,
    disabled,
  } = props;
  if (schema.type === 'object' || schema.type === 'array') {
    return children;
  }
  const dependencyOptions = fieldOptionsByDependency(
    uiSchema,
    props.formContext
  );
  const fieldOptions = {
    disabled,
    required,
    ...dependencyOptions,
  };
  if (fieldOptions.hidden) return null;
  return (
    <div
      className={cn(uiSchema?.['ui:className'], classNames, 'w-full')}
      style={style}
    >
      {displayLabel && schema.type !== 'boolean' && (
        <FieldLabel id={id} label={label} required={fieldOptions.required} />
      )}
      {description}
      {/* TODO : Add description field */}
      {children}
      {errors}
      {/* <p className="text-xs">{help}</p> */}
      {/* TODO : Add help field */}
    </div>
  );
}
