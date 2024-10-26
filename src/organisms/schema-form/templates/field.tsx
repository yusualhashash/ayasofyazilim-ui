import { FieldTemplateProps } from '@rjsf/utils';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
// field itself
export function FieldTemplate(props: FieldTemplateProps) {
  const {
    id,
    classNames,
    style,
    label,
    help,
    required,
    description,
    errors,
    children,
    uiSchema,
    displayLabel,
    schema,
  } = props;
  if (schema.type === 'object') {
    return (
      <fieldset
        className={cn(
          'flex flex-col gap-2 flex-1 w-full',
          uiSchema?.['ui:className'],
          classNames,
          label && 'border p-4 rounded-md bg-white'
        )}
        style={style}
      >
        {label && (
          <Label asChild>
            <span>
              {/* <legend className="px-4"> */}
              {label}
              {required && <span className="text-destructive">*</span>}
              {/* </legend> */}
            </span>
          </Label>
        )}
        {children}
        {errors}
        {help}
      </fieldset>
    );
  }
  return (
    <div
      className={cn(uiSchema?.['ui:className'], classNames, 'x')}
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
