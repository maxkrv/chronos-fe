import { apiClient } from '@/shared/api/api';

import {
  AddCalendarDto,
  CalendarParticipant,
  CalendarRoleSelect,
  EditCalendarDto,
  ICalendar,
  ICalendarInvitation,
  IMyCalendarInvitation,
  InvitationDto
} from '../calendar.interface';

export class CalendarService {
  static async create(dto: AddCalendarDto) {
    return apiClient
      .post<ICalendar>('calendars', {
        json: dto
      })
      .json();
  }

  static getMyInvitations() {
    return apiClient.get<IMyCalendarInvitation[]>('calendar-invitations/my').json();
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

  static async acceptInvitation(id: number) {
    return apiClient.patch(`calendar-invitations/${id}/accept`).json();
  }

  static async declineInvitation(id: number) {
    return apiClient.patch(`calendar-invitations/${id}/decline`).json();
  }

  static async my(search?: string) {
    return apiClient.get<ICalendar[]>('calendars/my', search ? { searchParams: { search } } : undefined).json();
  }

  static async participating(search?: string) {
    return apiClient
      .get<ICalendar[]>('calendars/participating', search ? { searchParams: { search } } : undefined)
      .json();
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

  static async getCalendarParticipants(id: number) {
    return apiClient.get<CalendarParticipant[]>(`calendar-users/${id}/users`).json();
  }

  static async updateCalendarParticipant({
    calendarId,
    userId,
    role
  }: {
    calendarId: number;
    userId: number;
    role: CalendarRoleSelect;
  }) {
    return apiClient
      .patch(`calendar-users/${calendarId}/users/${userId}`, {
        json: {
          role
        }
      })
      .json();
  }

  static async removeCalendarParticipant({ calendarId, userId }: { calendarId: number; userId: number }) {
    return apiClient.delete(`calendar-users/${calendarId}/users/${userId}`).json();
  }
}
