'use client';
import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from 'recharts';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { EXERCISE_TYPES } from '@/constants/consts';
import type { TStatistic } from '@/types';
import { EmptyStats } from './index';

const chartConfig = {
  count: {
    label: 'количество',
    color: 'orange',
  },
  label: { color: 'red ' },
} satisfies ChartConfig;

export const TrainTypeStatistic = ({ statistic }: { statistic: TStatistic | null }) => {
  let data: { name: string; count: number }[] = [];
  let favouriteType = '';
  if (statistic?.trainTypes && Object.keys(statistic.trainTypes).length > 0) {
    data = Object.entries(statistic.trainTypes).map(([name, count]) => ({
      name: EXERCISE_TYPES[name as keyof typeof EXERCISE_TYPES],
      count,
    }));
    favouriteType = Object.entries(statistic.trainTypes).reduce((a, b) => (a[1] > b[1] ? a : b))[0];
  }

  return (
    <Card className="w-full flex-1 basis-1/3 rounded-xl border-none bg-white shadow-md lg:max-w-lg">
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
            <BarChart
              accessibilityLayer
              data={data}
              layout="vertical"
              margin={{
                right: 16,
              }}>
              <CartesianGrid horizontal={false} />
              <YAxis
                dataKey="name"
                type="category"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={value => value.slice(0, 3)}
                hide
              />
              <XAxis dataKey="count" type="number" hide />
              <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dot" />} />
              <Bar dataKey="count" layout="vertical" fill="var(--color-count)" radius={4}>
                <LabelList dataKey="name" position="insideLeft" offset={8} className="fill-white" fontSize={12} />
                <LabelList dataKey="count" position="right" offset={8} className="fill-black" fontSize={12} />
              </Bar>
            </BarChart>
          ) : (
            <EmptyStats />
          )}
        </ChartContainer>
        <CardFooter>
          <CardDescription className="mt-2">Статистика по типам тренировок</CardDescription>
        </CardFooter>
      </CardContent>
    </Card>
  );
};
