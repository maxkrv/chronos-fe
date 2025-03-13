import { Day } from './day';
import { WeekCalendarHeader } from './header';
import { NowMarker } from './now';
import { SideTime } from './side-time';

export const WeekCalendar = () => {
  return (
    <div className="border flex flex-col p-2 gap-6 min-w-4xl">
      <WeekCalendarHeader />
      <div className="border-t-3 h-140 overflow-x-scroll scrollbar-none">
        <div className="grid grid-cols-[5rem_1fr] w-full">
          <SideTime />
          <div className="py-3">
            <div className="relative w-full flex gap-0 calendar-container">
              <NowMarker />
              {Array.from({ length: 7 }).map((_, i) => (
                <Day key={i} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
