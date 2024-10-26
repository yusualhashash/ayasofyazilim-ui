import { ObjectFieldTemplateProps } from '@rjsf/utils';
import { Fragment } from 'react/jsx-runtime';

export const ObjectFieldTemplate = (props: ObjectFieldTemplateProps) => (
  <>
    {/* {props.title} */}
    {/* {props.description} */}
    {props.properties.map((element) => (
      <Fragment key={element.name}>{element.content}</Fragment>
    ))}
  </>
);
