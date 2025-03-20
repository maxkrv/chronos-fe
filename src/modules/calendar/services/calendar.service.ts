import { apiClient } from '@/shared/api/api';

import { AddCalendarDto, EditCalendarDto, ICalendar, ICalendarInvitation, InvitationDto } from '../calendar.interface';

export class CalendarService {
  static async create(dto: AddCalendarDto) {
    return apiClient
      .post<ICalendar>('calendars', {
        json: dto
      })
      .json();
  }

  static async getInvitations(id: number) {
    return apiClient.get<ICalendarInvitation[]>(`calendar-invitations/calendar/${id}/invitations`).json();
  }

  static async invite(dto: InvitationDto) {
    return apiClient
      .post(`calendar-invitations`, {
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

  static async update(dto: EditCalendarDto) {
    return apiClient
      .patch<ICalendar>(`calendars/${dto.id}`, {
        json: dto
      })
      .json();
  }

  static async delete(id: number) {
    return apiClient.delete(`calendars/${id}`).json();
  }
}
