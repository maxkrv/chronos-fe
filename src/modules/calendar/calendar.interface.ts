import { z } from 'zod';

import { User } from '../user/user.interface';

export enum EventCategory {
  TASK = 'TASK',
  ARRANGEMENT = 'ARRANGEMENT',
  REMINDER = 'REMINDER'
}

export enum RepeatType {
  NONE = 'NONE',
  HOURLY = 'HOURLY',
  DAILY = 'DAILY',
  WEEKLY = 'WEEKLY',
  MONTHLY = 'MONTHLY',
  YEARLY = 'YEARLY'
}

export interface ICalendarEvent {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  description: string;
  color: string;
  startAt: Date;
  endAt?: Date;
  category: EventCategory;
  calendarId: number;
  creatorId: number;
  link?: string;
  attendees: User[];
  repeat?: {
    frequency: RepeatType;
    interval: number;
    repeatTime: number;
  };
}

export const AddEventSchema = z.object({
  calendarId: z.number(),
  title: z.string().trim().min(1, { message: 'Title is required' }),
  description: z.string().trim().min(1, { message: 'Description is required' }),
  color: z.string().trim().min(1, { message: 'Color is required' }),
  startAt: z.date(),
  endAt: z.date().optional().or(z.literal('')),
  category: z.nativeEnum(EventCategory),
  repeatAfter: z.number().max(999).optional().or(z.literal(undefined)),
  repeatType: z.nativeEnum(RepeatType).optional().or(z.literal('NONE')),
  link: z.string().optional().or(z.literal('')),
  attendees: z.array(z.string().email()).optional().default([])
});
export type AddEventDto = z.infer<typeof AddEventSchema>;

export interface AddEventFormProps {
  startDate?: Date;
  endDate?: Date;
  calendarId?: number;
  action: 'add' | 'edit';
  event?: ICalendarEvent;
}
