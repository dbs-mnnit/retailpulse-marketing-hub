import { baseApi } from './baseApi';

export const crmApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // === Leads ===
    getLeads: builder.query<any, string>({
      query: (businessId) => ({
        url: '/crm/leads',
        params: { businessId },
      }),
      providesTags: ['Lead'],
      transformResponse: (response: any) => response.data,
    }),
    addLead: builder.mutation<any, { businessId: string; name: string; company?: string; phone?: string; source: string; estimatedValue?: number }>({
      query: (data) => ({
        url: '/crm/leads',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Lead'],
      transformResponse: (response: any) => response.data,
    }),
    updateLeadStage: builder.mutation<any, { id: string; stage: string }>({
      query: ({ id, stage }) => ({
        url: `/crm/leads/${id}`,
        method: 'PATCH',
        body: { stage },
      }),
      invalidatesTags: ['Lead'],
      transformResponse: (response: any) => response.data,
    }),

    // === Quotes ===
    getQuotes: builder.query<any, string>({
      query: (businessId) => ({
        url: '/crm/quotes',
        params: { businessId },
      }),
      providesTags: ['Quote'],
      transformResponse: (response: any) => response.data,
    }),
    createQuote: builder.mutation<any, { businessId: string; leadId: string; items: any[]; validUntil?: string }>({
      query: (data) => ({
        url: '/crm/quotes',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Quote'],
      transformResponse: (response: any) => response.data,
    }),
    convertQuoteToOrder: builder.mutation<any, string>({
      query: (quoteId) => ({
        url: `/crm/quotes/${quoteId}/convert`,
        method: 'POST',
      }),
      invalidatesTags: ['Quote', 'Lead'],
      transformResponse: (response: any) => response.data,
    }),
  }),
});

export const {
  useGetLeadsQuery,
  useAddLeadMutation,
  useUpdateLeadStageMutation,
  useGetQuotesQuery,
  useCreateQuoteMutation,
  useConvertQuoteToOrderMutation,
} = crmApi;
