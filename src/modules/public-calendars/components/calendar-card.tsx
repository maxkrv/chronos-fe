import { useMutation, useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import type { FC } from 'react';
import { FaCalendarAlt, FaUsers } from 'react-icons/fa';
import { MdOutlinePublic } from 'react-icons/md';
import { toast } from 'sonner';

import type { ICalendar } from '@/modules/calendar/calendar.interface';
import { CalendarService } from '@/modules/calendar/services/calendar.service';
import { useCalendarStore } from '@/modules/calendar/stores/calendar.store';
import { Button } from '@/shared/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/shared/components/ui/card';
import { PARTICIPATING_CALENDARS } from '@/shared/constants/query-keys';

interface CalendarCardProps {
  calendar: ICalendar;
}

export const CalendarCard: FC<CalendarCardProps> = ({ calendar }) => {
  const queryClient = useQueryClient();
  const { addCalendarId } = useCalendarStore();

  const { mutate, isPending } = useMutation({
    mutationFn: () => CalendarService.participate(calendar.id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [PARTICIPATING_CALENDARS]
      });
      addCalendarId(calendar.id);
      toast.success(`You've joined ${calendar.name}`);
    }
  });

  const handleJoin = () => {
    mutate();
  };

  return (
    <Card className="relative overflow-hidden h-full flex flex-col transition-all hover:shadow-lg hover:-translate-y-1 border-2 gap-3 max-w-lg">
      {/* Decorative top bar with calendar color */}
      <div className="absolute top-0 left-0 right-0 h-3 bg-gradient-to-r from-primary to-primary/70" />
      <CardHeader className="grow">
        <div className="flex items-center justify-between">
          <CardTitle className="line-clamp-1">{calendar.name}</CardTitle>
          <MdOutlinePublic />
        </div>
        <CardDescription className="line-clamp-2">{calendar.description || 'No description'}</CardDescription>
      </CardHeader>
      <CardContent className="mt-auto">
        <div className="flex flex-col gap-0 mt-auto">
          <div className="flex items-center gap-2 text-muted-foreground">
            <FaUsers className="h-4 w-4" />
            <span>{calendar.attendees?.length || 0} participants</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <FaCalendarAlt className="h-4 w-4" />
            <span>Created: {dayjs(calendar.createdAt).format('DD MMM, YYYY')}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={handleJoin} isLoading={isPending} disabled={isPending}>
          Join Calendar
        </Button>
      </CardFooter>
    </Card>
  );
};
