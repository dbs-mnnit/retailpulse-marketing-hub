import { baseApi } from '../../app/api/baseApi';

export const dataApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCustomers: builder.query<any, void>({
      query: () => '/customers',
      providesTags: ['Customer'],
      transformResponse: (response: any) => response.data,
    }),
    getCampaigns: builder.query<any, void>({
      query: () => '/campaigns',
      providesTags: ['Campaign'],
      transformResponse: (response: any) => response.data,
    }),
    getAnalytics: builder.query<any, void>({
        query: () => '/analytics/overview',
        providesTags: ['Analytics' as any],
        transformResponse: (response: any) => response.data,
    }),
    getCredits: builder.query<any, void>({
      query: () => '/credits',
      providesTags: ['Credits'],
      transformResponse: (response: any) => response.data,
    }),
    getTemplates: builder.query<any, void>({
      query: () => '/templates',
      providesTags: ['Template'],
      transformResponse: (response: any) => response.data,
    }),
    getSubscriptions: builder.query<any, void>({
        query: () => '/subscriptions',
        providesTags: ['Subscription'],
        transformResponse: (response: any) => response.data,
    }),
    // POS Sessions
    getSessions: builder.query<any, void>({
      query: () => '/pos/status',
      providesTags: ['Shift' as any],
      transformResponse: (response: any) => response.data,
    }),
    getCurrentSession: builder.query<any, void>({
      query: () => '/pos/status',
      providesTags: ['Shift' as any],
      transformResponse: (response: any) => response.data,
    }),
    openSession: builder.mutation({
      query: (openingBalance: number) => ({
        url: '/pos/sessions/open',
        method: 'POST',
        body: { openingBalance },
      }),
      invalidatesTags: ['Shift' as any],
    }),
    closeSession: builder.mutation({
      query: ({ id, cashActual, mismatchReason }: { id: string; cashActual: number; mismatchReason?: string }) => ({
        url: `/pos/sessions/${id}/close`,
        method: 'POST',
        body: { cashActual, mismatchReason },
      }),
      invalidatesTags: ['Shift' as any],
    }),
    // Storefront Orders
    getOrderQueue: builder.query<any, void>({
      query: () => '/storefront/orders/queue',
      providesTags: ['Order' as any],
      transformResponse: (response: any) => response.data,
    }),
    updateOrderStatus: builder.mutation({
      query: ({ id, status }: { id: string; status: string }) => ({
        url: `/storefront/orders/${id}/status`,
        method: 'PATCH',
        body: { status },
      }),
      invalidatesTags: ['Order' as any],
    }),
  }),
});

export const { 
    useGetCustomersQuery, 
    useGetCampaignsQuery, 
    useGetAnalyticsQuery, 
    useGetCreditsQuery, 
    useGetTemplatesQuery,
    useGetSubscriptionsQuery,
    useGetSessionsQuery,
    useGetCurrentSessionQuery,
    useOpenSessionMutation,
    useCloseSessionMutation,
    useGetOrderQueueQuery,
    useUpdateOrderStatusMutation,
} = dataApi;
