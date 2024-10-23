import { ArrayFieldTemplateProps } from '@rjsf/utils';
import { Plus, Trash } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export const MyArrayFieldTemplate = (props: ArrayFieldTemplateProps) => (
  <div className="border-l-2 p-2 my-2">
    {props.title && <div className="text-lg font-bold">{props.title}</div>}
    {props.items &&
      props.items.map((itemProps) => (
        <>
          {itemProps.children}
          {itemProps.hasRemove && (
            <Button
              type="button"
              variant="outline"
              onClick={itemProps.onDropIndexClick(itemProps.index)}
            >
              Remove {props.title}
            </Button>
          )}
        </>
      ))}
    {props.canAdd && (
      <Button
        type="button"
        variant="outline"
        className="ml-2"
        onClick={props.onAddClick}
      >
        Add
      </Button>
    )}
  </div>
);

export const AccordionArrayFieldTemplate = (props: ArrayFieldTemplateProps) => (
  <Accordion
    type="single"
    collapsible
    className="w-full group"
    defaultValue={props.title}
  >
    <AccordionItem
      value={props.title}
      className="border-0 [&>h3]:sticky [&>h3]:top-0 [&>h3]:z-10"
    >
      <AccordionTrigger
        onClick={(ev) => props.items.length === 0 && ev.preventDefault()}
        className={cn(
          'flex gap-4 overflow-hidden items-center bg-white py-2 px-4 rounded-md border relative group-has-[div>div>div>*]:rounded-b-none hover:no-underline hover:[&>span]:underline hover:bg-zinc-50',
          props.items.length === 0 && '[&>svg]:hidden pr-2'
        )}
      >
        {props.title && (
          <span className="w-full text-left">
            {props.title}
            {props.required && <span className="text-destructive">*</span>}
          </span>
        )}
        {props.canAdd && (
          <Button
            type="button"
            variant="secondary"
            className="ml-2 z-10 !no-underline"
            onClick={(ev) => {
              ev.preventDefault();
              props.onAddClick();
            }}
            asChild
          >
            <div>
              <Plus className="mr-2" size={16} />
              <span>Add</span>
            </div>
          </Button>
        )}
      </AccordionTrigger>
      <AccordionContent
        className={cn(
          'flex flex-col gap-4 has-[*]:border p-0 has-[*]:p-4 has-[*]:border-t-0 rounded-b-md'
        )}
      >
        {props.items &&
          props.items.map((itemProps) => (
            <div
              className="flex relative pr-12 rounded-md border [&>fieldset]:border-none"
              key={itemProps.key}
            >
              {itemProps.children}
              {itemProps.hasRemove && (
                <Button
                  variant="destructive"
                  type="button"
                  size="icon"
                  className="text-destructive hover:text-white absolute right-0 top-0 h-full bg-destructive/10 rounded-l-none "
                  onClick={itemProps.onDropIndexClick(itemProps.index)}
                >
                  <Trash className="size-4" />
                </Button>
              )}
            </div>
          ))}
      </AccordionContent>
    </AccordionItem>
  </Accordion>
);
