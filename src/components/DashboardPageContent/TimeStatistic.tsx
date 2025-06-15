'use client';

import { CartesianGrid, Line, LineChart, XAxis } from 'recharts';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { getFormattedTime } from '@/utils/TimeFn';

const chartConfig = {
  time: {
    label: 'время тренировки',
    color: 'orange',
  },
} satisfies ChartConfig;

export const TimeStatistic = ({ stats }: { stats: any }) => {
  return (
    <Card className="w-full max-w-md flex-1 rounded-xl border-none bg-white shadow-md sm:max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-3xl">
      <CardHeader>
        <CardTitle className="text-lg md:text-xl lg:text-2xl">Время тренировок</CardTitle>
        <CardDescription>
          <h3 className="text-3xl font-bold md:text-4xl">{getFormattedTime(stats.alltime)}</h3>
          <span className="text-xs text-gray-500 md:text-sm">за все время</span>
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <ChartContainer config={chartConfig}>
          <LineChart accessibilityLayer data={stats.timeTrainings.slice(-10)}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={val => val.slice(0, -5)}
            />
            <ChartTooltip
              cursor={true}
              content={<ChartTooltipContent hideLabel />}
              formatter={value => ['Время тренировки', ` ${getFormattedTime(Number(value))}`]}
            />
            <Line
              dataKey="time"
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
        </ChartContainer>
        <CardFooter>
          <CardDescription className="mt-2">Динамика за 10 последних тренировок</CardDescription>
        </CardFooter>
      </CardContent>
    </Card>
  );
};
