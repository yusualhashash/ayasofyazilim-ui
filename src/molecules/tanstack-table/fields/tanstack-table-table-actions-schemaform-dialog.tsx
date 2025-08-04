'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { SchemaForm } from '../../../organisms/schema-form';
import { TanstackTableActionsSchemaFormDialog } from '../types';

type TanstackTableSchemaFormDialogProps<TData> = {
  setDialogOpen: () => void;
} & TanstackTableActionsSchemaFormDialog<TData>;
export function TanstackTableTableSchemaFormDialog<TData>(
  props: TanstackTableSchemaFormDialogProps<TData>
) {
  const { title, setDialogOpen, onSubmit } = props;
  return (
    <Dialog open onOpenChange={setDialogOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <SchemaForm
          {...props}
          onSubmit={(data) => {
            onSubmit(data.formData);
            setDialogOpen();
          }}
        />
      </DialogContent>
    </Dialog>
  );
}
