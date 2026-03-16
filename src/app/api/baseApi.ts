import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { RootState } from '../store';

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/v1',
    prepareHeaders: (headers, { getState }) => {
      const state = getState() as RootState;
      const token = state.auth.token;
      const businessId = state.business.currentId;
      if (token) headers.set('authorization', `Bearer ${token}`);
      if (businessId) headers.set('x-business-id', businessId);
      return headers;
    },
  }),
  tagTypes: ['Campaign', 'Customer', 'Credits', 'Subscription', 'Analytics', 'Design', 'Template'],
  endpoints: () => ({}),
});
