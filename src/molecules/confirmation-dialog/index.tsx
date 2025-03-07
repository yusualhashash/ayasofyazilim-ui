'use client';

import { useState, useTransition, type ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

type ConfirmationDialogType = {
  title: string;
  description: string;
  onConfirm: () => void | Promise<void>;
  onCancel?: () => void | Promise<void>;
  confirmText?: string;
  cancelText?: string;
  type: 'danger' | 'info';
  children?: ReactNode;
};
export function ConfirmationDialog({
  title,
  description,
  onConfirm,
  onCancel,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  type,
  children,
}: ConfirmationDialogType) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  function handleAction(action?: () => void | Promise<void>) {
    if (!action) {
      setOpen(false);
      return;
    }
    startTransition(() => {
      action();
      setOpen(false);
    });
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-end">
          <Button
            variant="secondary"
            disabled={isPending}
            onClick={() => handleAction(onCancel)}
          >
            {cancelText}
          </Button>
          <Button
            disabled={isPending}
            onClick={() => handleAction(onConfirm)}
            variant={type === 'danger' ? 'destructive' : 'default'}
          >
            {confirmText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
