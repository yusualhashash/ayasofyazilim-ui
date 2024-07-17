'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import AutoForm, { AutoFormSubmit } from '../../organisms/auto-form';
import SheetSide from '../sheet';

export type tableAction = {
  autoFormArgs: any;
  callback: (values: any, triggerData: any) => void;
  cta: string;
  description: string;
};

export type AutoformDialogProps = {
  action?: tableAction;
  onOpenChange: (e: boolean) => void;
  open: boolean;
  triggerData?: any;
  type?: 'Sheet' | 'Dialog' | 'newPage';
};

const AutoFormData = (action, triggerData, values) => (
  <AutoForm
    {...action?.autoFormArgs}
    values={values}
    onSubmit={(formData) => {
      action?.callback(formData, triggerData);
    }}
  >
    {action?.autoFormArgs?.children}
    <AutoFormSubmit className="float-right">
      <button type="submit">Save Changes</button>
    </AutoFormSubmit>
  </AutoForm>
);

export default function AutoformDialog({
  open,
  onOpenChange,
  action,
  triggerData,
  type = 'Dialog',
}: AutoformDialogProps) {
  const [values] = useState<any>(triggerData || {});
  const autformData = AutoFormData(action, triggerData, values);

  return type === 'Sheet' ? (
    <SheetSide
      open={open}
      onOpenChange={onOpenChange}
      position="right"
      title={action?.cta}
      description={action?.description}
    >
      {autformData}
    </SheetSide>
  ) : (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] max-h-[90vh] overflow-auto [&::-webkit-scrollbar]:hidden">
        <DialogHeader>
          <DialogTitle>{action?.cta}</DialogTitle>
          <DialogDescription>{action?.description}</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">{autformData}</div>
        <DialogFooter>
          {/* TODO: Dialog footer to add whatever children we need */}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
