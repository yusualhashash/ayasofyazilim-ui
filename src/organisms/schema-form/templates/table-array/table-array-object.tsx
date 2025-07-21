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
          className="[&>div_label]:hidden border-l [&_*]:shadow-none [&_*]:border-0 p-0 [&_input]:rounded-none [&_div]:bg-transparent [&_input]:bg-transparent [&_button[role=combobox]]:!bg-transparent [&_button[role=combobox]]:!rounded-none  [&_ul]:hidden [&_div.field-boolean]:justify-center"
        >
          {element.content}
        </TableCell>
      );
    })
  );
