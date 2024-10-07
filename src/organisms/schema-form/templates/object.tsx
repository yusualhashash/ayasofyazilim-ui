import { ObjectFieldTemplateProps } from '@rjsf/utils';
import { cn } from '@/lib/utils';

export const ObjectFieldTemplate = (props: ObjectFieldTemplateProps) => (
  <>
    {/* {props.title} */}
    {/* {props.description} */}
    {props.properties.map((element) => (
      <div
        key={element.name}
        className={cn(
          'space-y-2 field-property',
          props.uiSchema?.['ui:classNames']
        )}
      >
        {element.content}
      </div>
    ))}
  </>
);
