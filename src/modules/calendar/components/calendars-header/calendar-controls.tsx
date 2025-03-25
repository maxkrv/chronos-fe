import dayjs from 'dayjs';
import { useEffect, useRef, useState } from 'react';
import { IoMdSearch } from 'react-icons/io';
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight, MdOutlineSearch } from 'react-icons/md';
import { useDebounceCallback } from 'usehooks-ts';

import { Input } from '@/shared/components/ui/input';

import { Button } from '../../../../shared/components/ui/button';
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

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalSearchQuery(e.target.value);
  };

  const closeSearch = () => {
    setLocalSearchQuery('');
    toggleSearch();
  };

  const handleBlur = () => {
    closeSearch();
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
    <div className={`flex gap-2 ${searchActive ? 'flex-grow' : ''}`}>
      {!searchActive && (
        <Button variant="outline" size="icon" onClick={toggleSearch}>
          <MdOutlineSearch className="size-5" />
        </Button>
      )}

      <div className={`relative flex-grow`}>
        <div
          className={`absolute right-0 transition-all duration-400 ${searchActive ? 'w-full' : 'w-0 overflow-hidden'}`}>
          {searchActive && (
            <Input
              icon={<IoMdSearch size="1.25rem" />}
              iconPosition="left"
              placeholder="Search"
              ref={inputRef}
              value={searchQuery}
              onChange={onSearchChange}
              onBlur={handleBlur}
              className="w-full"
            />
          )}
        </div>
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
