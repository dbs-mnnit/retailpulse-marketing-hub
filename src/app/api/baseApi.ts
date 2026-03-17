import { createApi, fetchBaseQuery, BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import type { RootState } from '../store';
import { logout, setCredentials, setRefreshToken } from '../../features/auth/authSlice';

const baseQuery = fetchBaseQuery({
  baseUrl: '/api/v1',
  prepareHeaders: (headers, { getState }) => {
    const state = getState() as RootState;
    // Try Redux state first, fallback to localStorage for initial hydration
    const token = state.auth.token || localStorage.getItem('accessToken');
    const businessId = state.business.currentId || localStorage.getItem('currentBusinessId');

    if (token) headers.set('authorization', `Bearer ${token}`);
    if (businessId) headers.set('x-business-id', businessId);

    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions
) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    const url = typeof args === 'string' ? args : args.url;
    if (url.includes('/auth/login') || url.includes('/auth/refresh-token')) {
      return result;
    }

    // Try Redux state first, fallback to localStorage
    const state = api.getState() as RootState;
    const refreshToken = state.auth.refreshToken || localStorage.getItem('refreshToken');

    if (refreshToken) {
      const refreshResult = await baseQuery(
        {
          url: '/auth/refresh-token',
          method: 'POST',
          body: { refreshToken },
        },
        api,
        extraOptions
      );

      if (refreshResult.data) {
        const { accessToken, refreshToken: newRefreshToken, user } = (refreshResult.data as any).data;
        // Store in Redux
        api.dispatch(setCredentials({ token: accessToken, user }));
        api.dispatch(setRefreshToken(newRefreshToken));
        // Persist to localStorage for hydration on reload
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', newRefreshToken);

        // Retry the original query
        result = await baseQuery(args, api, extraOptions);
      } else {
        api.dispatch(logout());
      }
    } else {
      api.dispatch(logout());
    }
  }
  return result;
};

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  tagTypes: [
    // Core
    'Campaign', 'Customer', 'Credits', 'Subscription', 'Analytics', 'Design', 'Template',
    // POS / Storefront
    'Shift', 'Order', 'Storefront',
    // CRM
    'Lead', 'Quote',
    // Finance
    'Expense', 'IncomeStatement', 'CashFlow',
    // Intelligence
    'Review', 'ReviewStats', 'CreditScore', 'Experiment',
    // Procurement
    'Vendor', 'PurchaseOrder',
    // Staff
    'Staff', 'StaffPerformance',
    // Onboarding
    'Onboarding',
    // Support
    'Support',
  ],
  endpoints: () => ({}),
});
