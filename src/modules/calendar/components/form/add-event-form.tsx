import { zodResolver } from '@hookform/resolvers/zod';
import { Label } from '@radix-ui/react-label';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { FaArrowRight, FaLink } from 'react-icons/fa6';
import { TbRepeat } from 'react-icons/tb';

import { ColorSelector } from '@/shared/components/color-selector';
import { Button } from '@/shared/components/ui/button';
import { Calendar } from '@/shared/components/ui/calendar';
import { Input } from '@/shared/components/ui/input';
import MultipleSelector from '@/shared/components/ui/multi-selector';
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/components/ui/popover';
import { ScrollArea, ScrollBar } from '@/shared/components/ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/components/ui/select';
import { Textarea } from '@/shared/components/ui/textarea';
import { cn, preventDecimals } from '@/shared/lib/utils';

import { AddEventDto, AddEventFormProps, AddEventSchema, EventCategory, RepeatType } from '../../calendar.interface';
import { DEFAULT_COLORS } from '../../constants/calendar.const';

const MOCK_CALENDARS = [
  {
    id: 1,
    name: 'General'
  },
  {
    id: 2,
    name: 'Personal'
  },
  {
    id: 3,
    name: 'Family'
  }
];

export const AddEventForm: FC<AddEventFormProps> = ({ startDate, endDate }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    getValues
  } = useForm<AddEventDto>({
    mode: 'all',
    resolver: zodResolver(AddEventSchema),
    defaultValues: {
      category: EventCategory.TASK,
      startAt: startDate,
      endAt: endDate,
      repeatType: RepeatType.NONE,
      calendarId: 1 // replace with actual calendarId
    }
  });

  const startAt = watch('startAt');
  const endAt = watch('endAt');

  const handleTimeChange = (type: 'hour' | 'minute', value: string, filed: 'endAt' | 'startAt') => {
    const currentDate = getValues(filed) || new Date();
    const newDate = new Date(currentDate);

    if (type === 'hour') {
      const hour = parseInt(value, 10);
      newDate.setHours(hour);
    } else if (type === 'minute') {
      newDate.setMinutes(parseInt(value, 10));
    }

    setValue(filed, newDate);
  };

  const onSubmit = (data: AddEventDto) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <div className="grid gap-2">
        <Input {...register('title')} id="title" placeholder="New event title" errorMessage={errors.title?.message} />
      </div>

      <div className="flex gap-2">
        <div className="grid gap-2 flex-1">
          <Label>Category</Label>

          <Select
            onValueChange={(value) => setValue('category', value as EventCategory)}
            defaultValue={watch('category')}>
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Object.values(EventCategory).map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-2 flex-1">
          <Label>Calendar</Label>
          <Select onValueChange={(value) => setValue('calendarId', +value)} defaultValue={String(watch('calendarId'))}>
            <SelectTrigger className="flex! w-full line-clamp-1 truncate">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {MOCK_CALENDARS.map((calendar) => (
                <SelectItem key={calendar.id} value={String(calendar.id)}>
                  {calendar.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-2">
        <div className="flex gap-2 items-center">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={'outline'}
                className={cn('flex-1 justify-start text-left font-normal', !startAt && 'text-muted-foreground')}>
                <CalendarIcon className="h-4 w-4 opacity-50" />
                {startAt ? format(startAt, 'dd/MM/yyyy HH:mm') : <span>Start date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <div className="sm:flex">
                <Calendar
                  mode="single"
                  selected={startAt}
                  onSelect={(value) => setValue('startAt', value as Date)}
                  initialFocus
                />
                <div className="flex flex-col sm:flex-row sm:h-[300px] divide-y sm:divide-y-0 sm:divide-x">
                  <ScrollArea className="w-64 sm:w-auto">
                    <div className="flex sm:flex-col p-2">
                      {Array.from({ length: 24 }, (_, i) => i).map((hour) => (
                        <Button
                          key={hour}
                          size="icon"
                          variant={startAt && startAt.getHours() === hour ? 'default' : 'ghost'}
                          className="sm:w-full shrink-0 aspect-square"
                          onClick={() => handleTimeChange('hour', hour.toString(), 'startAt')}>
                          {hour}
                        </Button>
                      ))}
                    </div>
                    <ScrollBar orientation="horizontal" className="sm:hidden" />
                  </ScrollArea>
                  <ScrollArea className="w-64 sm:w-auto">
                    <div className="flex sm:flex-col p-2">
                      {Array.from({ length: 61 }, (_, i) => i).map((minute) => (
                        <Button
                          key={minute}
                          size="icon"
                          variant={startAt && startAt.getMinutes() === minute ? 'default' : 'ghost'}
                          className="sm:w-full shrink-0 aspect-square"
                          onClick={() => handleTimeChange('minute', minute.toString(), 'startAt')}>
                          {minute.toString().padStart(2, '0')}
                        </Button>
                      ))}
                    </div>
                    <ScrollBar orientation="horizontal" className="sm:hidden" />
                  </ScrollArea>
                </div>
              </div>
            </PopoverContent>
          </Popover>

          {watch('category') !== EventCategory.REMINDER && (
            <>
              <FaArrowRight />

              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={'outline'}
                    className={cn('flex-1 justify-start text-left font-normal', !endAt && 'text-muted-foreground')}>
                    <CalendarIcon className="h-4 w-4 opacity-50" />
                    {endAt ? format(endAt, 'dd/MM/yyyy HH:mm') : <span>End date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <div className="sm:flex">
                    <Calendar
                      mode="single"
                      selected={endDate}
                      onSelect={(value) => setValue('endAt', value)}
                      initialFocus
                    />
                    <div className="flex flex-col sm:flex-row sm:h-[300px] divide-y sm:divide-y-0 sm:divide-x">
                      <ScrollArea className="w-64 sm:w-auto">
                        <div className="flex sm:flex-col p-2">
                          {Array.from({ length: 24 }, (_, i) => i).map((hour) => (
                            <Button
                              key={hour}
                              size="icon"
                              variant={startAt && startAt.getHours() === hour ? 'default' : 'ghost'}
                              className="sm:w-full shrink-0 aspect-square"
                              onClick={() => handleTimeChange('hour', hour.toString(), 'startAt')}>
                              {hour}
                            </Button>
                          ))}
                        </div>
                        <ScrollBar orientation="horizontal" className="sm:hidden" />
                      </ScrollArea>
                      <ScrollArea className="w-64 sm:w-auto">
                        <div className="flex sm:flex-col p-2">
                          {Array.from({ length: 61 }, (_, i) => i).map((minute) => (
                            <Button
                              key={minute}
                              size="icon"
                              variant={startAt && startAt.getMinutes() === minute ? 'default' : 'ghost'}
                              className="sm:w-full shrink-0 aspect-square"
                              onClick={() => handleTimeChange('minute', minute.toString(), 'startAt')}>
                              {minute.toString().padStart(2, '0')}
                            </Button>
                          ))}
                        </div>
                        <ScrollBar orientation="horizontal" className="sm:hidden" />
                      </ScrollArea>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </>
          )}
        </div>

        {errors.startAt && <p className="text-red-500">{errors.startAt.message}</p>}
        {errors.endAt && <p className="text-red-500">{errors.endAt.message}</p>}
      </div>

      <div className="grid gap-2">
        <div className="flex items-center gap-2">
          <Input
            {...register('repeatAfter', {
              setValueAs: (v) => (v === '' ? undefined : parseInt(v, 10))
            })}
            type="number"
            placeholder="Repeat after"
            icon={<TbRepeat className="opacity-50" />}
            iconPosition="left"
            min={0}
            step={1}
            inputMode="numeric"
            onKeyDown={preventDecimals}
          />

          <Select
            onValueChange={(value) => setValue('repeatType', value as RepeatType)}
            value={watch('repeatType')}
            defaultValue={'NONE'}>
            <SelectTrigger>
              <SelectValue placeholder="Repeat type" />
            </SelectTrigger>
            <SelectContent>
              {Object.values(RepeatType).map((repeatType) => (
                <SelectItem key={repeatType} value={repeatType} className="capitalize">
                  {repeatType.toLocaleLowerCase()}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-2">
        <Input
          {...register('link')}
          placeholder="Link"
          errorMessage={watch('link') && errors.link?.message}
          icon={<FaLink className="opacity-50" />}
          iconPosition="left"
        />
      </div>

      <div className="grid gap-2">
        <MultipleSelector
          placeholder="Attendees"
          value={watch('attendees')?.map((a) => ({ value: a, label: a })) || []}
          onChange={(attendees) =>
            setValue(
              'attendees',
              attendees.map((a) => a.value)
            )
          }
          creatable
        />

        {errors.attendees && <p className="text-sm text-red-500">{errors.attendees.message}</p>}
      </div>

      <div className="grid gap-2">
        <Textarea
          {...register('description')}
          placeholder="Description"
          className="max-h-32 h-10"
          errorMessage={errors.description?.message}
        />
      </div>

      <div className="grid gap-2">
        <ColorSelector
          value={watch('color')}
          onValueChange={(value) => setValue('color', value)}
          colors={DEFAULT_COLORS}
        />

        {errors.color?.message && <p className="text-sm text-red-500">{errors.color.message}</p>}
      </div>

      <Button type="submit">Create</Button>
    </form>
  );
};
