import { FieldTemplateProps } from '@rjsf/utils';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

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
  } = props;
  if (schema.type === 'object' || schema.type === 'array') {
    return children;
  }
  return (
    <div
      className={cn(uiSchema?.['ui:className'], classNames, 'w-full')}
      style={style}
    >
      {displayLabel && schema.type !== 'boolean' && (
        <Label htmlFor={id}>
          {label}
          {required ? <span className="text-destructive">*</span> : null}
        </Label>
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
