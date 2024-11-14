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
import { TanstackTableActionsCustomDialog } from '../types';

type TanstackTableCustomDialogProps = {
  setDialogOpen: () => void;
} & TanstackTableActionsCustomDialog;
export function TanstackTableTableCustomDialog({
  title,
  confirmationText,
  onCancel,
  onConfirm,
  cancelText,
  content,
  setDialogOpen,
}: TanstackTableCustomDialogProps) {
  const [isDeletePending, startDeleteTransition] = React.useTransition();

  const handleOnConfirmClick = () => {
    startDeleteTransition(() => {
      onConfirm?.();
      setDialogOpen();
    });
  };
  const handleOnCancelClick = () => {
    startDeleteTransition(() => {
      onCancel?.();
      setDialogOpen();
    });
  };

  return (
    <Dialog open onOpenChange={setDialogOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        {content}
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
      </DialogContent>
    </Dialog>
  );
}
