import { ObjectFieldTemplateProps } from '@rjsf/utils';
import { Fragment } from 'react/jsx-runtime';
import { cn } from '@/lib/utils';
import { fieldOptionsByDependency } from '../utils/dependency';
import { FieldLabel } from '../custom/label';

export const ObjectFieldTemplate = (props: ObjectFieldTemplateProps) => {
  const { uiSchema, title, required, disabled, description } = props;
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
      className={cn(
        'flex flex-col gap-3 flex-1 w-full',
        title && 'border p-4 rounded-md bg-white',
        uiSchema?.['ui:className']
      )}
    >
      {title && uiSchema?.displayLabel !== false && (
        <FieldLabel
          id={title}
          label={title}
          required={fieldOptions.required}
          description={description}
          className="col-span-full"
        />
      )}

      {props.properties.map((element) => (
        <Fragment key={element.name}>{element.content}</Fragment>
      ))}
    </div>
  );
};
