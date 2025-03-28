import dayjs from 'dayjs';
import { useEffect, useRef, useState } from 'react';
import { IoMdSearch } from 'react-icons/io';
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from 'react-icons/md';
import { useDebounceCallback } from 'usehooks-ts';

import { Input } from '@/shared/components/ui/input';

import { Button } from '../../../../shared/components/ui/button';
import { cn } from '../../../../shared/lib/utils';
import { useDatePicker } from '../../stores/date-picker-store';
import { useSearchStore } from '../../stores/search.store';
import { CalendarView } from './calendar-select';

export const CalendarControls = () => {
  const { store, selectedDays } = useDatePicker();
  const { searchActive, toggleSearch, setSearchQuery } = useSearchStore();
  const [searchQuery, setLocalSearchQuery] = useState('');

  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (searchActive && inputRef.current) {
      inputRef.current.focus();
    }
  }, [searchActive]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.onfocus = () => {
        toggleSearch(true);
      };
    }
  }, []);

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalSearchQuery(e.target.value);
  };

  const closeSearch = () => {
    setLocalSearchQuery('');
    toggleSearch(false);
  };

  const debouncedSearch = useDebounceCallback((query: string) => {
    setSearchQuery(query);
  }, 400);

  useEffect(() => {
    debouncedSearch(searchQuery);
  }, [searchQuery]);

  const onToday = () => {
    if (store.view === CalendarView.WEEK) {
      if (selectedDays > 1) {
        store.setSelectedDate({
          from: dayjs()
            .subtract(selectedDays / 2 - 1, 'day')
            .toDate(),
          to: dayjs()
            .add(selectedDays / 2, 'day')
            .toDate()
        });
        return;
      }
      store.setSelectedDate({ from: dayjs().toDate() });
      return;
    }
    if (store.view === CalendarView.MONTH) {
      store.setMonth(dayjs().toDate());
      return;
    }
    if (store.view === CalendarView.YEAR) {
      store.setYear(dayjs().toDate());
    }
  };

  const onPrev = () => {
    if (store.view === CalendarView.MONTH) {
      store.setMonth(dayjs(store.month).subtract(1, 'month').toDate());
    }
    if (store.view === CalendarView.YEAR) {
      store.setYear(dayjs(store.year).subtract(1, 'year').toDate());
    }
    if (store.view === CalendarView.WEEK) {
      if (selectedDays > 1) {
        store.setSelectedDate({
          from: dayjs(store.selectedDate?.from).subtract(selectedDays, 'day').toDate(),
          to: dayjs(store.selectedDate?.to).subtract(selectedDays, 'day').toDate()
        });
        return;
      }
      store.setSelectedDate({
        from: dayjs(store.selectedDate?.from).subtract(1, 'day').toDate()
      });
    }
  };

  const onNext = () => {
    if (store.view === CalendarView.MONTH) {
      store.setMonth(dayjs(store.month).add(1, 'month').toDate());
    }
    if (store.view === CalendarView.YEAR) {
      store.setYear(dayjs(store.year).add(1, 'year').toDate());
    }
    if (store.view === CalendarView.WEEK) {
      if (selectedDays > 1) {
        store.setSelectedDate({
          from: dayjs(store.selectedDate?.from).add(selectedDays, 'day').toDate(),
          to: dayjs(store.selectedDate?.to).add(selectedDays, 'day').toDate()
        });
        return;
      }
      store.setSelectedDate({
        from: dayjs(store.selectedDate?.from).add(1, 'day').toDate()
      });
    }
  };
  return (
    <div className="flex gap-2 flex-grow justify-end">
      <div className={cn('transition-all duration-400 flex-grow max-sm:hidden', searchActive ? 'w-full' : 'w-min')}>
        <Input
          icon={
            <IoMdSearch
              size="1.25rem"
              className="cursor-pointer"
              onClick={() => (searchActive ? closeSearch() : toggleSearch(true))}
            />
          }
          iconPosition="left"
          placeholder="Search"
          ref={inputRef}
          value={searchQuery}
          onBlur={() => searchQuery === '' && closeSearch()}
          onChange={onSearchChange}
          className={cn('w-full min-w-8 ')}
        />
      </div>

      <Button variant="outline" className="max-sm:hidden" onClick={onToday}>
        Today
      </Button>
      <Button variant="outline" size="icon" onClick={onPrev}>
        <MdOutlineKeyboardArrowLeft className="size-8" />
      </Button>
      <Button variant="outline" size="icon" onClick={onNext}>
        <MdOutlineKeyboardArrowRight className="size-8" />
      </Button>
    </div>
  );
};
