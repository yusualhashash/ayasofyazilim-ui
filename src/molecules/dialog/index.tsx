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
};

export default function AutoformDialog({
  open,
  onOpenChange,
  action,
  triggerData,
}: AutoformDialogProps) {
  const [values, setValues] = useState<any>(triggerData || {});
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{action?.cta}</DialogTitle>
          <DialogDescription>{action?.description}</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <AutoForm
            {...action?.autoFormArgs}
            onParsedValuesChange={(e) => {
              setValues(e);
            }}
            values={values}
            onSubmit={(formData) => {
              action?.callback(formData, triggerData);
            }}
          >
            {action?.autoFormArgs?.children}
            <AutoFormSubmit className="float-right">
              Save Changes
            </AutoFormSubmit>
          </AutoForm>
        </div>
        <DialogFooter>
          {/* TODO: Dialog footer to add whatever children we need */}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
