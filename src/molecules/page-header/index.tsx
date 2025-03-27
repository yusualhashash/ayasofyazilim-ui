'use client';

import { ArrowLeft } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { useMemo } from 'react';
import { cva } from 'class-variance-authority';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

// Define variants
const pageHeaderVariants = cva(
  'mb-4 flex items-center gap-4 px-2', // Base classes
  {
    variants: {
      align: {
        left: '',
        center: 'text-center mx-auto',
        right: 'text-right ml-auto',
      },
    },
    defaultVariants: {
      align: 'left',
    },
  }
);

const titleVariants = cva('', {
  variants: {
    size: {
      large: 'text-3xl font-bold',
      small: 'text-2xl font-medium',
    },
  },
  defaultVariants: {
    size: 'small',
  },
});

const descriptionVariants = cva('text-neutral-500', {
  variants: {
    size: {
      large: 'text-base',
      small: 'text-sm',
    },
  },
  defaultVariants: {
    size: 'small',
  },
});

interface IPageBackButtonProps {
  LinkElement: any;
  description?: string;
  href: string;
  isLoading?: boolean;
  title?: string;
  size?: 'large' | 'small';
  align?: 'left' | 'center' | 'right';
}

interface IPageHeaderProps {
  LinkElement?: undefined;
  description?: string;
  href?: undefined;
  isLoading?: boolean;
  title?: string;
  size?: 'large' | 'small';
  align?: 'left' | 'center' | 'right';
}

export default function PageHeader({
  title,
  description,
  isLoading,
  LinkElement,
  href,
  size = 'small',
  align = 'left',
}: IPageHeaderProps | IPageBackButtonProps) {
  const hasReferer = useMemo(
    () => typeof window !== 'undefined' && !!document.referrer,
    [
      typeof window !== 'undefined' && window,
      typeof document !== 'undefined' && document,
    ]
  );
  const router = useRouter();
  const pathname = usePathname();

  if (isLoading) {
    return (
      <div className={cn(pageHeaderVariants({ align }))}>
        {LinkElement && pathname !== href && (
          <Skeleton className="h-12 w-12 " />
        )}
        <div>
          <Skeleton className="h-6 w-80 " />
          <Skeleton className="h-6 w-120  mt-1" />
        </div>
      </div>
    );
  }

  return (
    <div className={cn(pageHeaderVariants({ align }))}>
      {hasReferer && LinkElement ? (
        <Button
          variant="outline"
          size="icon"
          onClick={() => {
            router.back();
          }}
        >
          <ArrowLeft />
        </Button>
      ) : LinkElement && pathname !== href ? (
        <LinkElement
          className="size-12 rounded-xl cursor-pointer border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground items-center justify-center flex"
          href={href}
        >
          <ArrowLeft />
        </LinkElement>
      ) : null}

      <div>
        <h1 className={cn(titleVariants({ size }))}>{title}</h1>
        <p className={cn(descriptionVariants({ size }))}>{description}</p>
      </div>
    </div>
  );
}
