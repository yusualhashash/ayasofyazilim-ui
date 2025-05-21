import { ObjectFieldTemplateProps } from '@rjsf/utils';
import { Fragment } from 'react/jsx-runtime';
import { TableCell } from '@/components/ui/table';

export const TableArrayObjectFieldTemplate = (
  props: ObjectFieldTemplateProps
) => {
  const { title } = props;
  return (
    <Fragment key={title}>
      {props.properties.map((element) =>
        Object.keys(props.idSchema).map((item) => {
          if (item === '$id' || item !== element.name) return null;
          return (
            <TableCell className="[&>div>label]:hidden [&>div>ul]:hidden p-0 [&>div>*]:bg-transparent [&>div>*:hover]:bg-transparent [&>div>*]:ring-inset [&>div>*]:border-0 [&>div>*]:border-b [&>div>*]:border-r [&>div>*]:shadow-none [&>div>*]:rounded-none [&>div>*]:text-xs">
              {element.content}
            </TableCell>
          );
        })
      )}
    </Fragment>
  );
};
