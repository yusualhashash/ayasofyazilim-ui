import { Plus, Trash } from 'lucide-react';
import { useFieldArray, useForm } from 'react-hook-form';
import * as z from 'zod';
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Accordion,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { beautifyObjectName } from '../utils';
import AutoFormObject from './object';

const isZodArray = (
  item: z.ZodArray<any> | z.ZodDefault<any>
): item is z.ZodArray<any> => item instanceof z.ZodArray;

const isZodDefault = (
  item: z.ZodArray<any> | z.ZodDefault<any>
): item is z.ZodDefault<any> => item instanceof z.ZodDefault;

export default function AutoFormArray({
  name,
  item,
  form,
  path = [],
  fieldConfig,
}: {
  fieldConfig?: any;
  form: ReturnType<typeof useForm>;
  item: z.ZodArray<any> | z.ZodDefault<any>;
  name: string;
  path?: string[];
}) {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name,
  });
  // useEffect(() => {
  //   const formvalues = form.getValues();
  //   if (JSON.stringify(formvalues) === '{}') {
  //     return;
  //   }
  //   let object = formvalues;
  //   path.forEach((key) => {
  //     if (object[key]) {
  //       object = object[key];
  //     }
  //   });
  //   append(object);
  // }, []);
  function createItemName(
    item: z.ZodArray<any> | z.ZodDefault<any>,
    name: string = ''
  ) {
    if (!fieldConfig)
      return item._def.description
        ? beautifyObjectName(item._def.description)
        : beautifyObjectName(name);
    return fieldConfig?.displayName
      ? // @ts-ignore
        fieldConfig.displayName
      : beautifyObjectName(name);
  }
  // const _title = item._def.description ?? beautifyObjectName(name);
  const title = createItemName(item, name) ?? name;
  let itemDefType = isZodArray(item)
    ? item._def.type
    : isZodDefault(item)
      ? item._def.innerType._def.type
      : null;
  if (itemDefType === null) {
    itemDefType = (item._def as any).innerType._def.innerType.element;
  }
  // TODO ADD IF HAS VALUE OPEN BY DEFAULT
  return (
    <div className={fieldConfig.containerClassName}>
      <Accordion type="single" defaultValue={name}>
        <AccordionItem value={name} className="border-none">
          <AccordionTrigger>{title}</AccordionTrigger>
          <AccordionContent>
            {fields.map((_field, index) => {
              const key = _field.id;
              return (
                <div className="mt-4 flex flex-col" key={`${key}`}>
                  <AutoFormObject
                    schema={itemDefType as z.ZodObject<any, any>}
                    form={form}
                    fieldConfig={fieldConfig}
                    path={[...path, index.toString()]}
                    className={fieldConfig.className}
                  />
                  <div className="my-4 flex justify-end">
                    <Button
                      variant="outline"
                      type="button"
                      className=""
                      onClick={() => remove(index)}
                    >
                      {fieldConfig.buttons?.remove ? (
                        fieldConfig.buttons?.remove
                      ) : (
                        <>
                          <Trash className="size-4 mr-2" />
                          {title}
                        </>
                      )}
                    </Button>
                  </div>

                  <Separator />
                </div>
              );
            })}
            {fieldConfig.buttons?.canAdd !== false && (
              <Button
                type="button"
                variant="secondary"
                onClick={() => append({})}
                className="mt-4 flex items-center"
              >
                {fieldConfig.buttons?.add ? (
                  fieldConfig.buttons?.add
                ) : (
                  <>
                    <Plus className="mr-2" size={16} />
                    {title}
                  </>
                )}
              </Button>
            )}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
