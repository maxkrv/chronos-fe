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

export enum CalendarVisibility {
  PUBLIC = 'PUBLIC',
  PRIVATE = 'PRIVATE',
  SHARED = 'SHARED'
}

export type InvitationStatus = 'PENDING' | 'ACCEPTED' | 'DECLINED';

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
  title: z.string().trim().default('[No title]'),
  description: z.string().trim().optional(),
  color: z.string().trim().min(1, { message: 'Color is required' }).default('#16c47f'),
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

export const AddCalendarSchema = z.object({
  name: z.string().trim().min(1, { message: 'Name is required' }).max(50, { message: 'Name is too long' }),
  description: z.string().optional(),
  visibility: z.nativeEnum(CalendarVisibility)
});
export type AddCalendarDto = z.infer<typeof AddCalendarSchema>;

export type EditCalendarDto = AddCalendarDto & { id: number };

export const InvitationSchema = z.object({
  calendarId: z.number(),
  email: z.string().email().trim().min(1, { message: 'Email is required' })
});
export type InvitationDto = z.infer<typeof InvitationSchema>;

export interface ICalendar {
  id: number;
  name: string;
  description: string;
  visibility: CalendarVisibility;
  createdAt: Date;
  updatedAt: Date;
  isMain: boolean;
  attendees: User[];
}

export interface ICalendarInvitation {
  id: number;
  calendarId: number;
  userId: number;
  status: InvitationStatus;
  createdAt: string;
  updatedAt: string;
  user: User;
}
