import { ArrowLeft } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

interface IPageBackButtonProps {
  LinkElement: any;
  description?: string;
  href: string;
  isLoading?: boolean;
  title?: string;
}
interface IPageHeaderProps {
  LinkElement?: undefined;
  description?: string;
  href?: undefined;
  isLoading?: boolean;
  title?: string;
}

export const PageHeader = ({
  title,
  description,
  isLoading,
  LinkElement,
  href,
}: IPageHeaderProps | IPageBackButtonProps) => {
  if (isLoading) {
    return (
      <div className="mb-5 flex items-center gap-4">
        {LinkElement && <Skeleton className="h-12 w-12 bg-gray-200" />}
        <div>
          <Skeleton className="h-6 w-80 bg-gray-200" />
          <Skeleton className="h-6 w-120 bg-gray-200 mt-1" />
        </div>
      </div>
    );
  }
  return (
    <div className="mb-5 flex items-center gap-4">
      {LinkElement && (
        <LinkElement className="size-12 rounded-xl cursor-pointer" href={href}>
          <span>
            <ArrowLeft />
          </span>
        </LinkElement>
      )}
      <div>
        <h1 className="text-2xl font-medium">{title}</h1>
        <p className="text-sm text-neutral-500">{description}</p>
      </div>
    </div>
  );
};
