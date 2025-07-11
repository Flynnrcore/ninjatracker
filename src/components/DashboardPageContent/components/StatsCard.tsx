import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui';

export const StatsCard = ({ title, value }: { title: string; value?: number | string }) => {
  return (
    <Card className="flex w-full flex-col justify-between gap-0 border-none md:w-[48.5%] lg:w-[calc(25%-0.75rem)]">
      <CardHeader>
        <CardTitle className="text-center text-lg md:text-xl lg:text-2xl">{title}</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <p className="text-center text-2xl font-bold text-yellow-500 sm:text-3xl">{value}</p>
      </CardContent>
    </Card>
  );
};
