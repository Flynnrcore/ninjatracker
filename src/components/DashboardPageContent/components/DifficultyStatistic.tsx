'use client';
import * as React from 'react';
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import type { TStatistic } from '@/types';
import { EmptyStats } from './index';

const chartConfig = {
  difficulty: {
    label: '',
    color: 'yellow',
  },
} satisfies ChartConfig;

export const DifficultyStatistic = ({ statistic }: { statistic: TStatistic | null }) => {
  const data = statistic ? [...statistic.difficulties] : [];
  const [activeChart, setActiveChart] = React.useState<number>(7);

  return (
    <Card className="border-none py-4 sm:py-0">
      <CardHeader className="flex flex-col items-stretch border-b border-stone-200 !p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 pb-3 sm:pb-0">
          <CardTitle className="text-lg md:text-xl lg:text-2xl">Сложность тренировок</CardTitle>
          <CardDescription>динамика изменения сложности тренировок</CardDescription>
        </div>
        <div className="grid grid-cols-2 sm:flex">
          {[7, 30, 90, 120].map((key, idx) => (
            <button
              key={key}
              data-active={activeChart === key}
              className={
                'data-[active=true]:bg-muted/50 flex flex-1 cursor-pointer flex-col justify-center gap-1 border-t border-stone-200 px-6 py-4 text-left ' +
                'even:border-l' +
                'sm:basis-1/2 sm:border-l sm:border-t-0 sm:px-8 sm:py-6'
              }
              style={idx % 2 === 1 && idx < 2 ? { borderLeftWidth: 1 } : undefined}
              onClick={() => setActiveChart(key)}>
              <span className="text-muted-foreground text-center text-xs">за последние</span>
              <span className="text-center text-lg font-bold leading-none sm:text-3xl">{key}</span>
              <span className="text-muted-foreground text-center text-xs">тренировок</span>
            </button>
          ))}
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        {data.length > 0 ? (
          <ChartContainer config={chartConfig} className="aspect-auto h-[250px] w-full">
            <AreaChart
              accessibilityLayer
              data={data.slice(-activeChart)}
              margin={{
                top: 10,
                left: 12,
                right: 12,
              }}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                minTickGap={32}
                tickFormatter={value => {
                  const date = new Date(value);
                  return date.toLocaleDateString('ru-Ru', {
                    month: 'short',
                    day: 'numeric',
                  });
                }}
              />
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    className="w-[150px]"
                    nameKey="views"
                    formatter={value => {
                      const stars = [1, 2, 3, 4, 5].map(t => (t <= Number(value) ? '★' : '☆')).join('');
                      return ['сложность ', stars];
                    }}
                    labelFormatter={value => {
                      return new Date(value).toLocaleDateString('ru-Ru', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      });
                    }}
                  />
                }
              />
              <Area
                dataKey="difficulty"
                type="monotone"
                stroke="orange"
                fill="orange"
                fillOpacity={0.4}
                strokeWidth={2}
                dot={false}
              />
            </AreaChart>
          </ChartContainer>
        ) : (
          <EmptyStats />
        )}
      </CardContent>
    </Card>
  );
};
