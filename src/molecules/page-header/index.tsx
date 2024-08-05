import { Skeleton } from '@/components/ui/skeleton';

interface IPageHeaderProps {
  description?: string;
  isLoading?: boolean;
  title?: string;
}

export const PageHeader = ({
  title,
  description,
  isLoading,
}: IPageHeaderProps) => {
  if (isLoading) {
    return (
      <div className="mb-4 space-y-2">
        <Skeleton className="h-6 w-80 bg-gray-200" />
        <Skeleton className="h-6 w-120 bg-gray-200" />
      </div>
    );
  }
  return (
    <div className="mb-5">
      <h1 className="text-2xl font-medium">{title}</h1>
      <p className="text-sm text-neutral-500">{description}</p>
    </div>
  );
};
