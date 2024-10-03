import { ArrayFieldTemplateProps } from '@rjsf/utils';
import { Fragment } from 'react';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';

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
  <Accordion type="single" collapsible className="w-full">
    <AccordionItem value={props.title}>
      <AccordionTrigger>
        {props.title && <div className="text-lg font-bold">{props.title}</div>}
      </AccordionTrigger>
      <AccordionContent className="pl-6">
        {props.items &&
          props.items.map((itemProps) => (
            <Fragment key={itemProps.key}>
              {itemProps.children}
              {itemProps.hasRemove && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={itemProps.onDropIndexClick(itemProps.index)}
                >
                  Remove
                </Button>
              )}
            </Fragment>
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
      </AccordionContent>
    </AccordionItem>
  </Accordion>
);
