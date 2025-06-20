'use client';

import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from 'recharts';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { EXERCISE_TYPES } from '@/assets/mockData';

const chartConfig = {
  count: {
    label: 'количество',
    color: 'orange',
  },
} satisfies ChartConfig;

type TrainTypeStats = {
  trainTypes: Record<string, number>;
};

export const TrainTypeStatistic = ({ stats }: { stats: TrainTypeStats | null }) => {
  let data: { name: string; count: number }[] = [];
  let favouriteType = '';
  if (stats?.trainTypes && Object.keys(stats.trainTypes).length > 0) {
    data = Object.entries(stats.trainTypes).map(([name, count]) => ({
      name: EXERCISE_TYPES[name as keyof typeof EXERCISE_TYPES],
      count,
    }));
    favouriteType = Object.entries(stats.trainTypes).reduce((a, b) => (a[1] > b[1] ? a : b))[0];
  }

  return (
    <Card className="w-full max-w-md flex-1 basis-1/3 rounded-xl border-none bg-white shadow-md sm:max-w-lg md:max-w-xl">
      <CardHeader>
        <CardTitle className="text-lg md:text-xl lg:text-2xl">Любимый тип тренировки</CardTitle>
        <CardDescription>
          <h3 className="text-3xl font-bold text-yellow-500 md:text-4xl">
            {favouriteType ? EXERCISE_TYPES[favouriteType as keyof typeof EXERCISE_TYPES] : 'Недостаточно данных'}
          </h3>
          <span className="text-xs text-gray-500 md:text-sm">за все время</span>
        </CardDescription>
      </CardHeader>
      <CardContent className="m-0 h-full pb-0">
        <ChartContainer className="h-[90%] w-full p-0" config={chartConfig}>
          {data.length > 0 ? (
            <BarChart accessibilityLayer data={data} margin={{ top: 10 }}>
              <CartesianGrid vertical={false} />
              <XAxis dataKey="name" tickLine={false} axisLine={false} tickMargin={8} />
              <ChartTooltip cursor={true} content={<ChartTooltipContent />} />
              <Bar dataKey="count" type="natural" fill="orange" radius={8}>
                <LabelList position="top" offset={12} className="fill-foreground" fontSize={12} />
              </Bar>
            </BarChart>
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center">
              <p className="text-md text-gray-400">Нет данных</p>
              <p className="text-sm text-gray-400">Начни новую тренировку чтобы увидеть статистику!</p>
            </div>
          )}
        </ChartContainer>
        <CardFooter>
          <CardDescription className="mt-2 flex items-center justify-center text-center">
            Статистика по типам тренировок
          </CardDescription>
        </CardFooter>
      </CardContent>
    </Card>
  );
};
