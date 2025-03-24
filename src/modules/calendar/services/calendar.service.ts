import { apiClient } from '@/shared/api/api';

import {
  AddCalendarDto,
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
}
