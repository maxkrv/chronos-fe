import * as React from 'react';
import { type FC, useState } from 'react';
import { Cell, Label, Pie, PieChart, ResponsiveContainer, Sector } from 'recharts';
import { PieSectorDataItem } from 'recharts/types/polar/Pie';

import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/shared/components/ui/chart';

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
  },
  occasions: {
    label: 'occasions',
    color: 'var(--color-purple)'
  }
} satisfies ChartConfig;

interface EventsCountPieProps {
  tasks: number;
  reminders: number;
  arrangements: number;
  occasions: number;
}

export const EventsCountPie: FC<EventsCountPieProps> = ({ arrangements, reminders, tasks, occasions }) => {
  const [activeIndex, setActiveIndex] = useState<number | undefined>(undefined);

  const totalEvents = React.useMemo(
    () => arrangements + reminders + tasks + occasions,
    [arrangements, reminders, tasks, occasions]
  );

  const data = React.useMemo(
    () => [
      { name: 'Tasks', value: tasks, fill: chartConfig.tasks.color },
      { name: 'Reminders', value: reminders, fill: chartConfig.reminders.color },
      { name: 'Arrangements', value: arrangements, fill: chartConfig.arrangements.color },
      { name: 'Occasions', value: occasions, fill: chartConfig.occasions.color }
    ],
    [arrangements, reminders, tasks, occasions]
  );

  const onPieEnter = (_: unknown, index: number) => {
    setActiveIndex(index);
  };

  const onPieLeave = () => {
    setActiveIndex(undefined);
  };

  const renderActiveShape = (props: PieSectorDataItem) => {
    const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;

    if (!cx || !cy || !percent || !outerRadius) return <g />;

    return (
      <g>
        <text x={cx} y={cy - 20} dy={8} textAnchor="middle" fill="var(--foreground)" className="text-lg font-semibold">
          {payload.name}
        </text>
        <text x={cx} y={cy + 10} textAnchor="middle" fill="var(--foreground)" className="text-2xl font-bold">
          {value}
        </text>
        <text x={cx} y={cy + 30} textAnchor="middle" fill="var(--muted-foreground)" className="text-sm">
          {`${(percent * 100).toFixed(0)}%`}
        </text>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius + 5}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
      </g>
    );
  };

  return (
    <div className="bg-card rounded-3xl shadow p-4 h-full flex flex-col">
      <div className="flex-1 h-full overflow-hidden">
        <ChartContainer config={chartConfig} className="h-full w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart margin={{ top: 10, right: 10, left: 10, bottom: 10 }}>
              <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={4}
                activeIndex={activeIndex}
                activeShape={renderActiveShape}
                onMouseEnter={onPieEnter}
                onMouseLeave={onPieLeave}
                animationDuration={1000}
                animationBegin={0}>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} strokeWidth={activeIndex === index ? 2 : 0} />
                ))}
                <Label
                  content={({ viewBox }) => {
                    if (activeIndex !== undefined || !viewBox || !('cx' in viewBox) || !('cy' in viewBox)) return null;

                    return (
                      <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                        <tspan x={viewBox.cx} y={viewBox.cy} className="fill-foreground text-3xl font-bold">
                          {totalEvents.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground text-sm text-center block">
                          Total Events
                        </tspan>
                      </text>
                    );
                  }}
                />
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>
    </div>
  );
};
