'use client';
import { CartesianGrid, Line, LineChart, XAxis } from 'recharts';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { getFormattedTime } from '@/lib/TimeFn';
import type { TStatistic } from '@/types';
import { EmptyStats } from './index';

const chartConfig = {
  timer: {
    label: 'время тренировки',
    color: 'orange',
  },
} satisfies ChartConfig;

export const TimeStatistic = ({ statistic }: { statistic: TStatistic | null }) => {
  const data = statistic ? [...statistic.difficulties].slice(-10) : [];

  return (
    <Card className="flex w-full flex-1 rounded-xl border-none bg-white shadow-md lg:max-w-3xl">
      <CardHeader>
        <CardTitle className="text-lg md:text-xl lg:text-2xl">Общее время тренировок</CardTitle>
        <CardDescription>
          <h3 className="text-3xl font-bold text-yellow-500 md:text-4xl">
            {statistic ? getFormattedTime(statistic.alltime) : '00:00:00'}
          </h3>
          <span className="text-xs text-gray-500 md:text-sm">за все время</span>
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <ChartContainer config={chartConfig}>
          {data.length > 0 ? (
            <LineChart accessibilityLayer data={data} margin={{ top: 20, left: 35, right: 35, bottom: 20 }}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={value => {
                  const date = new Date(value);
                  return date.toLocaleDateString('ru-Ru', {
                    month: 'short',
                    day: 'numeric',
                  });
                }}
              />
              <ChartTooltip
                cursor={true}
                content={<ChartTooltipContent hideLabel />}
                formatter={value => ['Время тренировки', ` ${getFormattedTime(Number(value))}`]}
              />
              <Line
                dataKey="timer"
                type="natural"
                stroke="orange"
                strokeWidth={2}
                dot={{
                  fill: 'orange',
                }}
                activeDot={{
                  r: 6,
                }}
              />
            </LineChart>
          ) : (
            <EmptyStats />
          )}
        </ChartContainer>
        <CardFooter>
          <CardDescription className="mt-2">Динамика за 10 последних тренировок</CardDescription>
        </CardFooter>
      </CardContent>
    </Card>
  );
};
