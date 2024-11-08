'use client';

import * as React from 'react';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import AutoForm, { AutoFormSubmit } from '../../organisms/auto-form';
import { TanstackTableRowActionsAutoformDialog } from './types';

type TanstackTableAutoformDialogProps<TData> = {
  row: TData;
  setDialogOpen: () => void;
} & TanstackTableRowActionsAutoformDialog<TData>;
export function TanstackTableAutoformDialog<TData>({
  row,
  title,
  submitText,
  onSubmit,
  schema,
  className,
  values,
  setDialogOpen,
}: TanstackTableAutoformDialogProps<TData>) {
  const dialogTitle = typeof title === 'function' ? title(row) : title;
  const autoformValues = typeof values === 'function' ? values(row) : values;

  return (
    <Dialog open onOpenChange={setDialogOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{dialogTitle}</DialogTitle>
        </DialogHeader>
        <AutoForm
          formSchema={schema}
          className={className?.autoform}
          values={autoformValues}
          onSubmit={(formData) => {
            onSubmit(formData as TData);
          }}
        >
          <AutoFormSubmit className={cn('float-right', className?.submit)}>
            {submitText}
          </AutoFormSubmit>
        </AutoForm>
      </DialogContent>
    </Dialog>
  );
}
