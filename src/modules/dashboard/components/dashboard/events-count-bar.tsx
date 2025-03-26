import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { type FC, memo, useMemo, useState } from 'react';
import { Bar, BarChart, CartesianGrid, Tooltip, XAxis } from 'recharts';

import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltipContent
} from '@/shared/components/ui/chart';
import { Tabs, TabsList, TabsTrigger } from '@/shared/components/ui/tabs';

import { EVENTS } from '../../../../shared/constants/query-keys';
import { EventCategory, ICalendarEvent } from '../../../calendar/calendar.interface';
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
    label: 'Occasions',
    color: 'var(--color-purple)'
  }
} satisfies ChartConfig;

interface EventsCountBarLine {
  day: string;
  tasks: number;
  reminders: number;
  arrangements: number;
  occasions: number;
}

// Helper function to format events by day
const formatEventsByDay = (events: ICalendarEvent[], from: Date, to: Date): EventsCountBarLine[] => {
  const formatString = 'DD';
  const data = new Array(dayjs(to).diff(from, 'day') + 1)
    .fill(0)
    .map((_, i) => ({ day: dayjs(from).add(i, 'day'), tasks: 0, reminders: 0, arrangements: 0, occasions: 0 }));

  for (const event of events) {
    const index = dayjs(event.startAt).diff(from, 'day');
    if (index >= 0 && index < data.length) {
      switch (event.category) {
        case EventCategory.TASK:
          data[index].tasks++;
          break;
        case EventCategory.REMINDER:
          data[index].reminders++;
          break;
        case EventCategory.ARRANGEMENT:
          data[index].arrangements++;
          break;
        case EventCategory.OCCASION:
          data[index].occasions++;
          break;
      }
    }
  }

  return data.map((d) => ({
    ...d,
    day: d.day.format(formatString)
  }));
};

// Helper function to format events by week
const formatEventsByWeek = (events: ICalendarEvent[], from: Date, to: Date): EventsCountBarLine[] => {
  const data = new Array(dayjs(to).diff(from, 'week') + 1).fill(0).map((_, i) => ({
    day: dayjs(from).add(i, 'week'),
    tasks: 0,
    reminders: 0,
    arrangements: 0,
    occasions: 0
  }));

  for (const event of events) {
    const index = dayjs(event.startAt).diff(data[0].day, 'week');
    if (index >= 0 && index < data.length) {
      switch (event.category) {
        case EventCategory.TASK:
          data[index].tasks++;
          break;
        case EventCategory.REMINDER:
          data[index].reminders++;
          break;
        case EventCategory.ARRANGEMENT:
          data[index].arrangements++;
          break;
        case EventCategory.OCCASION:
          data[index].occasions++;
          break;
      }
    }
  }

  return data.map((d) => ({
    ...d,
    day: d.day.format('DD')
  }));
};

export const EventsCountBar: FC = memo(() => {
  const [activeTab, setActiveTab] = useState('daily');
  const next7DaysDate = useMemo(() => {
    return {
      from: dayjs().startOf('day').toDate(),
      to: dayjs().add(6, 'day').endOf('day').toDate()
    };
  }, []);

  const { data: weeklyData = [] } = useQuery({
    queryKey: [EVENTS, next7DaysDate],
    queryFn: () => EventService.findAll([], next7DaysDate.from, next7DaysDate.to),
    select: (events) => formatEventsByDay(events.flat(), next7DaysDate.from, next7DaysDate.to)
  });

  const next4WeeksDate = useMemo(() => {
    return {
      from: dayjs().startOf('week').toDate(),
      to: dayjs().startOf('week').add(3, 'week').endOf('week').toDate()
    };
  }, []);

  const { data: monthlyData = [] } = useQuery({
    queryKey: [EVENTS, next4WeeksDate],
    queryFn: () => EventService.findAll([], next4WeeksDate.from, next4WeeksDate.to),
    select: (events) => formatEventsByWeek(events.flat(), next4WeeksDate.from, next4WeeksDate.to)
  });
  const activeData = activeTab === 'daily' ? weeklyData : monthlyData;

  return (
    <div className="h-full flex flex-col bg-card rounded-3xl shadow shadow-border p-4 @container">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-semibold">Event Distribution</h3>
        <Tabs defaultValue="weekly" className="@max-3xs:hidden" value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="daily">Daily</TabsTrigger>
            <TabsTrigger value="weekly">Weekly</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="flex-1 h-[calc(100%-3rem)] overflow-hidden">
        <ChartContainer config={chartConfig} className="h-full w-full">
          <BarChart data={activeData} margin={{ top: 10, right: 10, left: 0, bottom: 10 }}>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis
              dataKey="day"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <Tooltip content={<ChartTooltipContent hideLabel />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar
              dataKey="tasks"
              stackId="a"
              fill={chartConfig.tasks.color}
              radius={[0, 0, 4, 4]}
              animationDuration={1000}
              animationBegin={0}
            />
            <Bar
              dataKey="reminders"
              stackId="a"
              fill={chartConfig.reminders.color}
              radius={[4, 4, 0, 0]}
              animationDuration={1000}
              animationBegin={200}
            />
            <Bar
              dataKey="arrangements"
              stackId="a"
              fill={chartConfig.arrangements.color}
              radius={[4, 4, 0, 0]}
              animationDuration={1000}
              animationBegin={400}
            />
            <Bar
              dataKey="occasions"
              stackId="a"
              fill={chartConfig.occasions.color}
              radius={[4, 4, 0, 0]}
              animationDuration={1000}
              animationBegin={400}
            />
          </BarChart>
        </ChartContainer>
      </div>
    </div>
  );
});

EventsCountBar.displayName = 'EventsCountBar';
