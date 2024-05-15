import { Skeleton } from '@/components/ui/skeleton';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export type infoCardProps = {
  content: string;
  description: string;
  footer: string;
  loading?: boolean;
  title: string;
};

export default function InfoCard(infoCard: infoCardProps) {
  const checkIsLoading = (
    loading: boolean | undefined,
    value: string,
    width: string | number = '24',
    height: string | number = '5'
  ) => (loading ? <Skeleton className={`w-${width} h-${height}`} /> : value);

  return (
    <Card className="min-w-60">
      <CardHeader className="text-base leading-7 text-gray-600">
        <CardTitle>
          {checkIsLoading(infoCard.loading, infoCard.title, 12)}
        </CardTitle>
        <CardDescription>
          {checkIsLoading(infoCard.loading, infoCard.description, 30)}
        </CardDescription>
      </CardHeader>
      <CardContent className="order-first text-center text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
        <p>{checkIsLoading(infoCard.loading, infoCard.content, 30, 24)}</p>
      </CardContent>
      <CardFooter className="text-gray-400">
        <p>{checkIsLoading(infoCard.loading, infoCard.footer, 24)}</p>
      </CardFooter>
    </Card>
  );
}
