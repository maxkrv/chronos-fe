import { EventCategory, ICalendarEvent, RepeatType } from './../modules/calendar/calendar.interface';
import { users } from './users';

export const events: ICalendarEvent[] = [
  {
    id: 1,
    name: 'Doctor Appointment',
    createdAt: new Date('2025-03-01T10:00:00Z'),
    updatedAt: new Date('2025-03-02T11:00:00Z'),
    description: 'Annual check-up with Dr. Smith.',
    color: '#FF5733',
    startAt: new Date('2025-02-27T22:00:00Z'),
    endAt: new Date('2025-02-28T03:00:00Z'),
    category: EventCategory.ARRANGEMENT,
    calendarId: 1,
    creatorId: 101,
    attendees: users
  },
  {
    id: 2,
    name: 'Daily Workout',
    createdAt: new Date('2025-02-28T07:30:00Z'),
    updatedAt: new Date('2025-03-01T08:00:00Z'),
    description: 'Morning gym session.',
    color: '#33FF57',
    startAt: new Date('2025-03-01T07:00:00Z'),
    endAt: new Date('2025-03-01T08:00:00Z'),
    repeat: {
      frequency: RepeatType.DAILY,
      interval: 1,
      repeatTime: 24 * 60 * 60 * 1000
    }, // Repeats daily
    category: EventCategory.TASK,
    calendarId: 1,
    creatorId: 101,
    attendees: users
  },
  {
    id: 3,
    name: 'Weekly Team Meeting (Sprint 3)',
    createdAt: new Date('2025-02-25T09:00:00Z'),
    updatedAt: new Date('2025-03-03T09:00:00Z'),
    description: 'Sprint review and planning.',
    color: '#5733FF',
    startAt: new Date('2025-03-01T10:00:00Z'),
    endAt: new Date('2025-03-01T11:30:00Z'),
    repeat: {
      frequency: RepeatType.WEEKLY,
      interval: 1,
      repeatTime: 7 * 24 * 60 * 60 * 1000
    },
    category: EventCategory.ARRANGEMENT,
    calendarId: 2,
    creatorId: 102,
    attendees: users
  },
  {
    id: 4,
    name: 'Medication Reminder',
    createdAt: new Date('2025-02-15T06:00:00Z'),
    updatedAt: new Date('2025-03-05T06:00:00Z'),
    description: 'Take blood pressure medication.',
    color: '#FFD700',
    startAt: new Date('2025-03-01T08:00:00Z'),
    endAt: undefined, // No fixed end time
    repeat: {
      frequency: RepeatType.HOURLY,
      interval: 12,
      repeatTime: 12 * 60 * 60 * 1000
    },
    category: EventCategory.REMINDER,
    calendarId: 1,
    creatorId: 103,
    attendees: users
  },
  {
    id: 5,
    name: 'Project Deadline',
    createdAt: new Date('2025-01-10T09:30:00Z'),
    updatedAt: new Date('2025-03-05T10:00:00Z'),
    description: 'Submit final project report.',
    color: '#FF3333',
    startAt: new Date('2025-03-01T23:59:00Z'),
    endAt: new Date('2025-03-02T04:00:00Z'),
    category: EventCategory.TASK,
    calendarId: 2,
    creatorId: 102,
    attendees: users
  },
  {
    id: 6,
    name: 'Birthday Reminder',
    createdAt: new Date('2025-02-01T00:00:00Z'),
    updatedAt: new Date('2025-03-01T00:00:00Z'),
    description: "John's birthday celebration.",
    color: '#FFA500',
    startAt: new Date('2025-03-02T02:00:00Z'),
    endAt: undefined,
    repeat: {
      frequency: RepeatType.YEARLY,
      interval: 1,
      repeatTime: 365 * 24 * 60 * 60 * 1000
    },
    category: EventCategory.REMINDER,
    calendarId: 3,
    creatorId: 104,
    attendees: users
  },
  {
    id: 7,
    name: 'Client Meeting',
    createdAt: new Date('2025-02-27T09:00:00Z'),
    updatedAt: new Date('2025-02-27T10:00:00Z'),
    description: 'Discussion about the new contract.',
    color: '#007FFF',
    startAt: new Date('2025-02-27T14:00:00Z'),
    endAt: new Date('2025-02-27T15:30:00Z'),
    category: EventCategory.ARRANGEMENT,
    calendarId: 1,
    creatorId: 105,
    attendees: users
  },
  {
    id: 8,
    name: 'Grocery Shopping',
    createdAt: new Date('2025-02-28T11:00:00Z'),
    updatedAt: new Date('2025-02-28T12:00:00Z'),
    description: 'Buy essentials for the week.',
    color: '#00FFAA',
    startAt: new Date('2025-02-28T17:00:00Z'),
    endAt: new Date('2025-02-28T18:00:00Z'),
    category: EventCategory.TASK,
    calendarId: 1,
    creatorId: 101,
    attendees: users
  },
  {
    id: 9,
    name: 'Coding Bootcamp Session',
    createdAt: new Date('2025-03-03T08:00:00Z'),
    updatedAt: new Date('2025-03-03T10:00:00Z'),
    description: 'Advanced JavaScript concepts.',
    color: '#FF00FF',
    startAt: new Date('2025-03-03T19:00:00Z'),
    endAt: new Date('2025-03-03T21:00:00Z'),
    category: EventCategory.ARRANGEMENT,
    calendarId: 2,
    creatorId: 106,
    attendees: users
  },
  {
    id: 10,
    name: 'Dentist Appointment',
    createdAt: new Date('2025-02-20T12:00:00Z'),
    updatedAt: new Date('2025-02-25T14:00:00Z'),
    description: 'Teeth cleaning and checkup.',
    color: '#FF6699',
    startAt: new Date('2025-03-05T10:00:00Z'),
    endAt: new Date('2025-03-05T11:30:00Z'),
    category: EventCategory.ARRANGEMENT,
    calendarId: 1,
    creatorId: 107,
    attendees: users,
    link: 'https://google.com',
    repeat: {
      frequency: RepeatType.HOURLY,
      interval: 12,
      repeatTime: 12 * 60 * 60 * 1000
    }
  },
  {
    id: 11,
    name: 'Team Lunch',
    createdAt: new Date('2025-02-28T09:00:00Z'),
    updatedAt: new Date('2025-03-01T09:30:00Z'),
    description: 'Lunch with colleagues.',
    color: '#33A1C9',
    startAt: new Date('2025-03-01T12:30:00Z'),
    endAt: new Date('2025-03-01T14:00:00Z'),
    category: EventCategory.ARRANGEMENT,
    calendarId: 2,
    creatorId: 108,
    attendees: users
  }
];
