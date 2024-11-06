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

export const AccordionArrayFieldTemplate = (props: ArrayFieldTemplateProps) => {
  const { items, title, required, canAdd, onAddClick, uiSchema, disabled } =
    props;
  const displayName = uiSchema?.['ui:title'] || title;
  return (
    <Accordion
      type="single"
      collapsible
      className={cn('w-full group', uiSchema?.['ui:className'])}
      defaultValue={title}
    >
      <AccordionItem
        value={title}
        className="border-0 [&>h3]:sticky [&>h3]:top-0 [&>h3]:z-10"
      >
        <AccordionTrigger
          onClick={(ev) => items.length === 0 && ev.preventDefault()}
          className={cn(
            'flex gap-4 overflow-hidden items-center bg-white py-2 px-4 rounded-md border relative group-has-[div>div>div>*]:rounded-b-none hover:no-underline hover:[&>span]:underline hover:bg-zinc-50',
            items.length === 0 && '[&>svg]:hidden pr-2',
            disabled &&
              'cursor-default pointer-events-none hover:[&>span]:no-underline text-muted-foreground opacity-50'
          )}
        >
          {displayName && (
            <span className="w-full text-left">
              {displayName}
              {required && <span className="text-destructive">*</span>}
            </span>
          )}
          {canAdd && (
            <Button
              disabled={disabled}
              type="button"
              variant="secondary"
              className={cn(
                'ml-2 z-10 !no-underline',
                disabled && 'pointer-events-none'
              )}
              onClick={(ev) => {
                if (disabled) return;
                ev.preventDefault();
                onAddClick();
              }}
              role="button"
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
          {items &&
            items.map((itemProps) => (
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
};
