'use client';

import * as React from 'react';
import { FC } from 'react';
import { Label, Pie, PieChart } from 'recharts';

import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/shared/components/ui/chart';

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

interface EventsCountPieProps {
  tasks: number;
  reminders: number;
  arrangements: number;
}
export const EventsCountPie: FC<EventsCountPieProps> = ({ arrangements, reminders, tasks }) => {
  const totalEvents = React.useMemo(() => arrangements + reminders + tasks, [arrangements, reminders, tasks]);
  const data = React.useMemo(
    () => [
      { type: 'tasks', events: tasks, fill: 'var(--color-green)' },
      { type: 'reminders', events: reminders, fill: 'var(--color-pink)' },
      { type: 'arrangements', events: arrangements, fill: 'var(--color-yellow)' }
    ],
    [arrangements, reminders, tasks]
  );
  return (
    <ChartContainer config={chartConfig} className="aspect-square max-h-80 min-w-50 min-h-50 grow">
      <PieChart>
        <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
        <Pie data={data} dataKey="events" nameKey="type" innerRadius={60} strokeWidth={5}>
          <Label
            content={({ viewBox }) => {
              if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                return (
                  <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                    <tspan x={viewBox.cx} y={viewBox.cy} className="fill-foreground text-3xl font-bold">
                      {totalEvents.toLocaleString()}
                    </tspan>
                    <tspan
                      x={viewBox.cx}
                      y={(viewBox.cy || 0) + 24}
                      className="fill-muted-foreground text-sm text-center block">
                      Events in 7 days
                    </tspan>
                  </text>
                );
              }
            }}
          />
        </Pie>
      </PieChart>
    </ChartContainer>
  );
};
