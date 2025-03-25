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
const formatEventsByDay = (events: ICalendarEvent[]): EventsCountBarLine[] => {
  // Group events by day
  const eventsByDay = events.reduce<Record<string, ICalendarEvent[]>>((acc, event) => {
    const day = dayjs(event.startAt).format('YYYY-MM-DD');
    if (!acc[day]) {
      acc[day] = [];
    }
    acc[day].push(event);
    return acc;
  }, {});

  // Sort days chronologically
  const sortedDays = Object.keys(eventsByDay).sort();

  // Create EventsCountBarLine for each day
  return sortedDays.map((day) => {
    const dayEvents = eventsByDay[day];

    return {
      day: dayjs(day).format('ddd, MMM D'), // Format: Mon, Jan 1
      tasks: dayEvents.filter((event) => event.category === EventCategory.TASK).length,
      reminders: dayEvents.filter((event) => event.category === EventCategory.REMINDER).length,
      arrangements: dayEvents.filter((event) => event.category === EventCategory.ARRANGEMENT).length,
      occasions: dayEvents.filter((event) => event.category === EventCategory.OCCASION).length
    };
  });
};

// Helper function to format events by week
const formatEventsByWeek = (events: ICalendarEvent[]): EventsCountBarLine[] => {
  // Group events by week (using the first day of the week)
  const eventsByWeek = events.reduce<Record<string, ICalendarEvent[]>>((acc, event) => {
    const date = dayjs(event.startAt);
    const startOfWeek = date.startOf('week').format('YYYY-MM-DD');

    if (!acc[startOfWeek]) {
      acc[startOfWeek] = [];
    }
    acc[startOfWeek].push(event);
    return acc;
  }, {});

  // Sort weeks chronologically
  const sortedWeeks = Object.keys(eventsByWeek).sort();

  // Create EventsCountBarLine for each week
  return sortedWeeks.map((weekStart) => {
    const weekEvents = eventsByWeek[weekStart];

    return {
      day: dayjs(weekStart).format('MMM D'), // Format: Jan 1 (first day of week)
      tasks: weekEvents.filter((event) => event.category === EventCategory.TASK).length,
      reminders: weekEvents.filter((event) => event.category === EventCategory.REMINDER).length,
      arrangements: weekEvents.filter((event) => event.category === EventCategory.ARRANGEMENT).length,
      occasions: weekEvents.filter((event) => event.category === EventCategory.OCCASION).length
    };
  });
};

export const EventsCountBar: FC = memo(() => {
  const [activeTab, setActiveTab] = useState('weekly');
  const last7DaysDate = useMemo(() => {
    const from = dayjs().subtract(8, 'day').hour(0).minute(0).second(0).millisecond(0);
    return {
      from: from.toDate(),
      to: from.add(7, 'day').toDate()
    };
  }, []);

  const { data: weeklyData = [] } = useQuery({
    queryKey: [EVENTS, last7DaysDate],
    queryFn: () => EventService.findAll([], last7DaysDate.from, last7DaysDate.to),
    select: (events) => formatEventsByDay(events.flat())
  });

  const last4WeeksDate = useMemo(() => {
    const from = dayjs().subtract(4, 'week').hour(0).minute(0).second(0).millisecond(0);
    return {
      from: from.toDate(),
      to: from.add(4, 'week').subtract(1, 'day').toDate()
    };
  }, []);

  const { data: monthlyData = [] } = useQuery({
    queryKey: [EVENTS, last4WeeksDate],
    queryFn: () => EventService.findAll([], last4WeeksDate.from, last4WeeksDate.to),
    select: (events) => formatEventsByWeek(events.flat())
  });
  const activeData = activeTab === 'weekly' ? weeklyData : monthlyData;

  return (
    <div className="h-full flex flex-col bg-card rounded-3xl shadow p-4 @container">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-semibold">Event Distribution</h3>
        <Tabs defaultValue="weekly" className="@max-3xs:hidden" value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="weekly">Weekly</TabsTrigger>
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
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
