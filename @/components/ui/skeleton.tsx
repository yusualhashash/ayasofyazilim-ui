import { cn } from '@/lib/utils';

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'ay-animate-pulse ay-rounded-md ay-bg-primary/10',
        className
      )}
      {...props}
    />
  );
}

export { Skeleton };
