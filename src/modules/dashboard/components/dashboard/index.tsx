import { events } from '../../../../__mock__/events';
import { MonthCalendar } from '../../../calendar/components/month-calendar';
import { EventsCountBar } from './events-count-bar';
import { EventCountPie } from './events-count-pie';
import { NewEvent } from './new-event';
import NoteForToday from './note-for-today';
import { TimeNow } from './time-now';
import Timer from './timer';

export const Dashboard = () => {
  return (
    <div className="grid grid-cols-6 grid-rows-5 max-xl:grid-cols-4 max-md:grid-cols-2 max-md:grid-rows-10 gap-4 p-4 min-h-[calc(100vh-4rem)] *:rounded-3xl *:shadow max-md:min-h-[calc((100vh)*2-4rem)]">
      <div className="col-start-1 col-end-2 row-start-1 row-end-2">
        <TimeNow />
      </div>
      <div className="col-start-2 col-end-3 row-start-1 row-end-2">
        <NewEvent />
      </div>
      <div className="col-start-1 col-end-3 row-start-2 row-end-4">
        <Timer />
      </div>
      <div className="col-start-1 col-end-3 row-start-4 row-end-6">
        <EventsCountBar />
      </div>

      <div className="col-start-3 col-end-5 row-start-1 row-end-4 max-md:col-start-1 max-md:col-end-3 max-md:row-start-6 max-md:row-end-9 flex justify-center items-center">
        <EventCountPie />
      </div>
      <div className="col-start-3 col-end-5 row-start-4 row-end-6 max-md:col-start-1 max-md:col-end-3 max-md:row-start-9 max-md:row-end-11">
        <NoteForToday />
      </div>

      <div className="col-start-5 col-end-7 row-start-1 row-end-6 max-xl:hidden p-2">
        <MonthCalendar events={events} />
      </div>
    </div>
  );
};
