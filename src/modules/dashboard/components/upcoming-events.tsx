import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { Calendar } from 'lucide-react';
import { type FC, useMemo } from 'react';
import { CgSpinner } from 'react-icons/cg';
import { useNavigate } from 'react-router-dom';

import { useDatePicker } from '@/modules/calendar/stores/date-picker-store';

import { EVENTS } from '../../../shared/constants/query-keys';
import { cn } from '../../../shared/lib/utils';
import { EventService } from '../../calendar/services/event.service';

export const UpcomingEvents: FC = () => {
  const { store } = useDatePicker();
  const navigation = useNavigate();

  const nextDayDate = useMemo(() => {
    const from = dayjs().minute(0).second(0).millisecond(0);
    return {
      from: from.toDate(),
      to: from.add(24, 'hour').toDate()
    };
  }, []);
  
  const { data: nextDayData = [], isLoading } = useQuery({
    queryKey: [EVENTS, nextDayDate],
    queryFn: () => EventService.findAll([], nextDayDate.from, nextDayDate.to),
    select: (events) => events.flat().sort((a, b) => dayjs(a.startAt).diff(dayjs(b.startAt)))
  });

  if (isLoading) return <CgSpinner className="animate-spin h-10 w-10 mx-auto" />;

  return (
    <>
      {!!nextDayData.length && (
        <button
          className="cursor-pointer flex h-full pl-4"
          onClick={() => {
            store.setSelectedDate({ from: new Date() });
            navigation('/calendar');
          }}>
          <div className="h-[calc(100%-7rem)] border-3 rounded-full border-red" />
          <div className="relative -left-3.75 flex flex-col w-full gap-3">
            {nextDayData?.map((event, index) => (
              <div key={index} className="flex justify-between h-28 max-h-28 w-full shrink-0 gap-3">
                <div
                  className={cn(
                    'size-6 border-4 border-background rounded-full aspect-square bg-current',
                    index === 0 && 'outline-current outline-3',
                    index === nextDayData.length - 1 && 'border-current bg-background'
                  )}
                  style={{ color: event.color || 'var(--color-primary)' }}
                />
                <div
                  className="flex flex-col gap-2 w-full rounded-2xl p-2 overflow-hidden bg-mix-primary-20 border-2 border-current"
                  style={{ color: event.color }}>
                  <div className="flex justify-between gap-2">
                    <h1 className="text-lg font-medium line-clamp-2 text-foreground">{event.name}</h1>
                    <p className="text-sm">{dayjs(event.startAt).format('HH:mm')}</p>
                  </div>
                  <p className="text-sm overflow-hidden text-clip grow [mask-image:linear-gradient(to_bottom,rgba(0,0,0,1)_60%,rgba(0,0,0,0))]">
                    {event.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </button>
      )}

      {!nextDayData.length && !isLoading && (
        <div className="mx-3 flex flex-col items-center justify-center py-12 text-center bg-muted/30 rounded-lg border border-dashed p-8 grow h-full">
          <Calendar className="h-16 w-16 text-muted-foreground mb-2 animate-pulse" />
          <h3 className="font-medium mb-2 text-muted-foreground">You have no events today</h3>
        </div>
      )}
    </>
  );
};
