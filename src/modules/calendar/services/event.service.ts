import { apiClient } from '@/shared/api/api';

import {
  AddEventDto,
  EditEventDto,
  EventInvitationDto,
  ICalendarEvent,
  ICalendarInvitation,
  IMyEventInvitation
} from '../calendar.interface';

export class EventService {
  static async create(dto: AddEventDto) {
    return apiClient
      .post<ICalendarEvent>('events', {
        json: dto
      })
      .json();
  }

  static async findAll(
    calendarId: number[],
    fromDate?: Date | string,
    toDate?: Date | string,
    searchQuery?: string
  ): Promise<ICalendarEvent[][]> {
    function fetchEvents(id: number | undefined | null) {
      const searchParams = new URLSearchParams();
      id && searchParams.set('calendarId', id.toString());
      fromDate && searchParams.set('fromDate', typeof fromDate === 'string' ? fromDate : fromDate.toISOString());
      toDate && searchParams.set('toDate', typeof toDate === 'string' ? toDate : toDate.toISOString());
      searchQuery && searchParams.set('search', searchQuery);

      return apiClient
        .get<ICalendarEvent[]>('events', {
          searchParams
        })
        .json();
    }

    if (!calendarId.length) return [await fetchEvents(null)];
    return await Promise.all(calendarId.map((id) => fetchEvents(id)));
  }

  static async find(
    calendarId: number[],
    fromDate?: Date | string,
    toDate?: Date | string
  ): Promise<ICalendarEvent[][]> {
    return await Promise.all(
      calendarId.map((id) => {
        const searchParams = new URLSearchParams();
        searchParams.set('calendarId', id.toString());
        fromDate && searchParams.set('fromDate', typeof fromDate === 'string' ? fromDate : fromDate.toISOString());
        toDate && searchParams.set('toDate', typeof toDate === 'string' ? toDate : toDate.toISOString());

        return apiClient
          .get<ICalendarEvent[]>('events', {
            searchParams
          })
          .json();
      })
    );
  }

  static async update(dto: EditEventDto) {
    return apiClient
      .patch<ICalendarEvent>(`events/${dto.id}`, {
        json: dto
      })
      .json();
  }

  static async delete(id: number) {
    return apiClient.delete(`events/${id}`).json();
  }

  static async getMyInvitations() {
    return apiClient.get<IMyEventInvitation[]>('event-invitations/my').json();
  }

  static async getInvitations(id: number) {
    return apiClient.get<ICalendarInvitation[]>(`event-invitations/events/${id}/invitations`).json();
  }

  static async invite(dto: EventInvitationDto) {
    return apiClient
      .post(`event-invitations`, {
        json: dto
      })
      .json();
  }

  static async acceptInvitation(id: number) {
    return apiClient.patch(`event-invitations/${id}/accept`).json();
  }

  static async declineInvitation(id: number) {
    return apiClient.patch(`event-invitations/${id}/decline`).json();
  }
}
