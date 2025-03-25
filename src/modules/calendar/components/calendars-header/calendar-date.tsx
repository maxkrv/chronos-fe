import dayjs from 'dayjs';

import { Button } from '../../../../shared/components/ui/button';
import { useDatePicker } from '../../stores/date-picker-store';
import { CalendarView } from './calendar-select';

// Helper function to render buttons for the selected date
const DateButton = ({
  date,
  onClick,
  format
}: {
  date: dayjs.Dayjs | Date | undefined;
  onClick: () => void;
  format: string;
}) => {
  if (!date) return null;
  return (
    <Button variant={'link'} className="text-lg font-semibold p-0" onClick={onClick}>
      {dayjs(date).format(format)}
    </Button>
  );
};

export const CalendarDate = () => {
  const { store, selectedDays } = useDatePicker();

  if (store.view === CalendarView.WEEK && selectedDays > 1 && store.selectedDate?.from && store.selectedDate?.to) {
    const { from, to } = store.selectedDate;

    return (
      <div className="text-lg font-semibold text-center max-sm:hidden">
        <div className="space-x-2">
          <DateButton
            date={from}
            onClick={() => {
              if (from) {
                store.setMonth(from);
                store.setView(CalendarView.MONTH);
              }
            }}
            format="MMM"
          />
          {dayjs(from).format('D')}
          {!dayjs(from).isSame(to, 'year') && (
            <DateButton
              date={from}
              onClick={() => {
                if (from) {
                  store.setYear(from);
                  store.setView(CalendarView.YEAR);
                }
              }}
              format=", YYYY"
            />
          )}
          {' - '}
          <DateButton
            date={to}
            onClick={() => {
              if (to) {
                store.setMonth(to);
                store.setView(CalendarView.MONTH);
              }
            }}
            format="MMM"
          />
          {dayjs(to).format('D, ')}
          <DateButton
            date={to}
            onClick={() => {
              if (to) {
                store.setMonth(to);
                store.setView(CalendarView.YEAR);
              }
            }}
            format="YYYY"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="text-lg font-semibold text-center max-[30rem]:hidden">
      {store.view === CalendarView.WEEK && (
        <div className="space-x-2">
          <DateButton date={store.month} onClick={() => store.setView(CalendarView.MONTH)} format="MMM," />
          <DateButton date={store.month} onClick={() => store.setView(CalendarView.YEAR)} format="YYYY" />
        </div>
      )}
      {store.view === CalendarView.MONTH && (
        <div className="space-x-1">
          {dayjs(store.month).format('MMMM,')}
          <Button
            variant={'link'}
            className="text-lg font-semibold p-2"
            onClick={() => store.setView(CalendarView.YEAR)}>
            {dayjs(store.month).format('YYYY')}
          </Button>
        </div>
      )}
      {store.view === CalendarView.YEAR && dayjs(store.year).format('YYYY')}
    </div>
  );
};
