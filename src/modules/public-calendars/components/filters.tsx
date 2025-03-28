import { Calendar, ChevronDown, Users } from 'lucide-react';
import type React from 'react';
import { type FC, useEffect, useState } from 'react';
import { IoMdSearch } from 'react-icons/io';
import { useDebounceCallback } from 'usehooks-ts';

import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '../../../shared/components/ui/dropdown-menu';
import { CalendarSortBy, SortOrder } from '../../calendar/calendar.interface';
import { usePublicCalendarsFiltersStore } from '../stores/public-calendars-filters.store';

export const Filters: FC = () => {
  const { name, sortBy, sortOrder, setName, setSortBy, setSortOrder, resetFilters } = usePublicCalendarsFiltersStore();
  const [searchValue, setSearchValue] = useState(name);

  const debouncedSetName = useDebounceCallback(setName, 500);

  // Update the input value when the store value changes (e.g., on reset)
  useEffect(() => {
    setSearchValue(name);
  }, [name]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    debouncedSetName(value);
  };
  const getSortLabel = () => {
    if (sortBy === 'createdAt') {
      return sortOrder === 'asc' ? 'Date (Oldest first)' : 'Date (Newest first)';
    } else if (sortBy === 'participants') {
      return sortOrder === 'asc' ? 'Participants (Fewest first)' : 'Participants (Most first)';
    }
    return 'Sort by';
  };
  const onSortChange = (newSortBy: CalendarSortBy, newSortOrder: SortOrder) => {
    setSortBy(newSortBy);
    setSortOrder(newSortOrder);
  };
  return (
    <div className="flex gap-4 w-full">
      <Input
        icon={<IoMdSearch size={'1.25rem'} />}
        iconPosition="left"
        placeholder="Search calendars..."
        value={searchValue}
        onChange={handleSearchChange}
        wrapperClassName="w-full"
      />
      <Button variant="outline" onClick={resetFilters} className="max-md:hidden">
        Reset
      </Button>
      <div className="flex items-center gap-2 shrink-0 grow-0 max-sm:hidden">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex gap-2 w-50 grow justify-between">
              <span>{getSortLabel()}</span>
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="center" className="w-50">
            <DropdownMenuLabel>Sort by</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="flex gap-2 cursor-pointer" onClick={() => onSortChange('createdAt', 'desc')}>
              <Calendar className="h-4 w-4" />
              <span>Newest first</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex gap-2 cursor-pointer" onClick={() => onSortChange('createdAt', 'asc')}>
              <Calendar className="h-4 w-4" />
              <span>Oldest first</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="flex gap-2 cursor-pointer"
              onClick={() => onSortChange('participants', 'desc')}>
              <Users className="h-4 w-4" />
              <span>Most participants</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex gap-2 cursor-pointer" onClick={() => onSortChange('participants', 'asc')}>
              <Users className="h-4 w-4" />
              <span>Fewest participants</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};
