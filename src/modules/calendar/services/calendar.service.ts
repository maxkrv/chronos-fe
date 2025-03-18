import { apiClient } from '@/shared/api/api';

import { AddCalendarDto, EditCalendarDto, ICalendar } from '../calendar.interface';

export class CalendarService {
  static async create(dto: AddCalendarDto) {
    return apiClient
      .post<ICalendar>('calendars', {
        json: dto
      })
      .json();
  }

  static async update(dto: EditCalendarDto) {
    return apiClient
      .patch<ICalendar>(`calendars/${dto.id}`, {
        json: dto
      })
      .json();
  }

  static async my() {
    return apiClient.get<ICalendar[]>('calendars/my').json();
  }

  static async participating() {
    return apiClient.get<ICalendar[]>('calendars/participating').json();
  }
}
