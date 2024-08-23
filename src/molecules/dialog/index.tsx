'use client';

import React, { useState } from 'react';
import { z } from 'zod';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import AutoForm, {
  AutoFormSubmit,
  SchemaType,
} from '../../organisms/auto-form';
import SheetSide from '../sheet';
import {
  TableActionAutoform,
  TableActionCommon,
  TableActionDialog,
} from '../tables';

export type TableAction = TableActionCommon & TableActionDialog;
export type CustomTableActionDialogProps = {
  action: TableAction;
  onOpenChange: (e: boolean) => void;
  open: boolean;
  triggerData?: any;
  type?: 'Sheet' | 'Dialog';
};

const AutoFormData = (
  action: TableActionAutoform,
  values: Partial<z.infer<SchemaType>>,
  triggerData?: any
) => (
  <AutoForm
    {...action?.autoFormArgs}
    values={values}
    onSubmit={(formData) => {
      action?.callback(formData, triggerData);
    }}
  >
    <>
      {action?.autoFormArgs?.children}
      <AutoFormSubmit className="float-right">Save Changes</AutoFormSubmit>
    </>
  </AutoForm>
);

export default function CustomTableActionDialog({
  open,
  onOpenChange,
  action,
  triggerData,
  type = 'Dialog',
}: CustomTableActionDialogProps) {
  const [values] = useState<any>(triggerData || {});
  const autformData =
    action && 'autoFormArgs' in action
      ? AutoFormData(action, triggerData, values)
      : undefined;
  const content =
    'loadingContent' in action
      ? action?.content || action.loadingContent
      : undefined;

  return type === 'Sheet' ? (
    <SheetSide
      open={open}
      onOpenChange={onOpenChange}
      position="right"
      title={action?.cta}
      description={action?.description}
    >
      <>
        {autformData}
        {content}
      </>
    </SheetSide>
  ) : (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] max-h-[90vh] overflow-auto [&::-webkit-scrollbar]:hidden">
        <DialogHeader>
          <DialogTitle>{action?.cta}</DialogTitle>
          <DialogDescription>{action?.description}</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {autformData}
          {content}
        </div>
        <DialogFooter>
          {/* TODO: Dialog footer to add whatever children we need */}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
