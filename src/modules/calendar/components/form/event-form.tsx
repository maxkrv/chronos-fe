import { zodResolver } from '@hookform/resolvers/zod';
import { Label } from '@radix-ui/react-label';
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { FC } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { FaArrowRight, FaLink, FaPlus, FaTrash } from 'react-icons/fa6';
import { TbRepeat } from 'react-icons/tb';

import { ColorSelector } from '@/shared/components/color-selector';
import { Button } from '@/shared/components/ui/button';
import { Calendar } from '@/shared/components/ui/calendar';
import { Input } from '@/shared/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/components/ui/popover';
import { ScrollArea, ScrollBar } from '@/shared/components/ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/components/ui/select';
import { Textarea } from '@/shared/components/ui/textarea';
import { MY_CALENDARS } from '@/shared/constants/query-keys';
import { cn, preventDecimals } from '@/shared/lib/utils';

import { AddEventDto, AddEventFormProps, AddEventSchema, EventCategory, RepeatType } from '../../calendar.interface';
import { DEFAULT_COLORS } from '../../constants/calendar.const';
import { CalendarService } from '../../services/calendar.service';

export const EventForm: FC<AddEventFormProps> = ({ startDate, endDate, event, action }) => {
  const {
    control,
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
      category: event?.category || EventCategory.TASK,
      startAt: event?.startAt || startDate,
      endAt: event?.endAt || endDate,
      repeatType: event?.repeat?.frequency || RepeatType.NONE,
      calendarId: event?.calendarId,
      color: event?.color,
      link: event?.link,
      attendees: event?.attendees.map((attendee) => attendee.email),
      description: event?.description,
      repeatAfter: event?.repeat?.interval,
      title: event?.name
    }
  });

  const { data: myCalendars } = useQuery({
    queryKey: [MY_CALENDARS],
    queryFn: CalendarService.my
  });

  const { fields, append, remove } = useFieldArray({
    control,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    name: 'attendees'
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
              {myCalendars?.map((calendar) => (
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
                variant={'outline'}
                className={cn(
                  'flex-1 justify-start text-left font-normal w-full',
                  !startAt && 'text-muted-foreground'
                )}>
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
              <FaArrowRight className="rotate-90 md:rotate-0" />

              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={'outline'}
                    className={cn(
                      'flex-1 justify-start text-left font-normal w-full',
                      !endAt && 'text-muted-foreground'
                    )}>
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
        <Label>Attendees</Label>
        <div className="flex flex-col gap-1 w-[calc(100% + 24px)] max-h-[150px] overflow-auto ml-[-24px] pl-[24px] pb-2">
          {fields.map((_, index) => (
            <div key={index} className="flex gap-2 w-full">
              <Input
                {...register(`attendees.${index}` as const, {
                  required: true
                })}
                wrapperClassName="flex-1"
                placeholder="Email"
                errorMessage={errors.attendees?.[index]?.message}
              />

              <Button variant="outline" type="button" onClick={() => remove(index)}>
                <FaTrash className="h-3! w-3!" />
              </Button>
            </div>
          ))}
        </div>
        <Button className="w-full" variant="outline" type="button" onClick={() => append('')}>
          <FaPlus /> Add attendee
        </Button>

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

      <Button type="submit">{action === 'edit' ? 'Update' : 'Create'}</Button>
    </form>
  );
};
