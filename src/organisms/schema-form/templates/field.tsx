import { FieldTemplateProps } from '@rjsf/utils';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

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
  } = props;
  return (
    <div className={cn('mb-2', classNames)} style={style}>
      {props.schema.type !== 'array' && (
        <Label htmlFor={id}>
          {label}
          {required ? '*' : null}
        </Label>
      )}
      {description}
      {/* TODO : Add description field */}
      {children}
      {errors}
      <p className="text-xs">{help}</p>
      {/* TODO : Add help field */}
    </div>
  );
}
