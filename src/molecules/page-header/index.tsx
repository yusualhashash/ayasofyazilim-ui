import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

interface IPageHeaderProps {
  description?: string;
  isLoading?: boolean;
  onBackButtonClick?: () => void;
  title?: string;
}

export const PageHeader = ({
  title,
  description,
  isLoading,
  onBackButtonClick,
}: IPageHeaderProps) => {
  if (isLoading) {
    return (
      <div className="mb-5 flex items-center gap-4">
        {onBackButtonClick && <Skeleton className="h-12 w-12 bg-gray-200" />}
        <div>
          <Skeleton className="h-6 w-80 bg-gray-200" />
          <Skeleton className="h-6 w-120 bg-gray-200 mt-1" />
        </div>
      </div>
    );
  }
  return (
    <div className="mb-5 flex items-center gap-4">
      {onBackButtonClick && (
        <Button
          asChild
          className="size-12 rounded-xl cursor-pointer"
          size="icon"
          variant="outline"
          onClick={onBackButtonClick}
        >
          <span>
            <ArrowLeft />
          </span>
        </Button>
      )}
      <div>
        <h1 className="text-2xl font-medium">{title}</h1>
        <p className="text-sm text-neutral-500">{description}</p>
      </div>
    </div>
  );
};
