import { z } from 'zod';

export enum EventCategory {
  TASK = 'TASK',
  ARRANGEMENT = 'ARRANGEMENT',
  REMINDER = 'REMINDER'
}

export enum RepeatType {
  NONE = 'NONE',
  DAILY = 'DAILY',
  WEEKLY = 'WEEKLY',
  MONTHLY = 'MONTHLY',
  YEARLY = 'YEARLY'
}

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
  category: z.nativeEnum(EventCategory),
  calendarId: z.number(),
  creatorId: z.number()
});

export type ICalendarEvent = z.infer<typeof CalendarEventSchema>;

export const AddEventSchema = z.object({
  calendarId: z.number(),
  title: z.string().trim().default('[No title]'),
  description: z.string().trim().optional(),
  color: z.string().trim().min(1, { message: 'Color is required' }).default('#16c47f'),
  startAt: z.date(),
  endAt: z.date().optional().or(z.literal('')),
  category: z.nativeEnum(EventCategory),
  repeatAfter: z.number().max(999).optional().or(z.literal(undefined)),
  repeatType: z.nativeEnum(RepeatType).optional().or(z.literal('NONE')),
  link: z.string().optional().or(z.literal('')),
  attendees: z.array(z.string().email()).optional()
});
export type AddEventDto = z.infer<typeof AddEventSchema>;

export interface AddEventFormProps {
  startDate?: Date;
  endDate?: Date;
  calendarId?: number;
}
