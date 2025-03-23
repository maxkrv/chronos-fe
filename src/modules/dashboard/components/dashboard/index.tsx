import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { useMemo } from 'react';

import { EVENTS } from '../../../../shared/constants/query-keys';
import { MonthCalendar } from '../../../calendar/components/month-calendar';
import { EventService } from '../../../calendar/services/event.service';
import { EventsCountBar } from './events-count-bar';
import { EventsCountPie } from './events-count-pie';
import { NewEvent } from './new-event';
import NoteForToday from './note-for-today';
import { ThemeToggle } from './theme-toggle';
import { TimeNow } from './time-now';
import Timer from './timer';
import { WeatherWidget } from './weather-widget';

export const Dashboard = () => {
  const currentMonthDate = useMemo(
    () => ({
      from: dayjs().startOf('month').add(1, 'day').toDate(),
      to: dayjs().endOf('month').toDate()
    }),
    []
  );
  const { data: monthEvents = [] } = useQuery({
    queryKey: [EVENTS, currentMonthDate],
    queryFn: () => EventService.findAll([], currentMonthDate.from, currentMonthDate.to),
    select: (events) => events.flat()
  });

  return (
    <div className="grid grid-cols-6 grid-rows-5 max-xl:grid-cols-4 max-md:grid-cols-2 max-md:grid-rows-10 gap-4 p-4 min-h-[calc(100vh-4rem)] *:rounded-3xl *:shadow max-md:min-h-[calc((100vh)*2-4rem)]">
      <div className="col-start-1 col-end-2 row-start-1 row-end-2 transition-all hover:ring-3 hover:ring-primary/20">
        <TimeNow />
      </div>
      <div className="col-start-2 col-end-3 row-start-1 row-end-2 transition-all hover:ring-3 hover:ring-primary/20">
        <NewEvent />
      </div>
      <div className="col-start-3 col-end-3 row-start-1 row-end-1 max-md:col-start-1 max-md:col-end-1 max-md:row-start-2 max-md:row-end-2 transition-all hover:ring-3 hover:ring-primary/20">
        <ThemeToggle />
      </div>
      <div className="col-start-4 col-end-4 row-start-1 row-end-1 max-md:col-start-2 max-md:col-end-2 max-md:row-start-2 max-md:row-end-2 transition-all hover:ring-3 hover:ring-primary/20">
        <WeatherWidget />
      </div>
      <div className="col-start-1 col-end-3 row-start-2 row-end-4 transition-all hover:ring-3 hover:ring-primary/20 max-md:col-start-1 max-md:col-end-3 max-md:row-start-3 max-md:row-end-5">
        <Timer />
      </div>
      <div className="col-start-1 col-end-3 row-start-4 row-end-6 transition-all hover:ring-3 hover:ring-primary/20 max-md:col-start-1 max-md:col-end-3 max-md:row-start-5 max-md:row-end-7">
        <EventsCountBar />
      </div>
      <div className="col-start-3 col-end-5 row-start-2 row-end-4 max-md:col-start-1 max-md:col-end-3 max-md:row-start-9 max-md:row-end-11 transition-all hover:ring-3 hover:ring-primary/20">
        <EventsCountPie />
      </div>
      <div className="col-start-3 col-end-5 row-start-4 row-end-6 max-md:col-start-1 max-md:col-end-3 max-md:row-start-7 max-md:row-end-9 transition-all hover:ring-3 hover:ring-primary/20">
        <NoteForToday />
      </div>
      <div className="col-start-5 col-end-7 row-start-1 row-end-6 max-xl:hidden p-2 transition-all hover:ring-3 hover:ring-primary/20">
        <MonthCalendar events={monthEvents} />
      </div>
    </div>
  );
};
