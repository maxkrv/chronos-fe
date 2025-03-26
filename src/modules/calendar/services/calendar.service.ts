import { apiClient } from '@/shared/api/api';

import { PaginationDto, PaginationResponse } from '../../../shared/types/interfaces';
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

interface GetPublicCalendarsParams extends PaginationDto {
  name?: string;
  sortBy?: 'createdAt' | 'participants';
  sortOrder?: 'asc' | 'desc';
}

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
  static async getPublicCalendars(params: GetPublicCalendarsParams): Promise<PaginationResponse<ICalendar>> {
    const searchParams = new URLSearchParams();

    if (params.page) searchParams.append('page', params.page.toString());
    if (params.limit) searchParams.append('limit', params.limit.toString());
    if (params.name) searchParams.append('name', params.name);
    if (params.sortBy) searchParams.append('sortBy', params.sortBy);
    if (params.sortOrder) searchParams.append('sortOrder', params.sortOrder);

    const url = `calendars/public`;
    return await apiClient.get(url, { searchParams }).json<PaginationResponse<ICalendar>>();
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

  static async loadHolidays(countryCode: string, year: number = new Date().getFullYear()) {
    return apiClient.post(`calendars/holidays/${countryCode}`, { searchParams: { year } }).json();
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

  static async participate(calendarId: number) {
    return apiClient.post(`calendars/public/${calendarId}/participate`).json();
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
