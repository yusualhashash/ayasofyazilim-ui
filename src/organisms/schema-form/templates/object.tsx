import { ObjectFieldTemplateProps } from '@rjsf/utils';
import { Fragment } from 'react/jsx-runtime';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

export const ObjectFieldTemplate = (props: ObjectFieldTemplateProps) => {
  const { uiSchema, title, required } = props;
  return (
    <div
      className={cn(
        'flex flex-col gap-2 flex-1 w-full',
        uiSchema?.['ui:className'],
        title && 'border p-4 rounded-md bg-white'
      )}
    >
      {title && uiSchema?.displayLabel !== false && (
        <Label className="w-full col-span-full">
          {title}
          {required ? <span className="text-destructive">*</span> : null}
        </Label>
      )}
      {props.properties.map((element) => (
        <Fragment key={element.name}>{element.content}</Fragment>
      ))}
    </div>
  );
};
