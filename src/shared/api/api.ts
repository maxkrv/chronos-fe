/* eslint-disable @typescript-eslint/no-explicit-any */
import ky, { HTTPError } from 'ky';

import { config } from '@/config/config';
import { TokenPair } from '@/modules/auth/interfaces/auth.interface';

import { authStore } from '../store/auth.store';

export const apiClient = ky.create({
  prefixUrl: config.apiUrl,
  hooks: {
    beforeRequest: [
      async (request) => {
        if (request.url.includes('auth/refresh') || request.url.includes('auth/logout')) return request;

        const accessToken = authStore.getState().tokens?.accessToken;

        if (accessToken) {
          request.headers.set('Authorization', `Bearer ${accessToken}`);
        }

        return request;
      }
    ],
    beforeError: [
      async (error) => {
        const err = await error.response.json();
        return err as HTTPError;
      }
    ],
    beforeRetry: [
      async ({ request, error }) => {
        if ((error as any).status !== 401) return;
        const refreshToken = authStore.getState().tokens?.refreshToken;

        if (request.url.includes('auth/refresh')) {
          authStore.getState().deleteTokens();
          window.location.href = '/';
          return;
        }

        if (!refreshToken) return;

        const res = await apiClient
          .post('auth/refresh', {
            headers: {
              Authorization: `Bearer ${refreshToken}`
            }
          })
          .json<TokenPair>();

        authStore.getState().setTokens(res);
        request.headers.set('Authorization', `Bearer ${res.accessToken}`);
      }
    ]
  },
  retry: {
    methods: ['get', 'post', 'put', 'patch', 'delete'],
    statusCodes: [401],
    limit: 1
  }
});
