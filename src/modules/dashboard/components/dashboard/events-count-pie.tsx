import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import * as React from 'react';
import { type FC, useState } from 'react';
import { CgSpinner } from 'react-icons/cg';
import { Cell, Label, Pie, PieChart, Sector } from 'recharts';
import { PieSectorDataItem } from 'recharts/types/polar/Pie';

import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/shared/components/ui/chart';

import { EVENTS } from '../../../../shared/constants/query-keys';
import { EventCategory } from '../../../calendar/calendar.interface';
import { EventService } from '../../../calendar/services/event.service';

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

const renderActiveShape = ({
  cx,
  cy,
  innerRadius,
  outerRadius,
  startAngle,
  endAngle,
  fill,
  payload,
  percent,
  value
}: PieSectorDataItem) => {
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

export const EventsCountPie: FC = () => {
  const pastMonthDate = React.useMemo(() => {
    const from = dayjs().subtract(1, 'month').hour(0).minute(0).second(0).millisecond(0);
    return {
      from: from.toDate(),
      to: from.add(1, 'month').subtract(1, 'day').toDate()
    };
  }, []);
  const { data: pastMonthEvents = [], isLoading } = useQuery({
    queryKey: [EVENTS, pastMonthDate],
    queryFn: () => EventService.findAll([], pastMonthDate.from, pastMonthDate.to),
    select: (events) => events.flat()
  });

  const { arrangements, reminders, tasks, occasions } = React.useMemo(
    () => ({
      arrangements: pastMonthEvents.filter((event) => event.category === EventCategory.ARRANGEMENT).length,
      reminders: pastMonthEvents.filter((event) => event.category === EventCategory.REMINDER).length,
      tasks: pastMonthEvents.filter((event) => event.category === EventCategory.TASK).length,
      occasions: pastMonthEvents.filter((event) => event.category === EventCategory.OCCASION).length
    }),
    [pastMonthEvents]
  );
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

  return (
    <div className="bg-card rounded-3xl shadow p-4 h-full flex flex-col">
      {!isLoading && (
        <div className="flex-1 h-full overflow-hidden">
          <ChartContainer config={chartConfig} className="h-full w-full">
            <PieChart margin={{ top: 10, right: 10, left: 10, bottom: 10 }}>
              <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                innerRadius={60}
                outerRadius={80}
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
                          For the month
                        </tspan>
                      </text>
                    );
                  }}
                />
              </Pie>
            </PieChart>
          </ChartContainer>
        </div>
      )}

      {isLoading && (
        <div className="h-full flex items-center justify-center">
          <CgSpinner className="animate-spin h-10 w-10 mx-auto" />
        </div>
      )}
    </div>
  );
};
