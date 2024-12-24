'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { SchemaForm } from '../../../organisms/schema-form';
import { TanstackTableActionsSchemaFormDialog } from '../types';

type TanstackTableSchemaFormDialogProps = {
  setDialogOpen: () => void;
} & TanstackTableActionsSchemaFormDialog;
export function TanstackTableTableSchemaFormDialog({
  title,
  submitText,
  onSubmit,
  schema,
  filter,
  widgets,
  setDialogOpen,
  uiSchema,
}: TanstackTableSchemaFormDialogProps) {
  return (
    <Dialog open onOpenChange={setDialogOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <SchemaForm
          schema={schema}
          uiSchema={uiSchema}
          onSubmit={(data) => {
            onSubmit(data.formData);
            setDialogOpen();
          }}
          submitText={submitText}
          filter={filter}
          withScrollArea={false}
          widgets={widgets}
        />
      </DialogContent>
    </Dialog>
  );
}
