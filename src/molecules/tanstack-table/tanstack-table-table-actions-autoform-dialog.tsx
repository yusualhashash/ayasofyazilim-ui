'use client';

import { TypeOf } from 'zod';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import AutoForm, {
  AutoFormSubmit,
  ZodObjectOrWrapped,
} from '../../organisms/auto-form';
import { TanstackTableActionsAutoformDialog } from './types';

type TanstackTableAutoformDialogProps = {
  setDialogOpen: () => void;
} & TanstackTableActionsAutoformDialog;
export const TanstackTableTableAutoformDialog = ({
  title,
  submitText,
  onSubmit,
  schema,
  className,
  values,
  setDialogOpen,
}: TanstackTableAutoformDialogProps) => (
  <Dialog open onOpenChange={setDialogOpen}>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{title}</DialogTitle>
      </DialogHeader>
      <AutoForm
        formSchema={schema}
        className={className?.autoform}
        values={values}
        onSubmit={(formData) => {
          onSubmit(formData as Partial<TypeOf<ZodObjectOrWrapped>>);
        }}
      >
        <AutoFormSubmit className={cn('float-right', className?.submit)}>
          {submitText}
        </AutoFormSubmit>
      </AutoForm>
    </DialogContent>
  </Dialog>
);
