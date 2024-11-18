'use client';

import { useEffect, useState } from 'react';
import { z } from 'zod';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import AutoForm, {
  AutoFormSubmit,
  ZodObjectOrWrapped,
} from '../../organisms/auto-form';
import SheetSide from '../sheet';
import {
  TableActionAutoform,
  TableActionCommon,
  TableActionDialog,
} from '../tables/types';
import { getCTA } from '../tables/helper-components';
import CustomButton from '../button';

export type TableActionCustomDialog<Tdata = unknown> =
  TableActionCommon<Tdata> & TableActionDialog<Tdata>;
export type CustomTableActionDialogProps<Tdata = unknown> = {
  action: TableActionCustomDialog<Tdata>;
  onOpenChange: (e: boolean) => void;
  open: boolean;
  triggerData?: Tdata;
  type?: 'Sheet' | 'Dialog';
};

const AutoFormData = <Tdata = unknown,>(
  action: TableActionAutoform<Tdata>,
  values: Partial<z.infer<ZodObjectOrWrapped>>,
  onOpenChange: (e: boolean) => void,
  triggerData?: any
) => {
  const [_values, setValues] =
    useState<Partial<z.infer<ZodObjectOrWrapped>>>(values);
  useEffect(() => {
    if (action?.autoFormArgs?.preFetch) {
      const { functionCall } = action.autoFormArgs.preFetch;
      functionCall(triggerData).then((data) => {
        setValues(data);
      });
    }
  }, []);

  return (
    <AutoForm
      {...action?.autoFormArgs}
      values={_values}
      onSubmit={(formData) => {
        action?.callback(formData, triggerData, onOpenChange);
      }}
    >
      <>
        {action?.autoFormArgs?.children}
        <AutoFormSubmit
          className={cn('float-right', action?.autoFormArgs?.submit?.className)}
        >
          {action.autoFormArgs.submit?.cta || 'Save Changes'}
        </AutoFormSubmit>
      </>
    </AutoForm>
  );
};

export default function CustomTableActionDialog<Tdata = unknown>({
  open,
  onOpenChange,
  action,
  triggerData,
  type = 'Dialog',
}: CustomTableActionDialogProps<Tdata>) {
  const [values, setValues] = useState<any>(undefined);
  const autoFormData =
    action.componentType === 'Autoform'
      ? AutoFormData(action, values, onOpenChange, triggerData)
      : undefined;
  useEffect(() => {
    if (action.componentType === 'Autoform') {
      setValues({ ...triggerData, ...action.autoFormArgs.values });
    }
  }, []);
  const content =
    'loadingContent' in action
      ? action?.content || action.loadingContent
      : undefined;
  let cta = 'cta';
  let description = 'description';
  if (triggerData) {
    cta = getCTA<Tdata>(action?.cta, triggerData);
    description = getCTA<Tdata>(action?.description, triggerData);
  }

  return type === 'Sheet' ? (
    <SheetSide
      open={open}
      onOpenChange={onOpenChange}
      position="bottom"
      title={cta}
      description={description}
    >
      <>
        {autoFormData && autoFormData}
        {content}
      </>
    </SheetSide>
  ) : (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] max-h-[90vh] overflow-auto [&::-webkit-scrollbar]:hidden">
        <DialogHeader>
          <DialogTitle>{cta}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4">
          {autoFormData && autoFormData}
          {content}
        </div>
        {action.componentType === 'ConfirmationDialog' ? (
          <DialogFooter>
            <CustomButton
              onClick={() => {
                onOpenChange(false);
              }}
              variant="outline"
            >
              {action.cancelCTA || 'Cancel'}
            </CustomButton>
            <CustomButton
              onClick={() => {
                if (action?.callback) action?.callback(triggerData);
                onOpenChange(false);
              }}
              variant={action.variant || 'primary'}
            >
              {cta}
            </CustomButton>
            {/* TODO: Dialog footer to add whatever children we need */}
          </DialogFooter>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}
