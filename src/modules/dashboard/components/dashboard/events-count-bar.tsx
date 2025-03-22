import { type FC, useState } from 'react';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis } from 'recharts';

import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltipContent
} from '@/shared/components/ui/chart';
import { Tabs, TabsList, TabsTrigger } from '@/shared/components/ui/tabs';

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

interface EventsCountBarProps {
  data: { day: string; tasks: number; reminders: number; arrangements: number; occasions: number }[];
}

export const EventsCountBar: FC<EventsCountBarProps> = ({ data }) => {
  const [activeTab, setActiveTab] = useState('weekly');

  // Sample data for different time periods
  const weeklyData = data;
  const monthlyData = [
    { day: 'Week 1', tasks: 10, reminders: 15, arrangements: 5 },
    { day: 'Week 2', tasks: 12, reminders: 8, arrangements: 7 },
    { day: 'Week 3', tasks: 8, reminders: 12, arrangements: 4 },
    { day: 'Week 4', tasks: 15, reminders: 10, arrangements: 6 }
  ];

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
          <ResponsiveContainer width="100%" height="100%">
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
          </ResponsiveContainer>
        </ChartContainer>
      </div>
    </div>
  );
};
