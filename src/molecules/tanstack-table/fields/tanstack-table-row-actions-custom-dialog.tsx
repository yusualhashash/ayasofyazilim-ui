'use client';

import { Loader } from 'lucide-react';
import * as React from 'react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { TanstackTableRowActionsCustomDialog } from '../types';

type TanstackTableCustomDialogProps<TData> = {
  row: TData;
  setDialogOpen: () => void;
} & TanstackTableRowActionsCustomDialog<TData>;
export function TanstackTableCustomDialog<TData>({
  row,
  title,
  confirmationText,
  onCancel,
  onConfirm,
  cancelText,
  content,
  setDialogOpen,
}: TanstackTableCustomDialogProps<TData>) {
  const dialogTitle = typeof title === 'function' ? title(row) : title;
  const jsxContent = typeof content === 'function' ? content(row) : content;

  const [isDeletePending, startDeleteTransition] = React.useTransition();

  const handleOnConfirmClick = () => {
    startDeleteTransition(() => {
      onConfirm?.(row);
      setDialogOpen();
    });
  };
  const handleOnCancelClick = () => {
    startDeleteTransition(() => {
      onCancel?.(row);
      setDialogOpen();
    });
  };

  return (
    <Dialog open onOpenChange={setDialogOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{dialogTitle}</DialogTitle>
        </DialogHeader>
        {jsxContent}
        {(cancelText || confirmationText) && (
          <DialogFooter className="gap-2 sm:space-x-0">
            {cancelText && (
              <DialogClose asChild>
                <Button variant="outline" onClick={handleOnCancelClick}>
                  {cancelText}
                </Button>
              </DialogClose>
            )}
            {confirmationText && (
              <Button
                aria-label={confirmationText}
                variant="destructive"
                onClick={handleOnConfirmClick}
                disabled={isDeletePending}
              >
                {isDeletePending && (
                  <Loader
                    className="mr-2 size-4 animate-spin"
                    aria-hidden="true"
                  />
                )}
                {confirmationText}
              </Button>
            )}
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}
