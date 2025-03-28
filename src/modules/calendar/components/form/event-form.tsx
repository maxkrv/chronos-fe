import { zodResolver } from '@hookform/resolvers/zod';
import { Label } from '@radix-ui/react-label';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { format } from 'date-fns';
import dayjs from 'dayjs';
import { CalendarIcon } from 'lucide-react';
import { FC, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { FaArrowRight, FaLink } from 'react-icons/fa6';
import { TbRepeat } from 'react-icons/tb';
import { toast } from 'sonner';

import { ColorSelector } from '@/shared/components/color-selector';
import { Button } from '@/shared/components/ui/button';
import { Calendar } from '@/shared/components/ui/calendar';
import { Input } from '@/shared/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/components/ui/popover';
import { ScrollArea, ScrollBar } from '@/shared/components/ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/components/ui/select';
import { Textarea } from '@/shared/components/ui/textarea';
import { EVENTS } from '@/shared/constants/query-keys';
import { cn, preventDecimals } from '@/shared/lib/utils';

import { AddEventDto, AddEventFormProps, AddEventSchema, EventCategory, RepeatType } from '../../calendar.interface';
import { DEFAULT_COLORS } from '../../constants/calendar.const';
import { useCalendarData } from '../../hooks/use-calendar';
import { EventService } from '../../services/event.service';

enum CategoryColor {
  REMINDER = '#ff70ab',
  OCCASION = '#4635b1',
  TASK = '#16c47f',
  ARRANGEMENT = '#ffaf61'
}

const getDefaultCategoryColor = (category: EventCategory) => {
  switch (category) {
    case EventCategory.REMINDER:
      return CategoryColor.REMINDER;
    case EventCategory.OCCASION:
      return CategoryColor.OCCASION;
    case EventCategory.TASK:
      return CategoryColor.TASK;
    case EventCategory.ARRANGEMENT:
      return CategoryColor.ARRANGEMENT;
  }
};

const formatToDate = (date: Date | string | undefined | null) => {
  if (!date) {
    return undefined;
  }

  if (typeof date === 'string') {
    return new Date(date);
  }

  return date;
};

export const EventForm: FC<AddEventFormProps> = ({ startDate, endDate, event, action, onSubmit: onSubmitCb }) => {
  const queryClient = useQueryClient();
  const { calendarSelect } = useCalendarData();

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
      name: event?.name || '[No title]',
      category: event?.category || EventCategory.TASK,
      startAt: formatToDate(event?.startAt || startDate),
      endAt: formatToDate(event?.endAt || endDate),
      calendarId: event?.calendarId || calendarSelect?.find((c) => c.isMain)?.id,
      color: event?.color || getDefaultCategoryColor(event?.category || EventCategory.TASK),
      link: event?.link,
      description: event?.description,
      frequency: event?.eventRepeat?.frequency || RepeatType.NONE,
      interval: event?.eventRepeat?.interval
    }
  });

  useEffect(() => {
    if (calendarSelect && !getValues('calendarId')) {
      const mainCalendar = calendarSelect.find((c) => c.isMain);

      mainCalendar && setValue('calendarId', mainCalendar.id);
    }
  }, [calendarSelect]);

  const { mutate: createMutate, isPending: isCreatePending } = useMutation({
    mutationFn: EventService.create,
    onSuccess: () => {
      toast.success('Event created');
      queryClient.invalidateQueries({
        queryKey: [EVENTS]
      });

      onSubmitCb?.();
    }
  });
  const { mutate: updateMutate, isPending: isUpdatePending } = useMutation({
    mutationFn: EventService.update,
    onSuccess: () => {
      toast.success('Event updated');
      queryClient.invalidateQueries({
        queryKey: [EVENTS]
      });

      onSubmitCb?.();
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

    setValue(filed, formatToDate(newDate));
  };

  const onSubmit = (data: AddEventDto) => {
    const dto = structuredClone(data);

    if (dto.frequency === RepeatType.NONE) {
      delete dto.frequency;
    }

    if (dto.category === EventCategory.REMINDER || dto.category === EventCategory.OCCASION) {
      delete dto.endAt;
    }
    if (action === 'add') {
      createMutate(dto);
    } else {
      if (!event) return;

      updateMutate({
        id: event.id,
        ...dto
      });
    }
  };

  const isLoading = isCreatePending || isUpdatePending;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 h-full grow max-h-full">
      <div className="grid gap-2">
        <Input {...register('name')} id="title" placeholder="New event title" errorMessage={errors.name?.message} />
      </div>

      <div className="flex gap-2">
        <div className="grid gap-2 flex-1">
          <Label>Category</Label>

          <Select
            onValueChange={(value: EventCategory) => {
              setValue('category', value);
              setValue('color', getDefaultCategoryColor(value));
              if (value === EventCategory.OCCASION) {
                setValue('endAt', undefined);
                setValue('frequency', RepeatType.NONE);
              }
            }}
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
          <Select
            onValueChange={(value) => setValue('calendarId', +value)}
            defaultValue={String(watch('calendarId'))}
            value={String(watch('calendarId'))}>
            <SelectTrigger className="flex! w-full line-clamp-1 truncate">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {calendarSelect?.map((calendar) => (
                <SelectItem key={calendar.id} value={String(calendar.id)}>
                  {calendar.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-2">
        <div className="flex gap-2 items-center flex-col md:flex-row">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                type="button"
                variant={'outline'}
                className={cn(
                  'flex-1 justify-start text-left font-normal w-full',
                  !startAt && 'text-muted-foreground'
                )}>
                <CalendarIcon className="h-4 w-4 opacity-50" />
                {startAt ? (
                  format(startAt, watch('category') === EventCategory.OCCASION ? 'dd/MM/yyyy' : 'dd/MM/yyyy HH:mm')
                ) : (
                  <span>Start date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 z-10000">
              <div className="sm:flex">
                <Calendar
                  mode="single"
                  selected={startAt}
                  onSelect={(value) => {
                    setValue('startAt', formatToDate(value) as Date);
                  }}
                  initialFocus
                />
                <div
                  className={cn(
                    'flex flex-col sm:flex-row sm:h-[300px] divide-y sm:divide-y-0 sm:divide-x',
                    watch('category') === EventCategory.OCCASION && 'hidden'
                  )}>
                  <ScrollArea className="w-64 sm:w-auto">
                    <div className="flex sm:flex-col p-2">
                      {Array.from({ length: 24 }, (_, i) => i).map((hour) => (
                        <Button
                          type="button"
                          key={hour}
                          size="icon"
                          variant={startAt && dayjs(startAt).hour() === hour ? 'default' : 'ghost'}
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
                          type="button"
                          key={minute}
                          size="icon"
                          variant={startAt && dayjs(startAt).minute() === minute ? 'default' : 'ghost'}
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

          {watch('category') !== EventCategory.REMINDER && watch('category') !== EventCategory.OCCASION && (
            <>
              <FaArrowRight className="rotate-90 md:rotate-0" />

              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    type="button"
                    variant={'outline'}
                    className={cn(
                      'flex-1 justify-start text-left font-normal w-full',
                      !endAt && 'text-muted-foreground'
                    )}>
                    <CalendarIcon className="h-4 w-4 opacity-50" />
                    {endAt ? format(endAt, 'dd/MM/yyyy HH:mm') : <span>End date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 z-10000">
                  <div className="sm:flex">
                    <Calendar
                      mode="single"
                      selected={endDate}
                      onSelect={(value) => setValue('endAt', formatToDate(value) as Date)}
                      initialFocus
                    />
                    <div className="flex flex-col sm:flex-row sm:h-[300px] divide-y sm:divide-y-0 sm:divide-x">
                      <ScrollArea className="w-64 sm:w-auto">
                        <div className="flex sm:flex-col p-2">
                          {Array.from({ length: 24 }, (_, i) => i).map((hour) => (
                            <Button
                              key={hour}
                              size="icon"
                              variant={endAt && dayjs(endAt).hour() === hour ? 'default' : 'ghost'}
                              className="sm:w-full shrink-0 aspect-square"
                              onClick={() => handleTimeChange('hour', hour.toString(), 'endAt')}
                              type="button">
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
                              variant={endAt && dayjs(endAt).minute() === minute ? 'default' : 'ghost'}
                              className="sm:w-full shrink-0 aspect-square"
                              onClick={() => handleTimeChange('minute', minute.toString(), 'endAt')}
                              type="button">
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
            {...register('interval', {
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
            onValueChange={(value: RepeatType) => setValue('frequency', value)}
            value={watch('frequency')}
            defaultValue={'NONE'}>
            <SelectTrigger className="grow">
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

      <Button type="submit" isLoading={isLoading} disabled={isCreatePending} className="mt-auto">
        {action === 'edit' ? 'Update' : 'Create'}
      </Button>
    </form>
  );
};
