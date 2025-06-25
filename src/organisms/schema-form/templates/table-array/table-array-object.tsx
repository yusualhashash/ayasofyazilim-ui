import { ObjectFieldTemplateProps } from '@rjsf/utils';
import { TableCell } from '@/components/ui/table';

export const TableArrayObjectFieldTemplate = (
  props: ObjectFieldTemplateProps
) =>
  props.properties.map((element) =>
    Object.keys(props.idSchema).map((item) => {
      if (item === '$id' || item !== element.name) return null;
      return (
        <TableCell
          key={element.name}
          className="[&>div_label]:hidden [&>div.field-string_.date-input]:rounded-none [&>div.field-string_.date-input]:border-none [&>div.field-boolean>div]:justify-center [&>div>ul]:hidden p-0 [&>div>*]:bg-transparent [&>div>*:hover]:bg-transparent [&>div>*]:ring-inset [&>div>*]:border-0 [&>div>*]:border-b [&>div>*]:border-r [&>div>*]:shadow-none [&>div>*]:rounded-none [&>div>*]:text-xs"
        >
          {element.content}
        </TableCell>
      );
    })
  );
