import { ICalendarEvent } from './../modules/calendar/calendar.interface';

export const events: ICalendarEvent[] = [
  {
    id: 1,
    name: 'Doctor Appointment',
    createdAt: new Date('2025-03-01T10:00:00Z'),
    updatedAt: new Date('2025-03-02T11:00:00Z'),
    description: 'Annual check-up with Dr. Smith.',
    color: '#FF5733',
    startAt: new Date('2025-03-01T14:00:00Z'),
    endAt: new Date('2025-03-01T15:00:00Z'),
    category: 'ARRANGEMENT',
    calendarId: 1,
    creatorId: 101
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
    repeatAfter: 24 * 60 * 60 * 1000, // Repeats daily
    category: 'TASK',
    calendarId: 1,
    creatorId: 101
  },
  {
    id: 3,
    name: 'Weekly Team Meeting (Sprint 3)Weekly Team Meeting (Sprint 3)',
    createdAt: new Date('2025-02-25T09:00:00Z'),
    updatedAt: new Date('2025-03-03T09:00:00Z'),
    description: 'Sprint review and planning.',
    color: '#5733FF',
    startAt: new Date('2025-03-01T10:00:00Z'),
    endAt: new Date('2025-03-01T11:30:00Z'),
    repeatAfter: 7 * 24 * 60 * 60 * 1000, // Repeats weekly
    category: 'ARRANGEMENT',
    calendarId: 2,
    creatorId: 102
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
    repeatAfter: 12 * 60 * 60 * 1000, // Repeats every 12 hours
    category: 'REMINDER',
    calendarId: 1,
    creatorId: 103
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
    repeatAfter: 0, // One-time event
    category: 'TASK',
    calendarId: 2,
    creatorId: 102
  },
  {
    id: 6,
    name: 'Birthday Reminder',
    createdAt: new Date('2025-02-01T00:00:00Z'),
    updatedAt: new Date('2025-03-01T00:00:00Z'),
    description: "John's birthday celebration.",
    color: '#FFA500',
    startAt: new Date('2025-03-20T00:00:00Z'),
    endAt: new Date('2025-03-20T23:59:00Z'),
    repeatAfter: 365 * 24 * 60 * 60 * 1000, // Repeats yearly
    category: 'REMINDER',
    calendarId: 3,
    creatorId: 104
  }
];
