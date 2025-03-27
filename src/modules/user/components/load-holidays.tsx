import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Check, ChevronsUpDown } from 'lucide-react';
import * as React from 'react';
import { toast } from 'sonner';

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@/shared/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/components/ui/select';
import { cn } from '@/shared/lib/utils';

import { Button } from '../../../shared/components/ui/button';
import { COUNTRY_CODE, MY_CALENDARS } from '../../../shared/constants/query-keys';
import { CountryCode, getMyCountryCode } from '../../../shared/utils/country-code';
import { CalendarService } from '../../calendar/services/calendar.service';

const countries = Object.entries(CountryCode).map(([key, value]) => ({
  label: key
    .replace(/_/g, ' ')
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase()),
  value
}));

// Generate years from current year - 5 to current year + 5
const generateYearOptions = () => {
  const currentYear = new Date().getFullYear();
  const years = [];
  for (let i = currentYear - 5; i <= currentYear + 5; i++) {
    years.push(i);
  }
  return years;
};

export const LoadHolidays = () => {
  const [open, setOpen] = React.useState(false);
  const queryClient = useQueryClient();
  const { data: countryCode, isPending: isCodeFetching } = useQuery({
    queryKey: [COUNTRY_CODE],
    refetchInterval: false,
    refetchOnWindowFocus: false,
    retry: 1,
    queryFn: getMyCountryCode
  });
  const [country, setCountry] = React.useState(countryCode);
  const [selectedYear, setSelectedYear] = React.useState(new Date().getFullYear());

  React.useEffect(() => {
    setCountry(countryCode);
  }, [countryCode]);

  const { mutate, isPending } = useMutation({
    mutationFn: async () => country && CalendarService.loadHolidays(country, selectedYear),
    onSuccess: () => {
      toast.success(`Holidays for ${selectedYear} loaded successfully`);
      queryClient.invalidateQueries({
        queryKey: [MY_CALENDARS]
      });
    }
  });

  const yearOptions = generateYearOptions();

  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="flex gap-2 w-full">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="justify-between grow "
              disabled={isCodeFetching || isPending}>
              {country ? countries.find((framework) => framework.value === country)?.label : 'Select country...'}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="min-w-20 w-full p-0">
            <Command>
              <CommandInput placeholder="Search country..." />
              <CommandList>
                <CommandEmpty>No country found.</CommandEmpty>
                <CommandGroup>
                  {countries.map((c) => (
                    <CommandItem
                      key={c.label}
                      value={c.value}
                      onSelect={(currentValue) => {
                        setCountry(currentValue);
                        setOpen(false);
                      }}>
                      <Check className={cn('mr-2 h-4 w-4', country === c.value ? 'opacity-100' : 'opacity-0')} />
                      {c.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
        <Select
          value={selectedYear.toString()}
          onValueChange={(value) => setSelectedYear(Number.parseInt(value))}
          disabled={isCodeFetching || isPending}>
          <SelectTrigger className="w-32">
            <SelectValue placeholder="Select year" />
          </SelectTrigger>
          <SelectContent>
            {yearOptions.map((year) => (
              <SelectItem key={year} value={year.toString()}>
                {year}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <Button
        variant="default"
        disabled={isCodeFetching || isPending || !country}
        onClick={() => mutate()}
        className="w-full">
        Load Holidays for {selectedYear}
      </Button>
    </div>
  );
};
