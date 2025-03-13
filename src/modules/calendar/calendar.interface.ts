import { z } from 'zod';

export const CalendarEventSchema = z.object({
  id: z.number(),
  name: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  description: z.string(),
  color: z.string(),
  startAt: z.date(),
  endAt: z.date().optional(),
  repeatAfter: z.number().optional(),
  category: z.enum(['ARRANGEMENT', 'REMINDER', 'TASK']),
  calendarId: z.number(),
  creatorId: z.number()
});

export type ICalendarEvent = z.infer<typeof CalendarEventSchema>;
