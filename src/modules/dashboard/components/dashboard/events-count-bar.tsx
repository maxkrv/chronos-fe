'use client';

import { FC } from 'react';
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';

import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent
} from '@/shared/components/ui/chart';

const chartConfig = {
  events: {
    label: 'Events'
  },
  tasks: {
    label: 'Tasks',
    color: 'var(--color-green)'
  },
  reminders: {
    label: 'Reminders',
    color: 'var(--color-pink)'
  },
  arrangements: {
    label: 'Arrangements',
    color: 'var(--color-yellow)'
  }
} satisfies ChartConfig;

interface EventsCountBarProps {
  data: { day: string; tasks: number; reminders: number; arrangements: number }[];
}
export const EventsCountBar: FC<EventsCountBarProps> = ({ data }) => {
  return (
    <ChartContainer config={chartConfig} className="h-full max-h-full max-w-full w-full aspect-[]">
      <BarChart accessibilityLayer data={data}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="day"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <ChartTooltip content={<ChartTooltipContent hideLabel />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar dataKey="tasks" stackId="a" fill={chartConfig.tasks.color} radius={[0, 0, 4, 4]} />
        <Bar dataKey="reminders" stackId="a" fill={chartConfig.reminders.color} radius={[4, 4, 0, 0]} />
        <Bar dataKey="arrangements" stackId="a" fill={chartConfig.arrangements.color} radius={[4, 4, 0, 0]} />
      </BarChart>
    </ChartContainer>
  );
};
