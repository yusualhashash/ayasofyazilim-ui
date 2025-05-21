import { ArrayFieldTemplateProps } from '@rjsf/utils';
import { CircleXIcon, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import * as Table from '@/components/ui/table';
import { fieldOptionsByDependency } from '../../utils/dependency';

export const TableArrayFieldTemplate = (props: ArrayFieldTemplateProps) => {
  const { items, required, canAdd, onAddClick, uiSchema, disabled } = props;
  // const displayName = uiSchema?.['ui:title'] || title;
  const addable = uiSchema?.['ui:options']?.addable || canAdd;
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
    <Table.Table className="col-span-full">
      <Table.TableHeader>
        <Table.TableRow className="border-x border-t bg-gray-100">
          {props.idSchema &&
            Object.keys(props.idSchema).map((item) => {
              if (item === '$id') return null;
              return (
                <Table.TableHead
                  className="text-nowrap text-xs font-bold p-0"
                  key={item}
                >
                  <div className="flex h-10 items-center justify-center w-full border-r">
                    {item}
                  </div>
                </Table.TableHead>
              );
            })}
          <Table.TableHead className="text-nowrap text-xs p-0">
            {addable && (
              <Button
                variant="outline"
                size="icon"
                className="bg-transparent rounded-none h-10 border-0 text-black"
                onClick={onAddClick}
              >
                <PlusCircle className="h-4 w-4" />
              </Button>
            )}
          </Table.TableHead>
        </Table.TableRow>
      </Table.TableHeader>
      <Table.TableBody className="[&_tr:last-child]:border-x">
        {items &&
          items.map((item) => (
            <Table.TableRow className="border-0 border-x" key={item.key}>
              {item.children}
              {item.hasRemove && (
                <Table.TableCell className="p-0">
                  <Button
                    variant="outline"
                    size="icon"
                    className="text-destructive rounded-none h-10 border-0 border-b"
                    onClick={item.onDropIndexClick(item.index)}
                  >
                    <CircleXIcon className="size-4" />
                  </Button>
                </Table.TableCell>
              )}
            </Table.TableRow>
          ))}
      </Table.TableBody>
    </Table.Table>
  );
};
