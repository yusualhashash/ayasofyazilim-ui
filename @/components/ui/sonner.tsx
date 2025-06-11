'use client';
import { Button } from '@/components/ui/button';
import { CopyIcon } from 'lucide-react';
import { ExternalToast, Toaster as Sonner, toast as toastCore } from 'sonner';

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  // const { theme = 'system' } = useTheme();

  return (
    <Sonner
      // theme={theme as ToasterProps['theme']}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            'group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg',
          description: 'group-[.toast]:text-muted-foreground',
          actionButton:
            'group-[.toast]:bg-primary group-[.toast]:text-primary-foreground',
          cancelButton:
            'group-[.toast]:bg-muted group-[.toast]:text-muted-foreground',
        },
      }}
      {...props}
    />
  );
};
const toast = {
  ...toastCore,
  error: (message: string | React.ReactNode, data?: ExternalToast) => {
    toastCore.error(message, {
      action: (
        <Button
          size="icon"
          variant={'ghost'}
          className="ml-auto"
          onClick={() => {
            try {
              navigator.clipboard.writeText(message as string);
            } catch (error) {
              toast.error('Failed to copy to clipboard');
            }
          }}
        >
          <CopyIcon className="size-4" />
          <span className="sr-only">Copy</span>
        </Button>
      ),
      ...data,
    });
  },
};
export { toast, Toaster };
